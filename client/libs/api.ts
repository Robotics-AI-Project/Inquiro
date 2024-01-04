import { edenTreaty } from "@elysiajs/eden";
import type { BackendApp } from "@server/index";

export const backendClient = edenTreaty<BackendApp>("/");
