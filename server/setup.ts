import swagger from "@elysiajs/swagger";
import { Prisma } from "@prisma/client";
import Elysia from "elysia";
import { metadataDb } from "./configs/db";
import { swaggerConfig } from "./configs/swagger";
import { decorators } from "./decorators";
import { derivers } from "./derivers";

export const publicBackend = new Elysia().get(
  "/health",
  async () => {
    try {
      await metadataDb.$queryRaw(Prisma.sql`SELECT 1;`);
    } catch (e: unknown) {
      return new Response(`Metadata Database is not ready.\nError: ${e}`, {
        status: 500,
      });
    }

    return {
      backend: "OK",
      metadataDb: "OK",
    };
  },
  {
    detail: {
      tags: ["health"],
      description: "Health check",
      responses: {
        200: {
          description: "OK",
        },
      },
    },
  },
);

export const basePrivateBackend = new Elysia()
  .decorate(decorators)
  .derive(derivers);

export const intializeBaseBackend = () => {
  let baseBackend = new Elysia({ prefix: "/api" });

  if (process.env.NODE_ENV !== "production") {
    baseBackend = baseBackend.use(swagger(swaggerConfig));
  }

  return baseBackend;
};
