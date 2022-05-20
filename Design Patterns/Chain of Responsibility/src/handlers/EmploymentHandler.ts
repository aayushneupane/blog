import { AbstractHandler } from "./AbstractHandler"
import type { Application } from "../models/Application";

export class EmploymentHandler extends AbstractHandler {

  public handle (request: Application): Application | undefined {
    if (request.employed) {
      return super.handle(request);
    }

    this.action(request);
  }

  public action (request: Application) {
    console.log(`${request.id} Failed EmploymentHandler`);
  }

}
