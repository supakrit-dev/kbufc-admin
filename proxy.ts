import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const session = request.cookies.get('admin_session')?.value
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/(.*)',
    ],
};