import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;
  const host = req.headers.get('host') || '';

  // Check if the user has app subdomain
  const hasNoteSubdomain = host.startsWith('note.');
  const hasGallerySubdomain = host.startsWith('gallery.');
  const hasProfileSubdomain = host.startsWith('profile.');

  if (hasNoteSubdomain) {
    return NextResponse.rewrite(new URL(`/note${pathname}${search}`, origin));
  }

  if (hasGallerySubdomain) {
    return NextResponse.rewrite(
      new URL(`/gallery${pathname}${search}`, origin),
    );
  }

  if (hasProfileSubdomain) {
    return NextResponse.rewrite(
      new URL(`/profile${pathname}${search}`, origin),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|monitoring|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
