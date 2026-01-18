export interface ServiceDetail {
    title: string
    slug: string
    description: (city: string, state: string) => string
    icon: string
    features: string[]
    benefits: string[]
}

export const servicesData: Record<string, ServiceDetail> = {
    "dryer-vent-cleaning": {
        title: "Dryer Vent Cleaning",
        slug: "dryer-vent-cleaning",
        description: (city, state) => `Looking for professional dryer vent cleaning in ${city}, ${state}? Our specialized equipment removes dangerous lint buildup, increasing your dryer's efficiency and preventing fire hazards. Expert technicians available for same-day service.`,
        icon: "🧹",
        features: ["Rotary brush cleaning system", "High-powered HEPA vacuum extraction", "Airflow efficiency testing", "Vent cap inspection and cleaning", "Mess-free service guarantee"],
        benefits: ["Prevents dangerous dryer fires", "Reduces drying times significantly", "Lowers energy bills", "Extends dryer lifespan", "Eliminates musty odors"]
    },
    "dryer-vent-repair": {
        title: "Dryer Vent Repair",
        slug: "dryer-vent-repair",
        description: (city, state) => `Need dryer vent repair near me in ${city}, ${state}? We fix disconnected ducts, crushed hoses, and damaged vent caps. Our technicians restore proper airflow to ensure your system operates safely and efficiently.`,
        icon: "🔧",
        features: ["Duct reconnection and sealing", "Damaged transition hose replacement", "Exterior vent hood repair", "Code compliance corrections", "Rigid metal duct installation"],
        benefits: ["Restores safe operation", "Prevents carbon monoxide leaks (gas dryers)", "Stops lint accumulation in walls", "Improves dryer performance", "Complies with building codes"]
    },
    "dryer-vent-installation": {
        title: "Dryer Vent Installation & Rerouting",
        slug: "dryer-vent-installation",
        description: (city, state) => `Searching for dryer vent installation in ${city}, ${state}? We install new rigid metal venting systems and reroute inefficient ducts to shorten the path to the exterior. Professional installation ensures maximum safety and airflow.`,
        icon: "🏗️",
        features: ["New construction installation", "Vent rerouting for better efficiency", "Rigid metal ductwork (no flex pipe)", "Booster fan installation", "Roof and sidewall terminations"],
        benefits: ["Optimizes dryer efficiency", "Reduces drying time", "Prevents moisture damage in homes", "Ensures code compliance", "Minimizes lint buildup risks"]
    },
    "bird-guard-installation": {
        title: "Bird Guard & Pest Protection",
        slug: "bird-guard-installation",
        description: (city, state) => `Stop birds and pests from entering your dryer vent in ${city}, ${state}. We install high-quality bird guards and pest covers that block intruders while allowing lint and air to escape freely.`,
        icon: "🐦",
        features: ["Durable steel cage construction", "Easy-access maintenance doors", "Universal fit for all vent caps", "Prevents nesting blocking airflow", "Weather-resistant finish"],
        benefits: ["Prevents fire hazards from nests", "Stops pests from entering home", "Protects vent cover from damage", "Maintains proper airflow", "Humane pest exclusion"]
    },
    "commercial-dryer-vent-services": {
        title: "Commercial Dryer Vent Services",
        slug: "commercial-dryer-vent-services",
        description: (city, state) => `Commercial dryer vent cleaning in ${city}, ${state} for laundromats, hotels, and apartments. We handle complex multi-unit systems with industrial-grade equipment to minimize downtime and ensure fire code compliance.`,
        icon: "🏢",
        features: ["Multi-unit vent cleaning", "Laundromat duct maintenance", "HOA and condo volume discounts", "Fire code compliance documentation", "After-hours service available"],
        benefits: ["Reduces liability and fire risk", "Lowers utility costs for facility", "Increases machine longevity", "Tenant satisfaction and safety", "Compliance with insurance requirements"]
    },
    "clogged-dryer-vent-emergency": {
        title: "Clogged Dryer Vent Emergency",
        slug: "clogged-dryer-vent-emergency",
        description: (city, state) => `Dryer stopped working or won't dry clothes in ${city}, ${state}? You likely have a severe clog. Our emergency dryer vent unclogging service restores airflow immediately to prevent overheating and fire risks.`,
        icon: "🚨",
        features: ["Urgent clog removal", "Thermal fuse inspection", "Burning smell investigation", "Complete line blockage removal", "Safety inspection included"],
        benefits: ["Immediate restoration of use", "Prevents potential fire", "Diagnoses underlying issues", "Peace of mind", "Fast response time"]
    },
    // AIR DUCT SERVICES
    "air-duct-cleaning": {
        title: "Air Duct Cleaning",
        slug: "air-duct-cleaning",
        description: (city, state) => `Professional air duct cleaning in ${city}, ${state} to improve indoor air quality and HVAC efficiency. We remove dust, allergens, and debris from your home's entire ductwork system using advanced negative pressure technology.`,
        icon: "💨",
        features: ["Whole-home duct cleaning", "Negative pressure extraction", "Furnace & blower cleaning", "Vent register sanitization", "Allergen reduction"],
        benefits: ["Improves indoor air quality", "Reduces dust in the home", "Relieves allergy symptoms", "Increases HVAC efficiency", "Eliminates unpleasant odors"]
    },
    "hvac-cleaning-sanitization": {
        title: "HVAC Cleaning & Sanitization",
        slug: "hvac-cleaning-sanitization",
        description: (city, state) => `Complete HVAC system cleaning and sanitization in ${city}, ${state}. After physical cleaning, we apply EPA-approved sanitizers to eliminate bacteria, mold, and viruses from your ducts and air handling units.`,
        icon: "🧼",
        features: ["EPA-registered sanitizers", "Mold & bacteria elimination", "Odor neutralization", "Safe for children & pets", "Complete system fogging"],
        benefits: ["Healthier living environment", "Kills unseen pathogens", "Prevents mold regrowth", "Fresh smelling home", "Peace of mind"]
    },
    "ac-coil-cleaning": {
        title: "A/C Coil Cleaning",
        slug: "ac-coil-cleaning",
        description: (city, state) => `Expert A/C evaporator and condenser coil cleaning in ${city}, ${state}. Dirty coils reduce cooling capacity and increase energy bills. We deep clean your coils to restore factory-fresh performance.`,
        icon: "❄️",
        features: ["Evaporator coil cleaning", "Condenser unit washing", "Fin straightening", "Debris removal", "Efficiency check"],
        benefits: ["Lowers cooling costs", "Extends A/C lifespan", "Prevents system freeze-ups", "Improves cooling power", "Reduces compressor strain"]
    },
    "mold-remediation-ducts": {
        title: "Duct Mold Remediation",
        slug: "mold-remediation-ducts",
        description: (city, state) => `Specialized mold remediation for air ducts in ${city}, ${state}. If you smell musty odors or see mold growth on vents, our certified technicians safely remove it and treat the system to prevent return.`,
        icon: "🍄",
        features: ["Mold spore containment", "Video inspection verification", "Antimicrobial coating", "Root cause identification", "Certified remediation process"],
        benefits: ["Eliminates health hazards", "Stops mold spreading", "Removes musty smells", "Protects home value", "Safe, verified results"]
    }
}
