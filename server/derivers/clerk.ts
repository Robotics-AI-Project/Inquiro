import { currentUser } from "@clerk/nextjs";

export const clerkContext = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User not found");

  return user;
};
