import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { swaggerConfig } from "./configs/swagger";
import { deriverSetup } from "./derivers";

export const publicBackend = new Elysia().get("/health", () => "OK", {
  detail: {
    tags: ["health"],
  },
});

export const basePrivateBackend = new Elysia().derive(deriverSetup);

export const intializeBaseBackend = () => {
  let baseBackend = new Elysia({ prefix: "/api" });

  if (process.env.NODE_ENV !== "production") {
    baseBackend = baseBackend.use(swagger(swaggerConfig));
  }

  return baseBackend;
};
