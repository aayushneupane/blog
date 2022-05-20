import { EmploymentHandler, Handler, IncomeHandler, MainHandler } from "./handlers/";

import type { Application } from "./models/Application";

export function client () {
  console.log("client...");

  // success
  const app1: Application = {
    id         : "app1",
    income     : 30000,
    employed   : true,
  };

  // will fail income
  const app2: Application = {
    id         : "app2",
    income     : 90000,
    employed   : false,
  };

  // will fail employment
  const app3: Application = {
    id         : "app3",
    income     : 20000,
    employed   : false,
  };

  const incomeHandler = new IncomeHandler();
  const employmentHandler = new EmploymentHandler();

  const mainHandler = new MainHandler();

  mainHandler
    .setNext(incomeHandler)
    .setNext(employmentHandler);

  execute(mainHandler, app1);
  console.log("");
  execute(mainHandler, app2);
  console.log("");
  execute(mainHandler, app3);
}

function execute (handler: Handler, request: Application) {
  console.log(`executing... ${request.id}`);
  handler.handle(request);
}
