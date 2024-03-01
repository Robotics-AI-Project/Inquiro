import { basePrivateBackend } from "@/server/setup";
import { t } from "elysia";
import {
  addKnowledgeBaseFromGoogleDriveFolderID,
  createKnowledgeBase,
  deleteKnowledgeBase,
} from "./knowledgebase.service";

export const knowledgeBaseManagement = basePrivateBackend.group(
  "/knowledgebase-management",
  (app) =>
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
);
