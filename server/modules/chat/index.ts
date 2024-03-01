import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import {
  createChat,
  deleteChatById,
  getAllChats,
  getChatById,
  updateChatById,
} from "./chat.service";

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
        description: "Create chat",
        security: [
          {
            bearer: [],
          },
        ],
      },
    })
    .patch(
      "/:chatId",
      ({ params, body }) => updateChatById(params.chatId, body),
      {
        body: t.Object({
          name: t.Optional(t.String()),
        }),
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
      },
    )
    .delete("/:chatId", ({ params }) => deleteChatById(params.chatId), {
      detail: {
        tags: ["chat"],
        description: "Delete chat by id",
        security: [
          {
            bearer: [],
          },
        ],
      },
    })
    .get(
      "/:chatId",
      ({ params, clerk }) => getChatById(clerk.id, params.chatId),
      {
        detail: {
          tags: ["chat"],
          description: "Update chat by id",
          security: [
            {
              bearer: [],
            },
          ],
        },
      },
    ),
);
