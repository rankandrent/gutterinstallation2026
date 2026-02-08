'use client'

import React from 'react'
import { PHONE_NUMBER, PHONE_HREF } from './CallBtn'

/**
 * FloatingCallBtn component provides a fixed-position call button
 * that remains visible as the user scrolls. Optimized for mobile
 * engagement and semantic SEO by making the conversion action easy to find.
 */
export function FloatingCallBtn() {
    return (
        <a
            href={PHONE_HREF}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-[0_10px_25px_-5px_rgba(220,38,38,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 group sm:px-6 animate-in fade-in slide-in-from-bottom-5"
            aria-label={`Call us now at ${PHONE_NUMBER}`}
        >
            <span className="text-2xl group-hover:animate-bounce" aria-hidden="true">📞</span>
            <span className="hidden sm:inline ml-2 font-bold whitespace-nowrap">{PHONE_NUMBER}</span>
        </a>
    )
}
