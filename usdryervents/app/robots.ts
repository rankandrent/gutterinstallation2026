import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = `https://${siteConfig.domain}`

    return {
        rules: [
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/api/', '/private/', '/admin/'],
                crawlDelay: 0.5, // Be respectful but allow faster crawling
            },
            {
                userAgent: 'Bingbot',
                allow: '/',
                disallow: ['/api/', '/private/', '/admin/'],
                crawlDelay: 1,
            },
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/private/', '/admin/'],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
        ],
        host: baseUrl,
    }
}
