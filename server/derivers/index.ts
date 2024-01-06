import { clerkContext } from "./clerk";

export const deriverSetup = async () => {
  return {
    clerk: await clerkContext(),
  };
};
