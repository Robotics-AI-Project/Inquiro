import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import { createChat, getAllChats, getChatMessagesById } from "./chat.service";

export const chatModule = basePrivateBackend.group("/chat", (app) =>
  app
    .get("", ({ clerk }) => getAllChats(clerk.id), {
      detail: {
        tags: ["chat"],
        description: "Get all chats of user",
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
    .post("", ({ clerk, body }) => createChat(clerk.id, body?.name), {
      body: t.Optional(
        t.Object({
          name: t.Optional(t.String()),
        }),
      ),
      detail: {
        tags: ["chat"],
      },
    })
    .get("/:chatId", ({ params }) => getChatMessagesById(params.chatId), {
      detail: {
        tags: ["chat"],
        description: "Get all messages of user in chat",
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
    }),
);
