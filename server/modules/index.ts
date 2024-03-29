import { basePrivateBackend } from "../setup";
import { chatModule } from "./chat";
import { promptAnalysisModule } from "./prompt-analysis";
import { snippetModule } from "./snippet";

export const registerModule = (app: typeof basePrivateBackend) => {
  // Could not iteratively register modules dynamically due to deep resursive type inference
  return app.use(chatModule).use(snippetModule).use(promptAnalysisModule);
};
