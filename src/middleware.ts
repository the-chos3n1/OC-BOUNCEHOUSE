import { NextResponse, type NextRequest } from "next/server";

/** Legacy URLs → one-page scroll anchors on `/` */
const scrollTargets: Record<string, string> = {
  "/rentals": "/#rentals",
  "/how-it-works": "/#how-it-works",
  "/service-areas": "/#service-areas",
  "/contact": "/#contact",
  "/book": "/#book",
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const destination = scrollTargets[path];
  if (!destination) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/";
  const hashOnly = destination.split("#")[1];
  url.hash = hashOnly ? `#${hashOnly}` : "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/rentals",
    "/how-it-works",
    "/service-areas",
    "/contact",
    "/book",
  ],
};
