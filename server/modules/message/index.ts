import { basePrivateBackend } from "@/server/setup";
import { getAllMessages, createMessage } from "./message.service";
import { t } from "elysia";

export const messageModule = basePrivateBackend.group("/message", (app) =>
  app
    .get("/:chatId", ({ params }) => getAllMessages(params.chatId), {
      detail: {
        tags: ["message"],
        description: "Get all messages of chat",
        security: [
          {
            bearer: [],
          },
        ],
      },
    })
    .post(
      "/:chatId",
      ({ params, body }) => createMessage(params.chatId, body.content),
      {
        body: t.Object({
          content: t.String(),
        }),
        detail: {
          tags: ["message"],
          description: "Post message to chat id",
          security: [
            {
              bearer: [],
            },
          ],
        },
      },
    ),
);
