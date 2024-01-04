import Elysia from "elysia";
import {
  getAllChatsController,
  getChatByIdController,
} from "../controllers/chat";

export const chatModel = new Elysia({ prefix: "/chat" })
  .get("/", getAllChatsController)
  .get("/:id", getChatByIdController);
