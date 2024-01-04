import Elysia from "elysia";
import { chatModel } from "./models/chat";

export const backendApp = new Elysia({ prefix: "/api" })
  .get("/health", () => "OK")
  .use(chatModel);

export type BackendApp = typeof backendApp;
