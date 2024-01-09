import { basePrivateBackend } from "@/server/setup";

export const snippetModule = basePrivateBackend.group("/snippet", (app) =>
  app
    .get("", ({ clerk }) => `Hello snippet ${clerk.id}`, {
      detail: {
        tags: ["snippet"],
        description: "Get all snippets of user",
        security: [
          {
            bearer: [],
          },
        ],
        responses: {
          200: {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: {
                        type: "string",
                      },
                      name: {
                        type: "string",
                      },
                      createdAt: {
                        type: "string",
                      },
                      updatedAt: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    })
    .get(
      "/:snippetId",
      ({ clerk, params }) =>
        `Hello snippet ${clerk.id} and snippet id ${params.snippetId}`,
      {
        detail: {
          tags: ["snippet"],
          description: "Get all messages of user in snippet",
          security: [
            {
              bearer: [],
            },
          ],
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "string",
                        },
                        name: {
                          type: "string",
                        },
                        createdAt: {
                          type: "string",
                        },
                        updatedAt: {
                          type: "string",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ),
);
