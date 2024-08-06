import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    if (!token) {
        // Redirect user to login page if not authenticated
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Continue to the requested page
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'], // Define paths where the middleware should be applied
};
