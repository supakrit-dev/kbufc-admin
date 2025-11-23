import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    const session = request.cookies.get('connect.sid');
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(pathname === '/login' && session){
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next();
}

// Optionally, define a matcher to specify which paths the middleware should run on
export const config = {
    matcher: ['/admin/(.*)'],
};