import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">{siteConfig.siteName}</h4>
                        <p className="text-sm mb-4">America&apos;s trusted dryer vent service partner. Connecting homeowners with local safety experts nationwide.</p>
                        <a href={`tel:${siteConfig.phone}`} className="text-xl font-bold text-white hover:text-orange-500 transition-colors flex items-center gap-2">
                            📞 {siteConfig.phone}
                        </a>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Find Your City</Link></li>
                            <li><Link href="/#states" className="hover:text-white transition-colors">Browse States</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Get A Quote</Link></li>
                            <li><Link href="/sitemap" className="hover:text-white transition-colors">Site Directory</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><span className="cursor-default">Vent Cleaning</span></li>
                            <li><span className="cursor-default">Vent Repair</span></li>
                            <li><span className="cursor-default">Installation</span></li>
                            <li><span className="cursor-default">Bird Guards</span></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-sm">
                    &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
