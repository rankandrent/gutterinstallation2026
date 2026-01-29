'use client'

import { usePathname } from 'next/navigation'
import { PHONE_NUMBER, PHONE_HREF } from '@/components/CallBtn'

export function FloatingCallBtn() {
    const pathname = usePathname()
    // Check if we are on an "ice-dam-removal" page
    const isIceDamPage = pathname?.includes('ice-dam-removal')

    const phoneNumber = isIceDamPage ? "+1 (323) 693-8415" : PHONE_NUMBER
    const phoneHref = isIceDamPage ? "tel:+13236938415" : PHONE_HREF

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
            <a
                href={phoneHref}
                className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl border-4 border-white/20 font-bold text-lg"
            >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    📞
                </div>
                Call Now for Estimate
                {isIceDamPage && <span className="sr-only"> for Ice Dam Removal</span>}
            </a>
        </div>
    )
}
