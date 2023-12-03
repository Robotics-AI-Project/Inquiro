import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)",
};
