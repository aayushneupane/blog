import type { Application } from "../models/Application"
import type { Handler } from "./Handler";

export abstract class AbstractHandler implements Handler {

  private nextHandler: Handler;

  public setNext (handler: Handler): Handler {
    this.nextHandler = handler;

    return handler;
  }

  public handle (request: Application): Application | undefined {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    console.log("AbstractHandler returning null. This means success");
  }

  public action (request: Application): void {
    console.log("action");
  }

}
