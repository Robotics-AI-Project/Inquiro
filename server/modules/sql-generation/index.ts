import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import { c3Sql } from "./c3-sql";

export const sqlGenerationModule = basePrivateBackend.group(
  "/sql-generation",
  (app) =>
    app.post("", ({ body: { prompt } }) => c3Sql(prompt), {
      body: t.Object({
        prompt: t.String(),
      }),
      detail: {
        tags: ["sql-generation"],
        description: "Generate SQL",
        security: [
          {
            bearer: [],
          },
        ],
      },
    }),
);
