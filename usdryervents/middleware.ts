import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl
    const { pathname } = url
    const hostname = request.headers.get('host') || ''

    // Define main domain and allowed global paths
    // Adjust logic to handle localhost vs production automatically
    const isLocal = hostname.includes('localhost')

    // Hostname normalization to extract subdomain
    // We assume the format is [subdomain].[domain].[tld] or [subdomain].localhost
    let subdomain = null
    const hostParts = hostname.replace(/:\d+$/, '').split('.')

    if (isLocal) {
        // e.g. or.localhost -> [or, localhost]
        if (hostParts.length > 1 && hostParts[0] !== 'localhost') {
            subdomain = hostParts[0]
        }
    } else {
        // e.g. or.usdryervents.com -> [or, usdryervents, com]
        // If 3 parts or more, the first part is likely subdomain (unless it's www)
        // Adjust this logic if you have multi-level subdomains or different TLDs (co.uk)
        if (hostParts.length >= 3) {
            if (hostParts[0] === 'www') {
                subdomain = null
            } else {
                // For city-state like 'estacada-or', it is a single label subdomain
                subdomain = hostParts[0]
            }
        }
    }

    // Skip Next.js internals and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.includes('.') // Skip files with extensions
    ) {
        return NextResponse.next()
    }

    // Global paths exclusion
    // These paths should NOT be rewritten to /[state] or /[state]/[city]
    // They should be served from the root (or handled by specific pages)
    const GLOBAL_PATHS = ['/about', '/contact', '/privacy', '/terms', '/sitemap', '/robots.txt']
    if (GLOBAL_PATHS.some(path => pathname.startsWith(path))) {
        return NextResponse.next()
    }

    // Subdomain Logic
    if (subdomain) {
        // 1. State Subdomain: 2 letters (e.g. "or", "wa")
        if (subdomain.length === 2 && /^[a-zA-Z]+$/.test(subdomain)) {
            const state = subdomain.toLowerCase()
            // Rewrite: or.domain.com/foo -> /or/foo
            url.pathname = `/${state}${pathname}`
            return NextResponse.rewrite(url)
        }

        // 2. City-State Subdomain (e.g. "estacada-or")
        // Ends with -[state code]
        const cityStateMatch = subdomain.match(/^(.+)-([a-zA-Z]{2})$/)
        if (cityStateMatch) {
            const citySlug = cityStateMatch[1].toLowerCase()
            const stateCode = cityStateMatch[2].toLowerCase()

            // Handle optional /services prefix
            // If user visits /services/cleaning, mapped to internal /[state]/[city]/cleaning
            let internalPath = pathname
            if (internalPath.startsWith('/services/')) {
                internalPath = internalPath.replace('/services', '')
            } else if (internalPath === '/services') {
                internalPath = ''
            }

            // Rewrite: estacada-or.domain.com/foo -> /or/estacada/foo
            url.pathname = `/${stateCode}/${citySlug}${internalPath}`
            return NextResponse.rewrite(url)
        }
    }

    // Default Lowercase Enforcement
    // (Only if not rewritten, or we can check `pathname` again)
    // If we simply passed through, we ensure lowercase
    if (pathname !== pathname.toLowerCase()) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = pathname.toLowerCase()
        return NextResponse.redirect(redirectUrl, 301)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next (Next.js internals)
         * - static (static files)
         * - all files with extensions (e.g. favicon.ico)
         */
        '/((?!api|_next|static|[\\w-]+\\.\\w+).*)',
    ],
}
