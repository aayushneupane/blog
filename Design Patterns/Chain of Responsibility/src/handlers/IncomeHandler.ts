import { AbstractHandler } from "./AbstractHandler"
import type { Application } from "../models/Application";

export class IncomeHandler extends AbstractHandler {

  public handle (request: Application): Application | undefined {
    if (50000 > request.income) {
      console.log(`applicationId: ${request.id} Income over 50000`);

      return super.handle(request);
    }

    this.action(request);
  }

  public action (request: Application) {
    console.log(`${request.id} Failed IncomeHandler`);
  }

}
