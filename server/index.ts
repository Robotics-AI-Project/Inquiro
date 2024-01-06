import { registerModule } from "./modules";
import {
  basePrivateBackend,
  intializeBaseBackend,
  publicBackend,
} from "./setup";

const privateBackend = registerModule(basePrivateBackend);

export const backendApp = intializeBaseBackend()
  .use(publicBackend)
  .use(privateBackend);

export type BackendApp = typeof backendApp;
