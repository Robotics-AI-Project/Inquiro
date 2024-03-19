import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  ignoredRoutes: ["/api/health", "/api/swagger(.*)"],
  apiRoutes: ["/api(.*)"],
});

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - _next/static (static files)
   * - favicon.ico (favicon file)
   * - assets (static assets)
   */
  matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)",
};
