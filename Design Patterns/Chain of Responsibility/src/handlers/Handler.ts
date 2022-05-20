import type { Application } from "../models/Application";

export interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: Application): Application | undefined ;

  action(request: Application): void;
}
