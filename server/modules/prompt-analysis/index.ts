import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import { mainFlow } from "./main-flow";
import optionHandler from "./option-handler";

export const promptAnalysisModule = basePrivateBackend.group(
  "/prompt-analysis",
  (app) =>
    app
      .post(
        "/main-flow",
        ({ body }) => {
          const { schema, userQuery, userFeedback } = body;
          // Call mainFlow function with the correct structure
          return mainFlow({ body: { schema, userQuery, userFeedback } });
        },
        {
          // Define the request body schema using t.Object()
          body: t.Object({
            userQuery: t.String(),
            userFeedback: t.String(),
            schema: t.String(),
          }),
          detail: {
            tags: ["prompt-analysis"],
            description: "Process user query and feedback",
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
      )
      .post(
        "/option-handler",
        ({ body }) => {
          const { wordWithChoices, optionPicked } = body;
          // Call optionHandler function with the correct structure
          return optionHandler({ body: { wordWithChoices, optionPicked } });
        },
        {
          // Define the request body schema for option-handler endpoint
          body: t.Object({
            wordWithChoices: t.String(),
            optionPicked: t.String(),
          }),
          detail: {
            tags: ["option-handler"],
            description: "Handle user's option selection",
            security: [
              {
                bearer: [],
              },
            ],
          },
        },
      ),
);

export default promptAnalysisModule;
