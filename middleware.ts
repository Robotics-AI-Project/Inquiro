import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["/api/health", "/api/swagger(.*)"],
  apiRoutes: ["/api(.*)"],
  debug: true,
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)",
};
