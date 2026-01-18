import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { CallBtn, NavbarCallBtn } from '@/components/CallBtn'
import Breadcrumb from '@/components/Breadcrumb'
import { ServiceDetail } from '@/lib/services-data'
import CityMap from '@/components/CityMap'
import { siteConfig } from '@/lib/site-config'

interface ServiceSpecificPageProps {
    city: string
    state: string
    stateCode: string
    service: ServiceDetail
    relatedCities?: {
        city: string
        state_id: string
    }[]
}

// Service-specific extended content for semantic SEO
const serviceExtendedContent: Record<string, {
    whatIs: string
    process: string[]
    materials: { name: string; description: string }[]
    faqs: { q: string; a: string }[]
    priceRange: string
    duration: string
    warranty: string
}> = {
    "dryer-vent-cleaning": {
        whatIs: "Professional dryer vent cleaning involves the thorough removal of lint, debris, and blockages from your entire dryer exhaust system. Unlike simple lint trap cleaning, our process clears the ductwork from the back of your dryer all the way to the exterior termination point.",
        process: [
            "Initial airflow velocity measurement to establish baseline",
            "Inspection of flexible transition hose for safety compliance",
            "Rotary brush cleaning of the entire duct run",
            "High-powered HEPA vacuum extraction of loosened lint",
            "Exterior vent cap cleaning and flap inspection",
            "Final airflow test to verify efficiency improvement"
        ],
        materials: [
            { name: "Rotary Brush System", description: "Soft-bristle brushes that scrub ducts without damaging them" },
            { name: "HEPA Vacuum", description: "Captures 99.97% of dust and lint particles" },
            { name: "Airflow Anemometer", description: "Precise tool to measure exhaust velocity (MPH/CFM)" },
            { name: "Safety Transition Hoses", description: "UL-listed metal foil hoses if replacement is needed" }
        ],
        faqs: [
            { q: "How often should I clean my dryer vent?", a: "Most experts and manufacturers recommend professional cleaning once a year. Households doing heavy laundry (pets, large families) may need it every 6-9 months." },
            { q: "Will cleaning reduce my electric bill?", a: "Yes. A clean vent allows your dryer to work efficiently, often reducing drying times by 50%, which saves significant energy." },
            { q: "Do you clean from the inside or outside?", a: "We typically clean from the outside to pull lint away from your home, but we can access from both ends depending on your setup." }
        ],
        priceRange: "$129 - $199 (Standard Residential)",
        duration: "45-60 minutes typically",
        warranty: "30-day clog-free guarantee"
    },
    "dryer-vent-repair": {
        whatIs: "Dryer vent repair addresses damaged, disconnected, or code-violating ductwork. Common issues include crushed hoses behind the dryer, disconnected joints inside walls, or improper materials (like plastic vinyl) that create fire hazards.",
        process: [
            "Visual inspection of accessible ductwork components",
            "Identification of crushed, torn, or disconnected sections",
            "Removal of unsafe materials (plastic/vinyl hoses)",
            "Installation of rigid metal ductwork per building code",
            "Sealing of joints with aluminum foil tape",
            "Verification of airtight connections"
        ],
        materials: [
            { name: "Rigid Metal Duct", description: "Smooth interior walls for maximum airflow, fire-resistant" },
            { name: "Semi-Rigid Aluminum", description: "Flexible yet safe transition from dryer to wall" },
            { name: "Aluminum Foil Tape", description: "UL-listed tape that withstands high heat" },
            { name: "Elbow Connectors", description: "Prevents kinks at tight 90-degree turns" }
        ],
        faqs: [
            { q: "Why is my dryer vent duct taped?", a: "Duct tape should NEVER be used on dryer vents as it dries out and fails. We use specialized aluminum foil tape rated for high temperatures." },
            { q: "Can't I just use the white plastic hose?", a: "No. Plastic vinyl hoses are highly flammable and prohibited by almost all building codes. They catch fire easily if lint creates a blockage." },
            { q: "Do you repair vents inside walls?", a: "We can often repair accessible sections. If a vent is disconnected deep inside a finished wall, we may recommend rerouting or specialized access." }
        ],
        priceRange: "$150-350+ depending on damage extent",
        duration: "1-3 hours usually",
        warranty: "1-year warranty on repairs"
    },
    "dryer-vent-installation": {
        whatIs: "New dryer vent installation or rerouting involves creating a safe, efficient path for your dryer's distinct exhaust. This is often necessary for home renovations, moving laundry rooms, or replacing dangerous long duct runs with shorter, safer routes.",
        process: [
            "Route planning to find shortest path to exterior",
            "Core drilling through siding/masonry if needed",
            "Installation of 4-inch rigid metal ductwork",
            "Proper support strapping every 4 feet",
            "Installation of fire-safe wall/ceiling penetrations",
            "Exterior termination hood installation"
        ],
        materials: [
            { name: "26-Gauge Galvanized Steel", description: "Durable rigid ducting that meets all codes" },
            { name: "No-Pest Vent Hood", description: "Magnetic or louvered exterior cap seals tight" },
            { name: "Recessed Dryer Box", description: "Allows dryer to sit flush against the wall" },
            { name: "Duct Supports", description: "Prevents sagging and separation over time" }
        ],
        faqs: [
            { q: "How long can a dryer vent be?", a: "Code typically limits runs to 35 feet, minus 5 feet for every 90-degree elbow. Shorter is always better for efficiency." },
            { q: "Can you vent a dryer into the garage?", a: "No, this is a code violation due to moisture damage and carbon monoxide risks (for gas dryers)." },
            { q: "Do you install roof vents?", a: "Yes, we can install specialized roof jacks if sidewall venting isn't an option." }
        ],
        priceRange: "$350 - $800+ (Varies by length/difficulty)",
        duration: "2-5 hours",
        warranty: "3-year installation warranty"
    },
    "bird-guard-installation": {
        whatIs: "Bird guard installation prevents birds, squirrels, and rodents from entering your home through the dryer vent. Nests in vents are a major fire hazard and block exhaust flow, leading to overheating dryers.",
        process: [
            "Removal of any existing nests or debris",
            "Sanitization of the vent opening",
            "Selection of appropriate guard size and style",
            "Secure mounting to exterior siding or masonry",
            "Verification that lint can still escape freely",
            "Caulking/sealing of mounting holes"
        ],
        materials: [
            { name: "Powder-Coated Steel Cage", description: "Durable, rust-resistant, chew-proof" },
            { name: "Louvered Vent Hood", description: "Flaps open when dryer runs, close when off" },
            { name: "Pest-Proof Screen", description: "Prevents small rodents while allowing airflow" },
            { name: "No-Clog Design", description: "Specialized shape prevents lint buildup on screen" }
        ],
        faqs: [
            { q: "Will a bird guard trap lint?", a: "Incorrectly designed guards can. We install specialized guards designed for dryer vents that allow lint to pass while stopping pests." },
            { q: "How do I know if birds are in my vent?", a: "Scratching sounds, chirping, or visible nesting material sticking out of the exterior flap are sure signs." },
            { q: "Do you remove the birds first?", a: "Yes, we insure the line is clear of active wildlife before installing the guard." }
        ],
        priceRange: "$75 - $150 installed",
        duration: "30-45 minutes",
        warranty: "5-year effective guarantee"
    },
    "commercial-dryer-vent-cleaning": {
        whatIs: "Commercial dryer vent services for laundromats, hotels, apartments, and gyms. High-usage commercial dryers generate massive amounts of lint and require more frequent, specialized cleaning to maintain safety and efficiency.",
        process: [
            "Volume flow assessment for multi-dryer systems",
            "Access panel removal for central duct shafts",
            "Industrial rotary scrubbing of large-diameter ducts",
            "Debris removal from booster fans",
            "Rooftop termination cleaning",
            "Compliance certification for insurance/fire marshal"
        ],
        materials: [
            { name: "Industrial Augers", description: "Heavy-duty cleaning cables for long runs" },
            { name: "Booster Fan Checks", description: "Testing inline fans often found in commercial systems" },
            { name: "Access Panels", description: "Installed for future cleaning access in long shafts" },
            { name: "Compliance Log", description: "Documentation for property management" }
        ],
        faqs: [
            { q: "Do you service multi-story condos?", a: "Yes, we have equipment to service rooftop vents and vertical shafts in high-rise buildings." },
            { q: "Can you work after hours?", a: "We offer flexible scheduling to minimize disruption to your business operations." },
            { q: "Does this satisfy fire code requirements?", a: "Yes, our service helps you stay compliant with NFPA 211 and local fire codes." }
        ],
        priceRange: "Custom quote based on unit count",
        duration: "Varies by property size",
        warranty: "Service contract guarantee"
    },
    "clogged-dryer-vent-emergency": {
        whatIs: "Emergency clog removal is for when your dryer stops working, overheats, or shows error codes (D80, D90, AF) due to complete blockage. A completely clogged vent is an immediate fire risk and stops laundry capability.",
        process: [
            "Urgent dispatch and diagnostic",
            "Thermal safety check of the appliance",
            "Blockage location identification (nest, lint slug, crushed pipe)",
            "Immediate obstruction removal",
            "Full line cleaning to ensure flow restoration",
            "Dryer cycle test to clear error codes"
        ],
        materials: [
            { name: "Diagnostic Camera", description: "Scopes the line to find the exact blockage" },
            { name: "Clog-Busting Auger", description: "Breaks through dense, wet lint plugs" },
            { name: "Nest Removal Tool", description: "Specifically hooks and pulls out bird nests" },
            { name: "Thermal Sensor", description: "Checks dryer operating temperature" }
        ],
        faqs: [
            { q: "Why did my dryer stop heating?", a: "Most modern dryers have a thermal fuse that blows when the vent clogs to prevent fire. We clear the vent so you can replace the fuse safely." },
            { q: "What is a D80 or D90 error?", a: "These are 'Flow Sense' codes indicating 80% or 90% blockage. The machine detects air isn't moving." },
            { q: "Is this a fire hazard?", a: "Yes. A 100% clogged vent traps all heat and lint, creating the perfect conditions for ignition." }
        ],
        priceRange: "$150 - $250 (Includes full cleaning)",
        duration: "1 hour typically",
        warranty: "Immediate flow restoration guarantee"
    },
    // AIR DUCT SERVICES CONTENT
    "air-duct-cleaning": {
        whatIs: "Professional air duct cleaning removes accumulated dust, allergens, pet dander, and contaminants from your home's forced-air heating and cooling system. We use the 'Push-Pull' method with negative air pressure to ensure 100% of the loosened debris is captured and removed from your home.",
        process: [
            "HVAC system inspection and access point creation",
            "Connection of high-powered negative air vacuum to trunk line",
            "Agitation of dust in each supply and return vent using compressed air whips",
            "Cleaning of the main trunk lines and plenum",
            "Cleaning of blower motor and furnace compartments",
            "Sealing of access holes and system test"
        ],
        materials: [
            { name: "Negative Air Machine", description: "Creates a vacuum in the ducts to pull all debris outside" },
            { name: "Air Whips & Skipper Balls", description: "Tools that whip around inside ducts to dislodge stuck-on dust" },
            { name: "HEPA Filtration", description: "Ensures no dust escapes back into the home during cleaning" },
            { name: "Compressor", description: "Powers the air whips with high pressure" }
        ],
        faqs: [
            { q: "How do I know if my ducts need cleaning?", a: "Signs include excessive dust on furniture, unexplained allergies, musty odors, or visible dust bunny buildup on vent covers." },
            { q: "Does this include the furnace?", a: "Our standard package includes cleaning the blower motor housing and furnace cabinet, which is crucial for the system's hygiene." },
            { q: "How often should it be done?", a: "The NADCA recommends cleaning every 3-5 years, or sooner if you have pets, renovations, or allergy sufferers." }
        ],
        priceRange: "$350 - $650 (Depends on sq. ft. & # of vents)",
        duration: "2-4 hours",
        warranty: "Satisfaction Guarantee"
    },
    "hvac-cleaning-sanitization": {
        whatIs: "HVAC sanitization is a critical follow-up step to duct cleaning, especially for homes with mold concerns, strong odors, or after purchasing a new home. We apply an EPA-registered antimicrobial agent that eliminates invisible bacteria, viruses, and mold spores clinging to duct surfaces.",
        process: [
            "Complete physical air duct cleaning (prerequisite)",
            "Selection of appropriate EPA-registered antimicrobial",
            "Fogging of the solution through the supply and return plenums",
            "Cycling of the HVAC fan to distribute sanitizer throughout the system",
            "Allowing dwell time for maximum effectiveness",
            "Final airing out of the home"
        ],
        materials: [
            { name: "ULV Fogger", description: "Creates an ultra-fine mist that coats every inch of the duct interior" },
            { name: "EnviroCon or similar", description: "EPA-registered, safe-for-home bacteriostat and fungistat" },
            { name: "Personal Protective Equipment", description: "Ensures technician safety during application" },
            { name: "System Labels", description: "Tags the unit with date of sanitization service" }
        ],
        faqs: [
            { q: "Is the sanitizer safe for my kids/pets?", a: "Yes, we use EPA-approved products designed for residential use. We recommend vacating the house for 1-2 hours while it settles, but it leaves no toxic residue." },
            { q: "Will this kill mold?", a: "It kills surface mold and inhibits future growth. For active heavy mold infestations, we recommend our specialized remediation service." },
            { q: "Does it help with smells?", a: "Absolutely. It kills the bacteria that cause 'dirty sock syndrome' and musty basement smells in your ducts." }
        ],
        priceRange: "$150 - $300 (Add-on service)",
        duration: "30-45 minutes (plus air-out time)",
        warranty: "6-month odor-free guarantee"
    },
    "ac-coil-cleaning": {
        whatIs: "Your A/C's evaporator and condenser coils are where heat exchange happens. If they are coated in dust and grime, your system works twice as hard to cool your home. Our coil cleaning service chemically cleans these sensitive fins to restore maximum energy efficiency.",
        process: [
            "Power checking and safe disconnect of the unit",
            "Removal of access panels to expose evaporator coil",
            "Application of self-rinsing or foaming coil cleaner",
            "Gentle brushing of condenser fins to remove leaves/cottonwood",
            "Straightening of bent cooling fins",
            "Condensate drain line flush (prevents water leaks)"
        ],
        materials: [
            { name: "Foaming Coil Cleaner", description: "Expands to push dirt out from deep between the fins" },
            { name: "Fin Comb", description: "Specialty tool to straighten bent aluminum fins for better airflow" },
            { name: "Coil Brush", description: "Soft bristles effectively remove surface debris without damage" },
            { name: "Drain Gun", description: "Uses CO2 to blast clogs out of the condensate drain line" }
        ],
        faqs: [
            { q: "Why is my A/C freezing up?", a: "Dirty coils restrict airflow, causing the coil to get too cold and freeze. Cleaning is the first step to fixing this." },
            { q: "How often should coils be cleaned?", a: "Annually. The outdoor condenser should be cleaned every spring before the heat hits." },
            { q: "Will this lower my bill?", a: "Yes! A clean coil transfers heat more efficiently, meaning your A/C runs for shorter cycles to cool the house." }
        ],
        priceRange: "$129 - $249",
        duration: "1-1.5 hours",
        warranty: "Performance improvement guarantee"
    },
    "mold-remediation-ducts": {
        whatIs: "Mold in air ducts is a serious health risk. Our remediation service is different from simple cleaning; it sets up containment to prevent cross-contamination, physically removes mold growth, and encapsulates surfaces to prevent return. Ideally meant for homes with water damage or high humidity issues.",
        process: [
            "Containment setup (zipper doors, negative air)",
            "Video inspection to identify extent of growth",
            "HEPA vacuuming of spores",
            "Physical agitation and removal of mold colonies",
            "Antimicrobial treatment",
            "Application of fiber-lock encapsulant (if needed) to seal surfaces"
        ],
        materials: [
            { name: "HEPA 500 Scrubber", description: "Filters the air in the workspace to hospital standards" },
            { name: "Fungicidal Coating", description: "Specialized coating that kills mold roots" },
            { name: "Encapsulant", description: "Seals porous duct surfaces so mold cannot feed on them" },
            { name: "Inspection Camera", description: "Verifies that all visible mold has been removed" }
        ],
        faqs: [
            { q: "Do I need to test for mold first?", a: "We recommend a third-party test if you need legal proof, but if growth is visible, we can proceed with remediation immediately." },
            { q: "Can you clean flex duct with mold?", a: "Often, flex duct with heavy mold cannot be fully cleaned and must be replaced. We will advise you on the most cost-effective solution." },
            { q: "Is this guaranteed?", a: "We guarantee the removal of the mold. However, you must fix the moisture source (leak, humidity) to prevent it from eventually returning." }
        ],
        priceRange: "$500 - $1,500+ (Varies by severity)",
        duration: "4-8 hours",
        warranty: "1-year remediation warranty"
    }
}

export default function ServiceSpecificPage({ city, state, stateCode, service, relatedCities }: ServiceSpecificPageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Get extended content or fallback
    const extendedContent = serviceExtendedContent[service.slug] || serviceExtendedContent["dryer-vent-cleaning"]

    // Build comprehensive schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.title} in ${formattedCity}, ${stateCode}`,
        "description": service.description(formattedCity, formattedState),
        "provider": {
            "@type": "LocalBusiness",
            "name": siteConfig.siteName,
            "telephone": siteConfig.phone,
            "url": `https://${siteConfig.domain}`,
            "priceRange": "$$",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": formattedCity,
                "addressRegion": stateCode,
                "addressCountry": "US"
            }
        },
        "areaServed": {
            "@type": "City",
            "name": formattedCity,
            "containedInPlace": {
                "@type": "State",
                "name": formattedState
            }
        },
        "serviceType": service.title,
        "offers": {
            "@type": "Offer",
            "priceSpecification": {
                "@type": "PriceSpecification",
                "priceCurrency": "USD",
                "price": extendedContent.priceRange
            },
            "availability": "https://schema.org/InStock"
        },
        "termsOfService": extendedContent.warranty,
        "url": `https://${siteConfig.domain}/${stateCode}/${city}/${service.slug}`
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": extendedContent.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
            }
        }))
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-500 selection:text-white">

            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-500">
                        {siteConfig.siteName}
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-orange-600 transition-colors">Locations</Link>
                            <Link href="/about" className="hover:text-orange-600 transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link>
                        </div>
                        <NavbarCallBtn />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-orange-400/30 bg-orange-500/10 backdrop-blur-sm text-orange-300 text-sm font-semibold uppercase tracking-wider">
                            {service.title} Experts in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-6 leading-tight tracking-tight">
                            {service.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">{formattedCity}, {stateCode.toUpperCase()}</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 font-light">
                            {service.description(formattedCity, formattedState)}
                        </p>

                        {/* Quick Info Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                💰 {extendedContent.priceRange}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                ⏱️ {extendedContent.duration}
                            </span>
                            <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20">
                                🛡️ {extendedContent.warranty}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105 bg-orange-600 hover:bg-orange-700" label="Get Free Quote" showNumber={true} />
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            {/* Generic Icon/Placeholder instead of Gutter Image */}
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
                                <span className="text-8xl">{service.icon}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Breadcrumb items={[
                { label: state, href: `/${stateCode}` },
                { label: formattedCity, href: `/${stateCode}/${city}` },
                { label: service.title, href: `/${stateCode}/${city}/${service.slug}` }
            ]} />

            {/* What Is This Service Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                        What is {service.title}?
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        {extendedContent.whatIs}
                    </p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Key Features of Our {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.features.map((feature, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 text-2xl mb-4">
                                    {['🔥', '⚡', '✅', '🏠'][i % 4]}
                                </div>
                                <p className="text-slate-700 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Our {service.title} Process in {formattedCity}
                    </h2>
                    <div className="space-y-6">
                        {extendedContent.process.map((step, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {i + 1}
                                </div>
                                <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <p className="text-slate-700">{step}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials Section */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Equipment & Materials Used
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {extendedContent.materials.map((material, i) => (
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{material.name}</h3>
                                <p className="text-slate-600">{material.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        Benefits of Professional {service.title}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                                <div className="text-3xl mb-3">
                                    {['✓', '⭐', '🛡️', '💎'][i % 4]}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit}</h3>
                                <p className="text-sm text-slate-600">Top-rated {service.title.toLowerCase()} service.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Local Service Area */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">
                            {service.title} Service Area in {formattedCity}
                        </h2>
                        <p className="text-lg text-slate-600 mb-6">
                            We provide {service.title.toLowerCase()} services throughout {formattedCity} and the surrounding {stateCode.toUpperCase()} areas. Our local technicians are familiar with {formattedCity}'s building codes and dryer vent configurations.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Licensed & Insured in {stateCode.toUpperCase()}
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Local {formattedCity} technicians
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Same-day appointments available
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Fire Safety Certified
                            </li>
                        </ul>
                    </div>
                    <div>
                        <CityMap city={formattedCity} state={stateCode} />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {service.title} FAQs for {formattedCity} Homeowners
                    </h2>
                    <div className="space-y-4">
                        {extendedContent.faqs.map((faq, i) => (
                            <details key={i} className="group bg-slate-50 p-6 rounded-xl border border-slate-200 open:border-orange-300 open:bg-orange-50 transition-all">
                                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none text-slate-800">
                                    <span>{faq.q}</span>
                                    <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p className="text-slate-600 mt-4 leading-relaxed">{faq.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Info */}
            <section className="py-16 px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">{service.title} Pricing in {formattedCity}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">💵</div>
                            <div className="text-sm text-slate-500 mb-1">Typical Price Range</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.priceRange}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">⏰</div>
                            <div className="text-sm text-slate-500 mb-1">Time to Complete</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.duration}</div>
                        </div>
                        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-3xl mb-2">🛡️</div>
                            <div className="text-sm text-slate-500 mb-1">Warranty Included</div>
                            <div className="text-xl font-bold text-slate-900">{extendedContent.warranty}</div>
                        </div>
                    </div>
                    <p className="text-slate-500 mt-6 text-sm">
                        *Prices vary based on accessibility and duct length. Request a free quote for exact pricing.
                    </p>
                </div>
            </section>

            {/* Nearby Cities */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-white border-t border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            {service.title} Also Available in Nearby Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}/${service.slug}`}
                                    className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all text-center text-slate-700 font-medium truncate"
                                    title={`${service.title} in ${cityData.city}`}
                                >
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-20 px-6 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready for {service.title}?
                    </h2>
                    <p className="text-orange-200 text-lg mb-8 max-w-2xl mx-auto">
                        Get a free, no-obligation quote from our local {formattedCity} technicians. We respond within 24 hours.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl bg-orange-600 hover:bg-orange-700" label="Call Now for Free Quote" showNumber={true} />
                </div>
            </section>

            <TrustBadges />
            <RelatedServices city={formattedCity} state={stateCode} />
            <Footer />
        </div>
    )
}
