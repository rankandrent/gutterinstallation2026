
export interface ContentVars {
    intro: string
    serviceDesc: string
    whyChoose: string
    processIntro: string
    materials: string
    technicalSpecs: string
    climateConsiderations: string
    faqAnswers: { [key: string]: string }
}

// Regional climate data - adapted for dryer vents (humidity, cold affecting condensation etc.)
const CLIMATE_ZONES: Record<string, { type: string; considerations: string }> = {
    // Cold climates - risk of frozen vents and condensation
    "CT": { type: "cold", considerations: "ice dams on vents and condensation freezing" },
    "MA": { type: "cold", considerations: "frozen vent caps and heavy accumulation" },
    "ME": { type: "cold", considerations: "freezing temps causing vent blockages" },
    "NH": { type: "cold", considerations: "ice blocking external vent flaps" },
    "NY": { type: "cold", considerations: "winter condensation freezing in ducts" },
    "VT": { type: "cold", considerations: "heavy snow blocking roof vents" },
    "PA": { type: "cold", considerations: "freezing cycles affecting vent moisture" },
    "NJ": { type: "cold", considerations: "seasonal temp changes affecting static pressure" },
    "IL": { type: "cold", considerations: "winter lint compaction and freezing" },
    "IN": { type: "cold", considerations: "cold weather efficiency drops" },
    "MI": { type: "cold", considerations: "lake effect snow covering vents" },
    "MN": { type: "cold", considerations: "extreme cold icing up vent terminations" },
    "OH": { type: "cold", considerations: "moisture freezing in long runs" },
    "WI": { type: "cold", considerations: "frozen flaps and condensation issues" },

    // Humid climates - risk of mold and heavy lint sticking
    "FL": { type: "tropical", considerations: "high humidity causing increased lint adhesion" },
    "GA": { type: "humid", considerations: "humid air reducing drying efficiency" },
    "AL": { type: "humid", considerations: "moisture buildup promoting mold growth" },
    "LA": { type: "tropical", considerations: "heavy atmospheric moisture" },
    "MS": { type: "humid", considerations: "humidity slowing down drying times" },
    "SC": { type: "humid", considerations: "coastal moisture affecting vent performance" },
    "NC": { type: "humid", considerations: "humidity and seasonal pollen entering vents" },

    // Hot/Dry - risk of overcrowding/fire
    "AZ": { type: "desert", considerations: "high heat increasing fire risks in clogged vents" },
    "NM": { type: "desert", considerations: "dry heat and static electricity buildup" },
    "NV": { type: "desert", considerations: "dust and sand entering exterior vents" },
    "TX": { type: "mixed", considerations: "heat intensity and pest intrusion" },
    "OK": { type: "mixed", considerations: "wind debris and storm damage to caps" },

    // Mixed
    "CA": { type: "mixed", considerations: "wildfire ash and seasonal debris" },
    "WA": { type: "rainy", considerations: "wet lint compaction and moss on roof vents" },
    "OR": { type: "rainy", considerations: "continuous moisture requiring sealed joints" },
}

const getClimateContent = (stateCode: string): string => {
    const climate = CLIMATE_ZONES[stateCode.toUpperCase()]
    if (climate) {
        return climate.considerations
    }
    return "seasonal temperature and humidity changes"
}

const VARIANTS = {
    intros: [
        (city: string, state: string) => `Searching for **dryer vent cleaning near me in ${city}**? You've found the #1 rated local dryer vent experts in **${state}**. We specialize in removing dangerous lint buildup, repairing damaged ducts, and installing bird guards to keep your home safe and efficient.`,
        (city: string, state: string) => `When you search for **dryer vent cleaning services** in **${city}**, safety is priority number one. Our ${state}-based technicians provide professional **dryer vent cleaning near me**, preventing fire hazards and reducing your energy bills significantly.`,
        (city: string, state: string) => `Looking for **dryer vent repair near me in ${city}, ${state}**? We are the local authority on dryer exhaust safety. From disconnected ducts to crushed hoses, we fix it all. Don't let a clogged vent threaten your home's safety.`,
        (city: string, state: string) => `Need **professional dryer vent installation in ${city}**? Our ${state}-certified crews install code-compliant rigid metal ductwork. We're the trusted name for **dryer vent services near me** in your neighborhood, ensuring optimal airflow.`,
        (city: string, state: string) => `**${city}** homeowners searching for **dryer cleaner near me** trust our experts. We use industrial HEPA vacuums and rotary brushes to remove 100% of lint. We've serviced thousands of homes across **${state}** with 5-star results.`,
        (city: string, state: string) => `Prevent dryer fires before they start. **Dryer vent cleaning in ${city}** is essential for home safety. Our **${state}** insured professionals are ready to protect your home with thorough inspection and cleaning services.`,
        (city: string, state: string) => `When you search for **dryer duct cleaning near me**, ${city} residents choose US Dryer Vents for our transparent pricing and advanced cleaning technology. We serve all of **${state}** with prompt, reliable service.`,
        (city: string, state: string) => `Your home in **${city}** deserves the best protection. Our **dryer vent companies near me** use only commercial-grade tools to ensure your system meets **${state}** fire safety codes and building standards.`,
        (city: string, state: string) => `Looking for **affordable dryer vent cleaning in ${city}**? Get premium safety service without the high price tag. Every service in **${state}** comes with a 6-month no-clog guarantee.`,
        (city: string, state: string) => `For years, we've been the go-to experts for **dryer vent replacement near me** in **${city}, ${state}**. We replace unsafe vinyl hoses with rigid metal piping to maximize safety and efficiency.`,
    ],
    serviceDescs: [
        (city: string) => `Our **${city}** technicians use powerful rotary brush systems that navigate every turn of your ductwork. When you search for **dryer vent cleaning near me**, you expect a thorough job—we scrub the entire line from dryer to exit point.`,
        (city: string) => `We bring professional airflow analysis tools to every job in **${city}**. By measuring static pressure before and after, we prove the effectiveness of our work. We're the science-backed choice for **dryer duct cleaning near me**.`,
        (city: string) => `Our **${city}** installers specialize in bringing systems up to code. We replace dangerous foil and plastic transitions with semi-rigid metal hoses, making us the top choice for **dryer vent repair near me**.`,
        (city: string) => `From roof vents to sidewall caps, our **${city}** crews inspect every component. We install high-efficiency pest guards to prevent birds from nesting, a common issue for those searching **dryer vent service near me**.`,
        (city: string) => `Every cleaning in **${city}** includes a complimentary visual safety inspection. We check for crushed pipes, tape failure, and disconnection. We are the most comprehensive **dryer vent cleaner near me**.`,
        (city: string) => `Our technicians in **${city}** are trained to identify and solve "wet clothes" issues. Often, it's not the dryer—it's the vent! We save you money on appliance repair by fixing the real problem.`,
        (city: string) => `We specialize in rerouting long or inefficient vent runs in **${city}**. Shortening the distance to the exterior improves efficiency and safety, making us the experts in **dryer vent installation near me**.`,
    ],
    materials: [
        "We use **industrial-grade rotary brushes** that scrub the duct walls without damaging them, combined with **HEPA vacuums** to capture all dust and lint. Essential for effective **dryer vent cleaning near me**.",
        "For installations, we only use **26-gauge rigid galvanized steel** ductwork, never flexible plastic or foil which are fire hazards. This commitment to safety is why we are the top **dryer vent repair near me** choice.",
        "We install **heavy-duty steel bird guards** that are powder-coated to resist rust. These prevent birds, squirrels, and rodents from entering while allowing lint to escape—perfect for **dryer vent protection**.",
        "Our **Zero-airflow backdraft dampers** prevent cold air from entering your home when the dryer is off, saving you money on heating bills in winter. A smart upgrade for any **dryer vent installation**.",
        "We use **UL-listed metal foil tape** for all joints, ensuring an airtight seal that prevents lint from blowing into your walls or attic. Professional sealing is a hallmark of our **dryer duct services**.",
        "For difficult runs, we install **dryer booster fans** with pressure switches that automatically engage when the dryer runs, ensuring safe airflow over long distances.",
    ],
    whyChoose: [
        (city: string) => `We are focused solely on dryer safety in **${city}**. Unlike general handymen, we have the specialized tools and training to prevent fires and boost efficiency. The #1 **dryer vent cleaning near me** choice.`,
        (city: string) => `With reliable service in **${city}**, we've built a reputation for preventing dryer fires. According to the NFPA, dirty vents cause thousands of fires yearly—we give you peace of mind.`,
        (city: string) => `Our technicians in **${city}** are clean and respectful. We use drop cloths and shoe covers, and our vacuum systems ensure no dust enters your home during the **dryer cleaning** process.`,
        (city: string) => `Every service in **${city}** comes with a 6-month clog-free guarantee. If you experience flow issues within 6 months, we return for free. We stand behind our **dryer vent services**.`,
        (city: string) => `Our **${city}** crews offer transparent, flat-rate pricing. You'll know the exact cost of your **dryer vent cleaning** or repair before we start work. No hidden fees.`,
        (city: string) => `We are experts in **${city}** building codes regarding dryer venting. We ensure your system complies with current safety standards, which is critical when selling your home.`,
    ],
    technicalSpecs: [
        "**Duct Material:** 4-inch rigid metal (aluminum or galvanized steel). **Maximum Run:** 35 feet (minus 5 feet for every 90-degree turn). Compliance with code is why you need **professional dryer vent installation**.",
        "**Airflow Velocity:** We aim for a minimum of 1,500 feet per minute (FPM) exhaust velocity to ensure lint stays suspended and exits the system.",
        "**Transition Ducts:** We install UL-2158A listed semi-rigid metal transition ducts, limited to 8 feet in length. We never use white vinyl hoses, a major **fire hazard**.",
        "**Supports:** Ducts are supported every 4 feet and at every joint to prevent sagging where lint can accumulate. Precision installation for **dryer vent safety**.",
        "**Termination:** Exterior hoods must have a backdraft damper and no screen (screens trap lint). We install code-compliant hoods perfect for **dryer vent replacement**.",
    ],
    climateConsiderations: [
        (stateCode: string) => `In ${stateCode}, condensation is a major issue. We insulate ducts in unconditioned spaces to prevent ${getClimateContent(stateCode)}.`,
        (stateCode: string) => `${stateCode} weather can affect vent performance. Our **dryer vent cleaners** check for ${getClimateContent(stateCode)} to ensure year-round safety.`,
        (stateCode: string) => `For ${stateCode} homes, we recommend bird guards to prevent pests seeking warmth, especially given the ${getClimateContent(stateCode)}.`,
    ]
}

// Simple string hash function for deterministic selection
function getHash(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
}

export function getSEOContent(city: string, state: string, stateCode?: string): ContentVars {
    const hash = getHash(city + state)
    const code = stateCode?.toUpperCase() || state.substring(0, 2).toUpperCase()

    // Select variants using modulo of the hash
    const introFn = VARIANTS.intros[hash % VARIANTS.intros.length]
    const serviceFn = VARIANTS.serviceDescs[(hash >> 1) % VARIANTS.serviceDescs.length]
    const materialTxt = VARIANTS.materials[(hash >> 2) % VARIANTS.materials.length]
    const whyFn = VARIANTS.whyChoose[(hash >> 3) % VARIANTS.whyChoose.length]
    const techSpec = VARIANTS.technicalSpecs[(hash >> 4) % VARIANTS.technicalSpecs.length]
    const climateFn = VARIANTS.climateConsiderations[(hash >> 5) % VARIANTS.climateConsiderations.length]

    return {
        intro: introFn(city, state),
        serviceDesc: serviceFn(city),
        materials: materialTxt,
        whyChoose: whyFn(city),
        technicalSpecs: techSpec,
        climateConsiderations: climateFn(code),
        processIntro: "Our streamlined process—Inspection, Airflow Testing, cleaning with Rotary Brush, and Final Verification—ensures your dryer runs like new.",
        faqAnswers: {
            cost: `In ${city}, professional dryer vent cleaning typically ranges from $129 to $199, depending on the location of the vent (roof vs sidewall) and the level of clogging. Repairs and installations are quoted on-site.`,
            timeline: `Most dryer vent cleaning services in ${city} take between 45 minutes to an hour. Repairs or rerouting ducts may take 2-3 hours.`,
            warranty: `We offer a 6-month clog-free guarantee on all cleanings in ${city}. If your dryer flow indicator lights up again within 6 months, we clean it again for free.`,
            permit: `Cleaning does not require a permit. However, new installations or major rerouting in ${city} may require compliance with local ${state} mechanical codes, which we handle.`,
            bestGuard: `For ${state} homes, we recommend steel cage bird guards. They prevent birds and squirrels from nesting (a fire hazard) while possessing large enough openings to let lint escape, crucial for preventing ${getClimateContent(code)}.`,
            emergency: `Yes! If your dryer is overheating, smelling like burning, or won't dry clothes, call us for emergency dryer vent service in ${city}. We prioritize these calls to prevent fire risks.`,
            cleaningFrequency: `In ${city}, ${state}, we recommend annual cleaning for most homes. If you have a large family or pets, every 6-9 months is safer to prevent lint compaction and ${getClimateContent(code)}.`,
            soffitFascia: `While we focus on dryer vents, we can inspect where your vent exits through the soffit or fascia. If the damp air has caused rot, we can recommend repairs.`
        }
    }
}
