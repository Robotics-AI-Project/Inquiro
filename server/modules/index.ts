import { basePrivateBackend } from "../setup";
import { chatModule } from "./chat";
import { snippetModule } from "./snippet";

export const registerModule = (baseApp: typeof basePrivateBackend) => {
  return baseApp.use(chatModule).use(snippetModule);
};
