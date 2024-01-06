import { clerkContext } from "./clerk";

export const derivers = async () => {
  return {
    clerk: await clerkContext(),
  };
};
