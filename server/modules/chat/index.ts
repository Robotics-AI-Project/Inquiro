import { basePrivateBackend } from "@/server/setup";
import { getAllChats, getChatById } from "./chat.service";

export const chatModule = basePrivateBackend.group("/chat", (app) =>
  app
    .get("/", ({ clerk }) => getAllChats(clerk.id), {
      detail: {
        tags: ["chat"],
        security: [
          {
            bearer: [],
          },
        ],
      },
    })
    .get(
      "/:chatId",
      ({ clerk, params }) => getChatById(clerk.id, params.chatId),
      {
        detail: {
          tags: ["chat"],
          security: [
            {
              bearer: [],
            },
          ],
        },
      },
    ),
);
