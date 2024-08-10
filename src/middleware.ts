import { NextRequest, NextResponse } from 'next/server';

//nanti fitur selanjut nya adalah menyeting token expire lewat jwt, jika token expired maka akan di alihkan ke halaman login
export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');

    // If the request is for the login page, skip the middleware
    if (req.nextUrl.pathname === '/login') {
        return NextResponse.next();
    }

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
    matcher: ['/dashboard/:path*'], // Define paths where the middleware should be applied
};
