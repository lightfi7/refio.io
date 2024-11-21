import { auth } from "@/lib/auth";

const protectedRoutes = [
  "/dashboard",
  "/account/profile",
  "/account/notification",
  "/account/security",
  "/account/session",
];
const publicRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/confirm-code",
  "/password-changed",
];

export default auth((req: any) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !req.auth) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);

    return Response.redirect(newUrl);
  }
  if (isPublicRoute && req.auth) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
