import { AbstractHandler } from "./AbstractHandler";
import type { Application } from "../models/Application";

export class MainHandler extends AbstractHandler {

  public handle (request: Application): Application | undefined {
    return super.handle(request);
  }

}
