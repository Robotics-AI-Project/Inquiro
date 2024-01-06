import { basePrivateBackend } from "@/server/setup";

export const snippetModule = basePrivateBackend.group("/snippet", (app) =>
  app
    .get("/", ({ clerk }) => `Hello snippet ${clerk.id}`, {
      detail: {
        tags: ["snippet"],
        security: [
          {
            bearer: [],
          },
        ],
      },
    })
    .get(
      "/:snippetId",
      ({ clerk, params }) =>
        `Hello snippet ${clerk.id} and snippet id ${params.snippetId}`,
      {
        detail: {
          tags: ["snippet"],
          security: [
            {
              bearer: [],
            },
          ],
        },
      },
    ),
);
