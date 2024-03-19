import { basePrivateBackend } from "../setup";
import { chatModule } from "./chat";
import { messageModule } from "./message";
import { promptAnalysisModule } from "./prompt-analysis";
import { snippetModule } from "./snippet";
import { sqlGenerationModule } from "./sql-generation";

export const registerModule = (app: typeof basePrivateBackend) => {
  // Could not iteratively register modules dynamically due to deep resursive type inference limit
  return app
    .use(chatModule)
    .use(snippetModule)
    .use(promptAnalysisModule)
    .use(messageModule)
    .use(sqlGenerationModule);
};
