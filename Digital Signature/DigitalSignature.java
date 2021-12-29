/**
 * Read details at
 * neupane.me/blog/http-digital-signature.html
 */

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.io.UnsupportedEncodingException;


class Signature {
    long timestamp;
    String digSig;
    String id;

    public Signature() {
        this.timestamp = 0L;
        this.digSig = "";
        this.id = "";
    }

    public Signature(long timestamp, String digSig, String id) {
        this.timestamp = timestamp;
        this.digSig = digSig;
        this.id = id;
    }

    public String toString() {
        String delim = ";";
        return "t=" + this.timestamp + delim + "digSig=" + this.digSig + delim + "id="+this.id ;
    }

}

public class SignatureGenerator {

    public static void main (String[] args) {

        String payload = "{'name':'Neupane Inc'}";
        String secret  = "secretKey";
        long currentTimestamp = System.currentTimeMillis();
        String message = currentTimestamp + "." + payload;
        String hex = "";
        String id="b0ce6bae-659a";

        try {
            byte[] hash   = calcHmacSha256(secret.getBytes("UTF-8"), message.getBytes("UTF-8"));
            String base64 = generateBase64(hash);

            for (byte i : hash) {
                hex += String.format("%02X", i);
            }

            System.out.println("Message        : " + message);
            System.out.println("Key            : " + secret);
            System.out.println("Hash           : " + hex);
            System.out.println("Base64         : " + base64);
            System.out.println("\nVerify Hash and Base64 using https://www.devglan.com/online-tools/hmac-sha256-online\n");
            System.out.println("HTTP.Signature : " + new Signature(currentTimestamp, base64, id).toString());

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private static byte[] calcHmacSha256(byte[] secretKey, byte[] message) {
        byte[] hmacSha256 = null;
        try {
          Mac mac = Mac.getInstance("HmacSHA256");
          SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey, "HmacSHA256");
          mac.init(secretKeySpec);
          hmacSha256 = mac.doFinal(message);
        } catch (Exception e) {
          throw new RuntimeException("Failed to calculate hmac-sha256", e);
        }
        return hmacSha256;
    }

    private static String generateBase64(byte[] bytes) {
        return Base64.getEncoder().encodeToString(bytes);
    }
}
