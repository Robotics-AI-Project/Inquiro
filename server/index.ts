import Elysia from "elysia";
import { chatModule } from "./modules/chat";

export const backendApp = new Elysia({ prefix: "/api" })
  .get("/health", () => "OK")
  .use(chatModule);

export type BackendApp = typeof backendApp;
