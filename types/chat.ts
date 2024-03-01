import { backendClient } from "@/client/libs/api";

export type ChatData = NonNullable<
  Awaited<ReturnType<typeof backendClient.api.chat.get>>["data"]
>;
