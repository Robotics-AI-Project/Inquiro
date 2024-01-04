import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  apiRoutes: ["/api(.*)"],
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)",
};
