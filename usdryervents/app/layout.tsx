import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FloatingCallBtn } from "@/components/CallBtn";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Better for Core Web Vitals
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.siteName} | Professional Dryer Vent Services`,
    template: "%s"
  },
  description: `Find professional ${siteConfig.keywords[0]} in your area. We specialize in ${siteConfig.keywords.join(', ')}.`,
  keywords: siteConfig.keywords.join(', '),
  authors: [{ name: siteConfig.siteName }],
  creator: siteConfig.siteName,
  publisher: siteConfig.siteName,
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `https://${siteConfig.domain}`,
    languages: {
      'en-US': `https://${siteConfig.domain}`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.siteName,
    title: `Find ${siteConfig.keywords[0]} | ${siteConfig.siteName}`,
    description: `Connect with licensed dryer vent technicians near you. ${siteConfig.keywords[0]}, repair, and installation.`,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.siteName} - Find Dryer Vent Services Near Me`,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.siteName} | Professional Services`,
    description: `Find licensed dryer vent technicians in your area. ${siteConfig.keywords[0]} & repair.`,
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: "k2L90XxpR-_CGNrjycPWVoRqgU8j0bhMr2VGg8enMy0", // Keeping existing verification as requested "switch domain" implies transfer or maybe I should ask? User said "switch everything around this domain". I will leave it for now but note it.
    other: {
      'google-site-verification': 'lgcZeYFjy6_RN8tv-59xVXdJ35rboFAIZdMpWaeGNsk',
    }
  },
  category: 'Home Improvement',
};

// Organization Schema for Site-wide SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.siteName,
  "url": `https://${siteConfig.domain}`,
  "logo": siteConfig.organization.logo,
  "description": "Leading directory for dryer vent cleaning and repair services.",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": siteConfig.phone,
    "contactType": "customer service",
    "availableLanguage": "English"
  },
  "sameAs": []
};

// WebSite Schema for Sitelinks Search Box
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.siteName,
  "url": `https://${siteConfig.domain}`,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `https://${siteConfig.domain}/{search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for analytics/tracking if any */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6SFTTD69YW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-6SFTTD69YW');
          `}
        </Script>
        {children}
        <FloatingCallBtn />
      </body>
    </html>
  );
}

