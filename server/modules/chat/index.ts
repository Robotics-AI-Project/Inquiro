import Elysia from "elysia";
import {
  getAllChatsController,
  getChatByIdController,
} from "./chat.controller";

export const chatModule = new Elysia({ prefix: "/chat" })
  .get("/", getAllChatsController)
  .get("/:id", getChatByIdController);
