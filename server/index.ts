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
import { metadataDb } from "./configs/db";
import {
  createDashboard,
  getAllDashboards,
  getDashboardById,
  updateDashboardById,
} from "./modules/dashboard/dashboard.service";
import { executeSQL } from "./modules/db/db.service";
import {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippetById,
} from "./modules/snippet/snippet.service";
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
          async ({ body }) => {
            const { userQuery, userFeedback, chatId } = body;
            await metadataDb.message.create({
              data: {
                content: !userFeedback ? userQuery : userFeedback,
                chatId,
                agent: "USER",
              },
            });
            // call main flow function with the correct structure
            const result = await promptAnalysis(userQuery, userFeedback);
            if (!result.isCompleted) {
              switch (result.feedbackMode) {
                case "manual": {
                  return metadataDb.$transaction(async (tx) => {
                    const clarification = await tx.promptClarification.create({
                      data: {
                        clarificationType: "MANUAL",
                      },
                    });
                    return tx.message.create({
                      data: {
                        content: result.output,
                        chatId,
                        clarificationId: clarification.id,
                        agent: "CHATBOT",
                      },
                    });
                  });
                }
                case "option": {
                  return metadataDb.$transaction(async (tx) => {
                    const clarification = await tx.promptClarification.create({
                      data: {
                        clarificationType: "OPTION",
                        options: result.options,
                      },
                    });
                    return tx.message.create({
                      data: {
                        content: result.output,
                        chatId,
                        clarificationId: clarification.id,
                        agent: "CHATBOT",
                      },
                    });
                  });
                }
              }
            }
            const sql = await c3Sql(result.output);

            return metadataDb.message.create({
              data: {
                content: sql,
                chatId,
                agent: "CHATBOT",
                messageType: "SQL",
              },
            });
          },
          {
            // Define the request body schema using t.Object()
            body: t.Object({
              userQuery: t.String(),
              userFeedback: t.String(),
              chatId: t.String(),
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
          .get(
            "",
            ({ clerk, query: { snippetIds } }) =>
              getAllSnippets(clerk.id, snippetIds),
            {
              query: t.Object({
                snippetIds: t.Optional(t.String()),
              }),
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
            },
          )
          .get(
            "/:snippetId",
            ({ clerk, params }) => getSnippetById(clerk.id, params.snippetId),
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
          )
          .post(
            "",
            ({ clerk, body }) => createSnippet(clerk.id, body.name, body.sql),
            {
              body: t.Optional(
                t.Object({
                  name: t.String(),
                  sql: t.String(),
                }),
              ),
              detail: {
                tags: ["snippet"],
                description: "Create snippet",
                security: [
                  {
                    bearer: [],
                  },
                ],
              },
            },
          )
          .put(
            "/:snippetId",
            ({ params, body }) => updateSnippetById(params.snippetId, body),
            {
              body: t.Object({
                name: t.Optional(t.String()),
              }),
              detail: {
                tags: ["snippet"],
                description: "Rename snippet",
                security: [
                  {
                    bearer: [],
                  },
                ],
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
      )
      .group("/sql-execution", (app) =>
        app.post("", ({ body }) => executeSQL(body.sql), {
          body: t.Object({
            sql: t.String(),
          }),
          detail: {
            tags: ["sql-execution"],
            description: "Execute SQL",
            security: [
              {
                bearer: [],
              },
            ],
          },
        }),
      )
      .group("/dashboard", (app) =>
        app
          .get("", ({ clerk }) => getAllDashboards(clerk.id), {
            detail: {
              tags: ["dashboard"],
              description: "Get all dashboards of user",
              security: [
                {
                  bearer: [],
                },
              ],
            },
          })
          .post("", ({ clerk, body }) => createDashboard(clerk.id, body), {
            body: t.Object({
              name: t.Optional(t.String()),
            }),
            detail: {
              tags: ["dashboard"],
              description: "Create dashboard",
              security: [
                {
                  bearer: [],
                },
              ],
            },
          })
          .get(
            "/:dashboardId",
            ({ clerk, params }) =>
              getDashboardById(clerk.id, params.dashboardId),
            {
              detail: {
                tags: ["dashboard"],
                description: "Get dashboard by id",
                security: [
                  {
                    bearer: [],
                  },
                ],
              },
            },
          )
          .patch(
            "/:dashboardId",
            ({ clerk, body, params }) =>
              updateDashboardById(clerk.id, params.dashboardId, body),
            {
              body: t.Object({
                name: t.Optional(t.String()),
                content: t.Optional(t.Object(t.Any())),
              }),
            },
          ),
      ),
  );

export type BackendApp = typeof backendApp;
