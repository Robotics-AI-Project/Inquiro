import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import { promptAnalysis } from "./prompt-analysys.service";

export const promptAnalysisModule = basePrivateBackend.group(
  "/prompt-analysis",
  (app) =>
    app.post(
      "",
      ({ body }) => {
        const { userQuery, userFeedback } = body;
        // call main flow function with the correct structure
        return promptAnalysis(userQuery, userFeedback);
      },
      {
        // Define the request body schema using t.Object()
        body: t.Object({
          userQuery: t.String(),
          userFeedback: t.String(),
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
    ),
);
