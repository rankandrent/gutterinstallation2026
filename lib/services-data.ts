export interface ServiceDetail {
    title: string
    slug: string
    description: (city: string, state: string) => string
    icon: string
    features: string[]
    benefits: string[]
}

export const servicesData: Record<string, ServiceDetail> = {
    "seamless-gutter-installation": {
        title: "Seamless Gutter Installation",
        slug: "seamless-gutter-installation",
        description: (city, state) => `Professional seamless gutter installation services in ${city}, ${state}. Our custom-fit seamless gutters eliminate leaks and enhance your home's curb appeal.`,
        icon: "🔧",
        features: ["Custom on-site fabrication", "Multiple material options", "Perfect fit guarantee"],
        benefits: ["No seams means no leaks", "Improved aesthetics", "Longer lifespan"]
    },
    "gutter-guards-leaf-protection": {
        title: "Gutter Guards & Leaf Protection",
        slug: "gutter-guards-leaf-protection",
        description: (city, state) => `Professional gutter guards & leaf protection services in ${city}, ${state}. Keep your gutters flowing freely and stop cleaning them forever.`,
        icon: "🛡️",
        features: ["Micro-mesh technology", "Fits existing gutters", "Debris blocking"],
        benefits: ["Eliminate maintenance", "Prevent clogs", "Protect foundation"]
    },
    "gutter-cleaning-maintenance": {
        title: "Gutter Cleaning & Maintenance",
        slug: "gutter-cleaning-maintenance",
        description: (city, state) => `Professional gutter cleaning & maintenance services in ${city}, ${state}. We safely remove debris and ensure your system is working correctly.`,
        icon: "🧹",
        features: ["Thorough debris removal", "Downspout flushing", "System inspection"],
        benefits: ["Prevent water damage", "Extend gutter life", "Safety for homeowners"]
    },
    "downspout-installation-extensions": {
        title: "Downspout Installation & Extensions",
        slug: "downspout-installation-extensions",
        description: (city, state) => `Professional downspout installation & extensions services in ${city}, ${state}. Direct water away from your foundation effectively.`,
        icon: "💧",
        features: ["Strategic placement", "Durable materials", "Extension options"],
        benefits: ["Protect foundation", "Prevent erosion", "Manage heavy flow"]
    },
    "soffit-fascia-repair": {
        title: "Soffit & Fascia Repair",
        slug: "soffit-fascia-repair",
        description: (city, state) => `Professional soffit & fascia repair services in ${city}, ${state}. Restore the beauty and integrity of your roofline.`,
        icon: "🏠",
        features: ["Wood and aluminum options", "Rot replacement", "Color matching"],
        benefits: ["Prevent pest entry", "Improve ventilation", "Restore aesthetics"]
    },
    "copper-gutter-systems": {
        title: "Copper Gutter Systems",
        slug: "copper-gutter-systems",
        description: (city, state) => `Professional copper gutter systems services in ${city}, ${state}. Add timeless elegance and superior durability to your home.`,
        icon: "✨",
        features: ["Classic patina", "Lifetime durability", "Expert soldering"],
        benefits: ["Increases home value", "Never rusts", "Architectural beauty"]
    },
    "commercial-gutter-services": {
        title: "Commercial Gutter Services",
        slug: "commercial-gutter-services",
        description: (city, state) => `Professional commercial gutter services services in ${city}, ${state}. Heavy-duty solutions for businesses and large buildings.`,
        icon: "🏢",
        features: ["Box gutters", "Large capacity systems", "Maintenance contracts"],
        benefits: ["Protect assets", "Handle high volume", "Professional appearance"]
    },
    "storm-damage-repair": {
        title: "Storm Damage Repair",
        slug: "storm-damage-repair",
        description: (city, state) => `Professional storm damage repair services in ${city}, ${state}. Fast repairs for gutters damaged by wind, hail, or falling branches.`,
        icon: "⛈️",
        features: ["Emergency response", "Insurance claim assistance", "Thorough assessment"],
        benefits: ["Restore protection", "Prevent further damage", "Peace of mind"]
    },
    "ice-dam-removal": {
        title: "Ice Dam Removal",
        slug: "ice-dam-removal",
        description: (city, state) => `Professional ice dam removal services in ${city}, ${state}. Safe steam removal of ice dams to prevent roof leaks.`,
        icon: "❄️",
        features: ["Steam removal", "Safe for shingles", "Prevention advice"],
        benefits: ["Prevent roof leaks", "Protect gutters", "Winter safety"]
    },
    "underground-drain-solutions": {
        title: "Underground Drain Solutions",
        slug: "underground-drain-solutions",
        description: (city, state) => `Professional underground drain solutions services in ${city}, ${state}. Move water far away from your home with buried drainage.`,
        icon: "🚇",
        features: ["French drains", "Pop-up emitters", "Trenching services"],
        benefits: ["Eliminate yard puddles", "Dry basements", "Cleaner landscape"]
    },
    "color-gutter-matching": {
        title: "Color Gutter Matching",
        slug: "color-gutter-matching",
        description: (city, state) => `Professional color gutter matching services in ${city}, ${state}. We find the perfect shade to complement your home's siding and trim.`,
        icon: "🎨",
        features: ["20+ Aluminum colors", "Custom painting", "Sample matching"],
        benefits: ["Seamless look", "Boost curb appeal", "Personalized design"]
    },
    "emergency-gutter-repair": {
        title: "Emergency Gutter Repair",
        slug: "emergency-gutter-repair",
        description: (city, state) => `Professional emergency gutter repair services in ${city}, ${state}. When you need help fast, we are there to fix critical failures.`,
        icon: "🚨",
        features: ["24/7 availability", "Rapid response", "Detailed repairs"],
        benefits: ["Prevent water damage", "Immediate fix", "Safety first"]
    }
}
