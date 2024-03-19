import { backendClient } from "@/client/libs/api";

export type Message = NonNullable<
  Awaited<
    ReturnType<(typeof backendClient.api.message)[":chatId"]["get"]>
  >["data"]
>[number];
