import {
  createChat,
  deleteChatById,
  getAllChats,
  getChatById,
  updateChatById,
} from "./modules/chat/chat.service";
import {
  addKnowledgeBaseFromGoogleDriveFolderID,
  createKnowledgeBase,
  deleteKnowledgeBase,
} from "./modules/knowledgebase-management/knowledgebase.service";
import {
  createMessage,
  getAllMessages,
} from "./modules/message/message.service";
import {
  basePrivateBackend,
  intializeBaseBackend,
  publicBackend,
} from "./setup";

import { promptAnalysis } from "./modules/prompt-analysis/prompt-analysys.service";

import { t } from "elysia";
import { c3Sql } from "./modules/sql-generation/c3-sql";

export const backendApp = intializeBaseBackend()
  .use(publicBackend)
  .use(
    basePrivateBackend
      .group("/chat", (app) =>
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
      )
      .group("/knowledgebase-management", (app) =>
        app
          .delete("/delete-knowledgebase", () => deleteKnowledgeBase(), {
            detail: {
              tags: ["knowledgebase-management"],
              description: "Delete knowledge base",
              security: [
                {
                  bearer: [],
                },
              ],
            },
          })
          .post("/create-knowledgebase", () => createKnowledgeBase(), {
            detail: {
              tags: ["knowledgebase-management"],
              description: "Create knowledge base",
              security: [
                {
                  bearer: [],
                },
              ],
            },
          })
          .post(
            "add-knowledgebase-by-folder-id",
            ({ body }) => {
              const folderID = body?.folderID;
              if (!folderID) return;
              return addKnowledgeBaseFromGoogleDriveFolderID(folderID);
            },
            {
              body: t.Optional(
                t.Object({
                  folderID: t.Optional(t.String()),
                  fileID: t.Optional(t.String()),
                }),
              ),
              detail: {
                tags: ["knowledgebase-management"],
                description: "add knowledgebase by Google Drive folder ID",
                security: [
                  {
                    bearer: [],
                  },
                ],
              },
            },
          )
          .post(
            "add-knowledgebase-by-file-id",
            ({ body }) => {
              const fileID = body?.fileID;
              if (!fileID) return;
              return addKnowledgeBaseFromGoogleDriveFolderID(fileID);
            },
            {
              body: t.Optional(
                t.Object({
                  folderID: t.Optional(t.String()),
                  fileID: t.Optional(t.String()),
                }),
              ),
              detail: {
                tags: ["knowledgebase-management"],
                description: "add knowledgebase by Google Drive file ID",
                security: [
                  {
                    bearer: [],
                  },
                ],
              },
            },
          ),
      )
      .group("/message", (app) =>
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
            ({ params, body }) =>
              createMessage(params.chatId, body.content, body.agent),
            {
              body: t.Object({
                content: t.String(),
                agent: t.Optional(
                  t.Union([t.Literal("CHATBOT"), t.Literal("USER")]),
                ),
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
      )
      .group("/prompt-analysis", (app) =>
        app.post(
          "",
          ({ body }) => {
            const { userQuery, userFeedback, schema } = body;
            // call main flow function with the correct structure
            return promptAnalysis(userQuery, userFeedback, schema);
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
        ),
      )
      .group("/snippet", (app) =>
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
      )
      .group("/sql-generation", (app) =>
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
      ),
  );

export type BackendApp = typeof backendApp;
