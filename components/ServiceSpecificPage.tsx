import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/RelatedServices'
import TrustBadges from '@/components/TrustBadges'
import { CallBtn, NavbarCallBtn } from '@/components/CallBtn'
import Breadcrumb from '@/components/Breadcrumb'
import { ServiceDetail } from '@/lib/services-data'
import CityMap from '@/components/CityMap'
import NeighborhoodsSection from '@/components/NeighborhoodsSection'
import LocalEnvironmentData from '@/components/LocalEnvironmentData'
import type { NeighborhoodData } from '@/lib/neighborhoods-supabase'

interface ServiceSpecificPageProps {
    city: string
    state: string
    stateCode: string
    service: ServiceDetail
    relatedCities?: {
        city: string
        state_id: string
    }[]
    neighborhoodData?: NeighborhoodData | null
}

// Service-specific extended content for semantic SEO - Gutter Services
const serviceExtendedContent: Record<string, {
    whatIs: string
    process: string[]
    materials: { name: string; description: string }[]
    faqs: { q: string; a: string }[]
    priceRange: string
    duration: string
    warranty: string
}> = {
    "seamless-gutter-installation": {
        whatIs: "Seamless gutter installation is the gold standard for modern home water management. Unlike traditional sectional gutters that are pieced together from pre-cut lengths, seamless gutters are custom-fabricated on-site using a specialized portable roll-forming machine. This allows for a continuous run of aluminum or copper that perfectly matches the dimensions of your roofline. The absence of joints along the straight sections is the key advantage; seams are the primary failure points in any gutter system, where expansion, contraction, and debris buildup inevitably lead to leaks and sagging. By eliminating these weak points, seamless systems provide superior structural integrity, reduce the risk of basement flooding, and maintain a cleaner, more streamlined aesthetic for your home's exterior. Our installation crews focus on precision, ensuring a perfect 1/4-inch slope towards downspouts for optimal drainage velocity.",
        process: [
            "Comprehensive on-site assessment and digital roofline mapping",
            "Custom fabrication using heavy-duty 0.032 gauge aluminum coils",
            "Precision cutting and mitering of corner joints for a watertight fit",
            "Installation of reinforced hidden hangers every 18-24 inches",
            "Professional mounting with laser-leveled sloping for drainage",
            "Hand-soldered or high-grade sealed end caps and outlets",
            "Full water flow testing to verify 100% drainage efficiency"
        ],
        materials: [
            { name: "Heavy-Duty Aluminum Coil", description: "0.032 inch thickness for maximum durability and dent resistance" },
            { name: "K-Style & Half-Round Profiles", description: "Architectural options to match any home style or water volume" },
            { name: "Stainless Steel Hidden Hangers", description: "Corrosion-resistant brackets that provide invisible, robust support" },
            { name: "Professional Grade Sealant", description: "Industrial silicone that remains flexible in extreme temperature swings" }
        ],
        faqs: [
            { q: "What is the primary benefit of seamless vs. sectional gutters?", a: "The biggest benefit is the elimination of leak-prone joints. Seams in sectional gutters are where debris gets caught and where seals eventually fail. Seamless gutters are stronger and significantly more reliable." },
            { q: "How long does a typical installation take?", a: "Most residential seamless gutter installations are completed in a single day. Large or complex rooflines may occasionally require a second day for finishing details." },
            { q: "Can I choose a color to match my trim?", a: "Absolutely. We offer over 30 factory-baked enamel colors, ensuring a perfect match for your home's siding or fascia." },
            { q: "How often do seamless gutters need to be inspected?", a: "We recommend a professional inspection at least once a year, preferably in late autumn, to ensure all connections and slopes remain optimal." }
        ],
        priceRange: "$9 - $18 per linear foot",
        duration: "Finished in 4-8 hours",
        warranty: "Lifetime Material & 5-Year Labor Warranty"
    },
    "gutter-guards-leaf-protection": {
        whatIs: "Professional gutter guard installation is an essential investment for homeowners looking to protect their property from the devastating effects of clogged gutters. Our leaf protection systems utilize advanced micro-mesh technology, constructed from surgical-grade stainless steel with thousands of tiny openings as small as 50 microns. This design is engineered to capture 100% of rainwater, even in the heaviest downpours, while effectively blocking even the smallest debris like pine needles, maple seeds, and shingle granules. By preventing clogs, gutter guards eliminate the need for dangerous ladder work, protect your fascia from rotting, and prevent foundation erosion caused by overflowing water. We offer several grades of protection, from budget-friendly aluminum covers to premium stainless steel mesh that comes with a lifetime no-clog guarantee.",
        process: [
            "Complete debris removal and industrial-strength system flush",
            "Structural assessment and pitch correction of existing gutters",
            "Internal hidden hanger reinforcement for guard support",
            "Custom mitered cut and fit of guard sections to roof corners",
            "Professional fastening with high-grade self-tapping screws",
            "Testing with high-volume water simulation to verify performance",
            "Final cleanup and disposal of old debris and materials"
        ],
        materials: [
            { name: "Surgical Stainless Steel Mesh", description: "50-micron openings that block silt and pine needles" },
            { name: "Extruded Aluminum Frames", description: "High-tensile strength frames that never rust or warp" },
            { name: "Patented V-Shape Technology", description: "Self-cleaning design that allows wind to clear dry debris" },
            { name: "UV-Resistant Fasteners", description: "Color-matched screws designed for long-term outdoor exposure" }
        ],
        faqs: [
            { q: "Do gutter guards really eliminate cleaning?", a: "While 'no maintenance' is a common marketing term, the reality is that quality guards reduce cleaning needs by 90-95%. You may still need to occasionally brush off the top of the guards in very heavy tree areas." },
            { q: "Will they work with my roof type?", a: "Our guards are designed to be compatible with nearly all roof types, including asphalt shingles, metal, and tile. We use specialized installation techniques for each." },
            { q: "Do they cause ice dams in winter?", a: "Actually, by keeping gutters clear of water-trapping debris, quality guards often help reduce the severity of ice dam formation." },
            { q: "How much does professional installation cost?", a: "Pricing varies based on the type of guard and the linear footage of your home, but generally falls between $8 and $22 per foot installed." }
        ],
        priceRange: "$8 - $22 per linear foot",
        duration: "4-10 hours depending on size",
        warranty: "Lifetime Clog-Free Guarantee"
    },
    "gutter-cleaning-maintenance": {
        whatIs: "Professional gutter cleaning is the most cost-effective way to prevent catastrophic water damage to your home's foundation, siding, and landscaping. Our comprehensive maintenance service goes far beyond simply scooping out leaves. We perform a complete system diagnostic, identifying invisible issues like micro-leaks, loose hangers, and improper pitch before they turn into expensive repairs. Our technicians use specialized tools to safely remove all organic debris, shingle granules, and environmental buildup that can trap moisture against your home's fascia boards. A clean gutter system ensures that rainwater is channeled rapidly away from your foundation, preventing the hydrostatic pressure that causes basement cracks and flooding. We recommend a professional cleaning at least twice a year—after the spring bud drop and again after the final autumn leaves fall—to maintain a healthy, functional roofline.",
        process: [
            "Comprehensive roofline and gutter structural integrity inspection",
            "Manual hand-removal of all large debris and organic buildup",
            "High-volume air or water flushing of all horizontal gutter runs",
            "Individual snake-cleaning and flushing of every downspout",
            "Verification and adjustment of gutter slope for proper drainage",
            "Before and after photographic documentation for homeowner review",
            "Final site cleanup and eco-friendly disposal of all gutter debris"
        ],
        materials: [
            { name: "Industrial Gutter Vacuums", description: "High-suction equipment for removing fine silt and shingle grit" },
            { name: "Flexible Downspout Snakes", description: "Specialized tools to clear deep clogs in curved elbow joints" },
            { name: "Telescoping Safety Ladders", description: "Stabilized equipment that protects your gutters from weight damage" },
            { name: "Professional Grade Flushes", description: "Eco-friendly solutions that clear stubborn environmental buildup" }
        ],
        faqs: [
            { q: "How often should I have my gutters cleaned?", a: "For most homes, twice a year is sufficient. However, if your property is heavily wooded with oak or pine trees, we recommend a quarterly maintenance plan to ensure year-round protection." },
            { q: "Do you clean the downspouts as well?", a: "Yes, cleaning the downspouts is a critical part of our service. A clean gutter with a clogged downspout will still overflow and cause damage." },
            { q: "What happens if you find damage during the cleaning?", a: "Our technicians provide a detailed inspection report. If minor issues are found, we can often repair them on the spot. Major issues will be documented and quoted for a separate visit." },
            { q: "Is gutter cleaning dangerous for homeowners to do themselves?", a: "Ladder-related falls are one of the leading causes of home accidents. Our professional crews are fully insured and equipped with specialized safety gear, allowing you to stay safely on the ground." }
        ],
        priceRange: "$175 - $450 per visit",
        duration: "1.5 - 3 hours typical",
        warranty: "30-Day No-Clog Performance Guarantee"
    },
    "downspout-installation-extensions": {
        whatIs: "Downspout installation and drainage extensions are the final, critical step in any effective water management strategy. While gutters collect the rain, it's the downspouts that carry it safely to the ground. Our professional installation ensures that your downspouts are strategically sized and placed to handle the specific square footage of your roof. Standard 2x3 downspouts are often insufficient for modern homes with steep pitches; we specialize in high-capacity 3x4 'industrial' downspouts that can move twice as much water during peak storms. Furthermore, our extension solutions—including both above-ground and underground options—ensure that water is discharged at least 10 feet away from your home's foundation. This prevents the soil saturation that leads to basement seepage, foundation settling, and costly structural repairs. We use premium-grade aluminum that is color-matched to your existing system for a seamless, professional look.",
        process: [
            "Hydraulic drainage load calculation based on roof area",
            "Strategic placement planning to maximize yard drainage",
            "Precision miter-cutting of heavy-duty aluminum downspout stock",
            "Installation of reinforced color-matched wall straps",
            "Connection of high-flow elbow joints and leaf filters",
            "Trenching and installation of underground 4-inch PVC extensions",
            "Final water flow verification and discharge point testing"
        ],
        materials: [
            { name: "3x4-Inch Oversized Downspouts", description: "High-capacity aluminum stock designed for extreme rainfall" },
            { name: "Underground PVC Drain Lines", description: "Solid 4-inch piping that moves water far from the foundation" },
            { name: "Pop-Up Emitters", description: "Discharge points that open under water pressure and close to block pests" },
            { name: "Reinforced Aluminum Straps", description: "Heavy-duty fasteners that secure downspouts against high winds" }
        ],
        faqs: [
            { q: "Why should I upgrade to oversized downspouts?", a: "If your gutters overflow during heavy rain even when clean, your downspouts likely can't move the water fast enough. Upgrading to 3x4 inch spouts can often solve this problem without needing new gutters." },
            { q: "How far should water discharge from my foundation?", a: "Ideally, water should be discharged at least 10 feet away. Standard 3-foot extensions are often insufficient and can still lead to foundation dampness." },
            { q: "Can you hide my downspouts underground?", a: "Yes, we specialize in underground drainage solutions that take water from the downspout and pipe it invisibly to a pop-up emitter in your yard or to a dry well." },
            { q: "Do you offer different colors?", a: "We stock over 30 colors and can match almost any existing gutter system, siding, or trim for a perfectly integrated look." }
        ],
        priceRange: "$85 - $250 per downspout/extension",
        duration: "2 - 5 hours total",
        warranty: "10-Year Leak-Proof Warranty"
    },
    "soffit-fascia-repair": {
        whatIs: "Soffit and fascia are more than just decorative trim; they are critical structural components that protect your home's roofline and ensure proper attic ventilation. The fascia board provides the primary mounting surface for your gutter system, while the soffit allows fresh air into your attic, preventing moisture buildup and wood rot. When these components are damaged by water, pests, or age, the entire integrity of your roof is at risk. Our repair and replacement service focuses on using rot-proof materials like cellular PVC and aluminum-wrapped wood to provide a lifetime solution. We don't just cover up the problem; we identify the underlying cause of the damage—often a failing gutter or ice dam—and fix it permanently. Our goal is to restore your home's curb appeal while ensuring a dry, well-ventilated structure that will last for decades.",
        process: [
            "Comprehensive wood-rot and structural integrity inspection",
            "Safe removal of damaged fascia boards and vented soffit panels",
            "Installation of new, moisture-resistant pressure-treated framing",
            "Precision mounting of premium cellular PVC or aluminum-wrapped fascia",
            "Installation of high-flow ventilated soffit for optimal attic cooling",
            "Custom color-matching of aluminum trim coil and hardware",
            "Full cleanup and re-mounting of existing gutter systems if possible"
        ],
        materials: [
            { name: "Cellular PVC Trim Boards", description: "Advanced rot-proof material that looks like wood but never decays" },
            { name: "Ventilated Aluminum Soffit", description: "High-airflow panels that reduce attic heat and prevent moisture" },
            { name: "Polyurethane Sealants", description: "Marine-grade caulking that provides a permanent weather-tight seal" },
            { name: "Stainless Steel Fasteners", description: "Zero-rust nails and screws designed for long-term outdoor exposure" }
        ],
        faqs: [
            { q: "Why is my fascia rotted?", a: "Fascia rot is almost always caused by water backing up behind the gutter, often due to clogs, improper pitch, or the absence of a drip edge. We fix the source of the leak first." },
            { q: "Can you install aluminum covers over rotted wood?", a: "Absolutely not. Covering rotted wood traps moisture and accelerates the decay. We always remove and replace failing wood before installing any aluminum capping." },
            { q: "Does soffit ventilation affect my energy bill?", a: "Yes. A properly ventilated attic can be 30-50 degrees cooler in the summer, significantly reducing the load on your air conditioning system." },
            { q: "What is the lifespan of new fascia and soffit?", a: "When we use aluminum-wrapped or PVC materials, the life expectancy is 30-50 years, often outlasting the roof itself." }
        ],
        priceRange: "$12 - $35 per linear foot",
        duration: "1 - 2 days typically",
        warranty: "10-Year Structural Integrity Warranty"
    },
    "copper-gutter-systems": {
        whatIs: "Copper gutter systems represent the pinnacle of architectural drainage, offering a level of elegance and longevity that no other material can match. Unlike aluminum or steel, copper is a reactive metal that develops a stunning natural patina over time—transitioning from a bright, shiny penny finish to a deep bronze, and eventually to a classic 'verdigris' green. This patina isn't just aesthetic; it's a protective layer that makes copper virtually impervious to rust and corrosion, even in harsh coastal environments. A properly installed, hand-soldered copper system can last 75 to 100 years, often outlasting the building itself. We specialize in both traditional K-style and historic half-round profiles, using heavy-duty 16oz or 20oz copper stock. Every joint, corner, and end cap is hand-soldered by master craftsmen to ensure a leak-proof, structural bond that withstands extreme thermal expansion. For homeowners seeking to enhance their property's value and architectural distinction, copper is the ultimate choice.",
        process: [
            "Detailed architectural mapping and custom design consultation",
            "Hand-selection of premium 16-oz or 20-oz cold-rolled copper stock",
            "Precision on-site fabrication of seamless runs and mitered corners",
            "Expert hand-soldering of all joints using lead-free silver solder",
            "Installation of heavy-duty decorative copper hangers and brackets",
            "Optional application of patina-accelerants or protective coatings",
            "Final structural polish and watertight performance certification"
        ],
        materials: [
            { name: "16-oz & 20-oz Cold-Rolled Copper", description: "Standard and heavy-weight architectural grade copper stock" },
            { name: "Ornate Solid Copper Hangers", description: "Decorative brackets that provide massive load-bearing support" },
            { name: "Silver Solder Alloy", description: "High-strength, lead-free joining material for permanent bonds" },
            { name: "Smooth Round Copper Downspouts", description: "Classic architectural spouts that complement historic aesthetics" }
        ],
        faqs: [
            { q: "How long until the copper turns green?", a: "The patina process depends heavily on your local climate. In most areas, copper turns bronze in a few months, chocolate brown in 2-5 years, and develops the classic green verdigris in 15-20 years." },
            { q: "Do copper gutters require more maintenance?", a: "Actually, they require less. Because they are soldered into a single structural unit, they don't have gaskets or sealants that dry out and leak. Regular cleaning of leaves is all that's required." },
            { q: "Are copper gutters a good investment?", a: "Absolutely. While the initial cost is higher, their 80+ year lifespan and the significant boost they provide to home resale value make them highly cost-effective over the long term." },
            { q: "Will copper runoff stain my siding or driveway?", a: "New copper can occasionally leave slight 'copper tracks' on light-colored porous surfaces during the first few rains. We can apply temporary treatments to minimize this during the initial oxidation phase." }
        ],
        priceRange: "$28 - $55 per linear foot",
        duration: "2 - 4 days typical",
        warranty: "Lifetime Material & 10-Year Craftsmanship Warranty"
    },
    "commercial-gutter-services": {
        whatIs: "Commercial gutter systems must meet a completely different set of engineering requirements than residential systems. Managing the massive water volume from a 20,000+ square foot warehouse or retail roof requires oversized box gutters and high-flow industrial downspouts. We provide full-service commercial drainage solutions, including the installation of 6-inch, 7-inch, and custom box gutter profiles fabricated from heavy-gauge aluminum or stainless steel. Our crews are OSHA-certified and equipped with the necessary lifts and safety gear to handle multi-story complexes, apartments, and industrial facilities. We focus on long-term durability and low maintenance, integrating internal drainage systems and high-capacity scuppers to prevent the roof ponding that leads to structural failure. Whether it's a new construction project or a complex retrofit, we deliver drainage systems that meet local building codes and protect your commercial assets.",
        process: [
            "Comprehensive drainage-load engineering and site survey",
            "Custom fabrication of heavy-gauge 6\" or 7\" box gutter profiles",
            "OSHA-compliant safety setup and lift-equipment deployment",
            "Installation of reinforced industrial mounting brackets and straps",
            "TIG-welding or high-grade commercial sealing of all joints",
            "Integration of high-volume scuppers and internal drain connections",
            "Full hydraulic testing and code-compliance certification"
        ],
        materials: [
            { name: "7-Inch Commercial Box Gutters", description: "High-capacity profiles for massive commercial roof areas" },
            { name: "Heavy-Gauge 0.040 Aluminum", description: "Increased thickness for industrial-strength durability" },
            { name: "Industrial Steel Downspouts", description: "Impact-resistant spouts for high-traffic loading zones" },
            { name: "Internal Scupper Systems", description: "Emergency overflow outlets for parapet roof designs" }
        ],
        faqs: [
            { q: "Do you offer maintenance contracts for businesses?", a: "Yes. We provide quarterly or bi-annual commercial maintenance plans to ensure your drainage system remains clear and functional, protecting your facility 365 days a year." },
            { q: "Can you install on buildings over 3 stories?", a: "Absolutely. We are equipped with 60ft-80ft man-lifts and our crews are fully trained in high-altitude safety and OSHA fall-protection standards." },
            { q: "How do you handle box gutter leaks?", a: "Box gutters often leak at the seams. we specialize in re-lining box gutters with seamless EPDM or high-grade industrial coatings that provide a permanent, watertight seal." },
            { q: "Are your crews insured for commercial work?", a: "Yes, we carry $5M in commercial general liability insurance and full workers' compensation coverage for all large-scale projects." }
        ],
        priceRange: "Project-Based Custom Quotes",
        duration: "3 - 10 days typically",
        warranty: "20-Year Commercial Grade Warranty"
    },
    "storm-damage-repair": {
        whatIs: "Severe weather—high winds, heavy snow, hail, and falling branches—can compromise your gutter system in an instant. When gutters become detached, crushed, or punctured, they stop directing water away from your home, leading to immediate risks of fascia rot and basement flooding. Our storm damage rapid-response team is available 7 days a week to stabilize your property and perform permanent repairs. We don't just patch holes; we perform a full structural audit to ensure that invisible damage, like loosened hangers or hairline cracks in the sealant, is addressed. Furthermore, we specialize in insurance claim documentation, providing detailed high-resolution photos and professional estimates that your adjuster needs to process your claim quickly. Our goal is to restore your home's exterior protection to its pre-storm condition, ensuring your family stays dry and your foundation remains secure.",
        process: [
            "Emergency 24-hour response and initial damage stabilization",
            "Full-system structural audit and hidden-leak detection",
            "High-resolution photographic documentation for insurance claims",
            "Professional itemized repair or replacement estimates",
            "On-site fabrication of matching seamless gutter sections",
            "Reinforcement of all mounting points and hanger systems",
            "Final water-test and insurance claim finalization assistance"
        ],
        materials: [
            { name: "Heavy-Duty Hanger Replacements", description: "Upgraded brackets to prevent future wind-related detaching" },
            { name: "Color-Matched Gutter Stock", description: "Precise matching to your existing system's age and weathering" },
            { name: "High-Tact Bond Sealant", description: "Specialized repair sealant that can be applied in damp conditions" },
            { name: "Reinforced Fascia Capping", description: "Aluminum wrap that protects storm-damaged wood from further rot" }
        ],
        faqs: [
            { q: "Will insurance cover my gutter replacement?", a: "Most homeowners policies cover gutter damage caused by 'sudden and accidental' events like storms or falling trees. We provide the documentation you need to prove the cause of loss." },
            { q: "How quickly can you come out after a storm?", a: "We prioritize emergency calls and can typically have a crew on-site for stabilization within 24 hours of the weather clearing." },
            { q: "Can you fix just the damaged section?", a: "If the rest of the system is sound, yes. We can fabricate a new seamless section and 'zip' it into your existing system with professional-grade connectors." },
            { q: "What should I do if my gutters are hanging off the house?", a: "Stay clear of the area and call us immediately. Avoid trying to fix it yourself, as detached gutters are under tension and can be dangerous to handle." }
        ],
        priceRange: "$250 - $2,500 typical repair range",
        duration: "2 - 6 hours standard",
        warranty: "Full Restoration Satisfactory Guarantee"
    },
    "ice-dam-removal": {
        whatIs: "Ice dams are a serious threat to your home's structure, forming when heat escaping from your attic melts snow on the roof, which then refreezes at the cold eaves. This ridge of ice traps melting snow, forcing water under your shingles and into your walls and ceilings. Our professional ice dam removal service uses low-pressure steam—the only safe and proven method to clear ice without damaging your roofing materials. Unlike hacking with hammers or using dangerous chemicals, steam gently melts the ice, allowing it to flow safely into the gutters. We prioritize emergency calls to prevent active interior leaks and structural rot. Our team also performs a 'thermal audit' during the removal process, identifying the insulation gaps or ventilation issues that caused the dam in the first place, helping you prevent future occurrences.",
        process: [
            "Emergency site assessment and interior leak localization",
            "Safe snow removal from the roof surface using specialized rakes",
            "Deployment of professional low-pressure high-temperature steam units",
            "Gentle 'grid-cutting' of ice dams into manageable blocks",
            "Safe extraction of ice blocks and clearing of gutter channels",
            "Full flush of downspouts to ensure immediate drainage",
            "Thermographic attic inspection to identify heat-leak sources"
        ],
        materials: [
            { name: "Low-Pressure Industrial Steamers", description: "The only safe equipment for removing ice without shingle damage" },
            { name: "Roof-Safe Poly Snap-Rakes", description: "Specialized tools for removing heavy snow without scraping granules" },
            { name: "Safety Harness & Anchors", description: "Oversized fall-protection gear for working on icy, steeply pitched roofs" },
            { name: "Biodegradable De-Icing Agents", description: "Eco-friendly salts used only for final downspout clearing" }
        ],
        faqs: [
            { q: "Will steam damage my roof shingles?", a: "No. Low-pressure steam is the industry-recommended method because it uses temperature, not pressure, to melt ice. It is much safer than pressure washing or mechanical removal." },
            { q: "Can I just use salt pucks to melt the ice?", a: "Salt pucks can damage your shingles, corrode your aluminum gutters, and kill your landscaping. Steam is a faster, safer, and more effective solution." },
            { q: "How long does it take to remove an ice dam?", a: "Most residential ice dams can be cleared in 2-5 hours, depending on the thickness of the ice and the length of the problematic eaves." },
            { q: "Do you offer emergency service?", a: "Yes, we prioritize active leaks. Our crews are equipped to operate in sub-zero temperatures and blizzard conditions to protect your home." }
        ],
        priceRange: "$450 - $1,200 typical visit",
        duration: "2 - 6 hours standard",
        warranty: "Immediate Leak-Relief Guarantee"
    },
    "ice-dam-prevention": {
        whatIs: "The best way to handle ice dams is to ensure they never form in the first place. Ice dam prevention is a holistic approach that combines attic insulation, proper ventilation, and advanced heat technologies. Most ice dams are caused by 'hot spots' on your roof where heat leaks through the ceiling, melts snow, and then refreezes at the cold eaves. Our prevention service begins with a comprehensive energy audit of your attic. We identify air leaks around chimneys, vents, and light fixtures, and then install high-R-value blown-in insulation and baffles to ensure consistent roof temperatures. When structural changes aren't enough, we integrate self-regulating heat cable systems that maintain clear drainage channels. By addressing the root cause, we protect your home from winter water damage and significantly reduce your heating costs.",
        process: [
            "Comprehensive attic insulation and bypass energy audit",
            "Installation of high-flow soffit baffles and ridge vents",
            "Professional sealing of all air-leaks and bypasses in the attic",
            "Upgrade of attic insulation to modern DOE standards (R-49 to R-60)",
            "Installation of self-regulating 'smart' heat cable systems",
            "Design and mounting of metal 'ice belts' on low-pitch areas",
            "Final thermal-imaging verification of balanced roof temperatures"
        ],
        materials: [
            { name: "Blown-In Cellulose Insulation", description: "Eco-friendly, fire-resistant insulation with high R-value" },
            { name: "Pro-Grade Heat Cables", description: "Self-regulating cables that adjust heat based on ambient temperature" },
            { name: "High-Flow Soffit Baffles", description: "Ventilation channels that ensure fresh air reaches the ridge vent" },
            { name: "Metal Ice Belts", description: "Slick aluminum panels that encourage snow to slide off before damming" }
        ],
        faqs: [
            { q: "How much insulation do I really need?", a: "In cold climates, the Department of Energy recommends R-49 to R-60. Most older homes have less than R-19, which is the primary cause of ice dams." },
            { q: "Do heat cables use a lot of electricity?", a: "Modern self-regulating cables only draw significant power when they detect ice or near-freezing temperatures, making them much more efficient than older 'constant heat' kits." },
            { q: "Is ventilation more important than insulation?", a: "They work together. Insulation keeps the heat in your house, but ventilation carries away whatever heat does escape, keeping the roof deck cold." },
            { q: "Can you prevent ice dams on flat roofs?", a: "Yes, flat roofs require specialized internal drain heaters and improved tapered insulation to ensure water moves toward the drains before it can freeze." }
        ],
        priceRange: "$1,500 - $5,000+ for full systems",
        duration: "1 - 3 days typically",
        warranty: "10-Year No-Dam Guarantee"
    },
    "roof-snow-removal": {
        whatIs: "Heavy snow accumulation on your roof is more than just a winter chore; it's a significant structural risk. A single cubic foot of wet snow can weigh up to 20 pounds, and a large roof can easily accumulate several tons of weight, leading to roof sagging, cracked rafters, and even total collapse. Furthermore, excessive snow is the fuel for ice dams. Our professional roof snow removal service safely clears your roof while protecting your shingles from damage. We use specialized long-reach rake systems and poly-edge shovels that never scrape the protective granules off your roof. Our crews are trained in safe weight-distribution techniques, ensuring that we clear the snow systematically to prevent 'unbalanced loading' that can stress your home's framing. Whether you have a flat commercial roof or a steep residential gable, we provide the rapid response you need after a major blizzard.",
        process: [
            "Total roof-load structural weight assessment",
            "Strategic clearing path planning to prevent unbalanced loads",
            "Manual removal using long-reach, non-marring roof rakes",
            "Safe shoveling of thick accumulations using poly-shovels",
            "Clearing and flushing of all gutter and downspout exits",
            "Safe clearing of fallen snow from around foundation and vents",
            "Final inspection of roof surface for potential storm damage"
        ],
        materials: [
            { name: "Non-Marring Poly-Edge Rakes", description: "Designed to remove snow without damaging shingle granules" },
            { name: "Snow Slide Systems", description: "Slick sheets that allow large volumes of snow to slide off safely" },
            { name: "Stabilized Ladder Systems", description: "Equipemt that allows access without leaning against frozen gutters" },
            { name: "Roof-Safe Ice Augers", description: "Tools for clearing ventilation points and drainage outlets" }
        ],
        faqs: [
            { q: "When should I be worried about snow on my roof?", a: "Generally, if you have more than 12-18 inches of snow—or if you notice internal doors sticking or see drywall cracks—it's time for professional removal." },
            { q: "Can I just use my garden rake?", a: "No. Garden rakes have vertical teeth that will rip your shingles and damage your gutters. Professional roof rakes are designed with rollers to stay off the shingle surface." },
            { q: "Do you clear the snow from the ground too?", a: "Yes, we ensure that the snow removed from the roof doesn't block your home's secondary exits, dryer vents, or gas meters." },
            { q: "Will hiring you help prevent ice dams?", a: "Absolutely. Removing the 'fuel' (snow) is the only way to stop an ice dam from growing or forming in the first place." }
        ],
        priceRange: "$250 - $600 per visit",
        duration: "1.5 - 4 hours typically",
        warranty: "Structural Load Relief Guarantee"
    },
    "gutter-heat-cables": {
        whatIs: "Gutter heat cables, also known as 'de-icing cables,' are a specialized solution for homes that suffer from chronic ice buildup despite proper insulation. Our professional-grade, self-regulating cable systems are much more advanced than the kits found in big-box stores. These cables are designed to detect ambient temperatures and only draw power when needed, automatically increasing their heat output as it gets colder and decreasing it as it warms up. We install them in a strategic 'zig-zag' pattern along the roof's edge and weave them directly into your gutters and downspouts. This creates a permanent, heated 'melt channel' that ensures water can always reach the ground, even in sub-zero temperatures. This prevents the weight of ice from Ripping your gutters off the house and protects your home's interior from leaks caused by backing-up water.",
        process: [
            "Custom-engineered drainage path mapping and load calculation",
            "Installation of heavy-duty, self-regulating heating cables",
            "Secure mounting with shingle-safe clips and stabilizers",
            "Integration of cables directly into gutters and downspouts",
            "Installation of moisture-sensing controllers and automatic timers",
            "Professional electrical connection with GFCI protection",
            "Full-system diagnostic and cold-weather simulation test"
        ],
        materials: [
            { name: "Self-Regulating 6-Watt Cables", description: "Industrial-grade cables that adjust heat based on external cold" },
            { name: "ETL-Listed Shingle Clips", description: "Permanent, corrosion-resistant mounting hardware" },
            { name: "Automated Control Sensors", description: "Devices that turn the system on only when moisture is detected" },
            { name: "Internal Gutter Spacers", description: "Keep cables centered in the gutter for maximum heat transfer" }
        ],
        faqs: [
            { q: "Do the cables stay on all winter?", a: "No. Our self-regulating systems and sensors ensure the cables only operate when conditions for ice damming exist, keeping your energy bills low." },
            { q: "Will the cables damage my roof shingles?", a: "No. Our mounting clips are designed to be installed without drilling holes in your shingles, maintaining your roof's integrity." },
            { q: "Can I install these myself?", a: "While kits are available, a professional installation ensures the cables are placed correctly for your roof's specific drainage needs and that the electrical load is handled safely." },
            { q: "What is the lifespan of these cables?", a: "Our industrial-grade cables typically last 10-15 years with minimal maintenance." }
        ],
        priceRange: "$750 - $3,500 installed",
        duration: "4 - 8 hours typical",
        warranty: "5-Year Full Replacement Warranty"
    },
    "underground-drain-solutions": {
        whatIs: "Underground drainage is the most effective and aesthetically pleasing way to move water far away from your home's foundation. While standard splash blocks only move water a few feet, our buried drainage systems use 4-inch PVC or heavy-duty HDPE piping to transport water 10, 20, or even 50 feet away to a safe discharge area. This is essential for homes with grading issues, crawl spaces, or finished basements where foundation saturation is a primary concern. We use 'pop-up' emitters that stay low and out of the way of your lawnmower, only opening when water pressure is present. By moving the water away from the 'zone of influence' around your foundation, we permanently solve basement seepage and foundation settling issues. Our systems are designed to be maintenance-free, featuring integrated debris filters (catch basins) to ensure that leaves never clog your underground pipes.",
        process: [
            "Comprehensive yard grading and drainage slope analysis",
            "Strategic trenching using low-impact equipment",
            "Installation of solid 4-inch SDR-35 PVC or heavy-duty HDPE piping",
            "Connection of downspouts via debris-filtering catch basins",
            "Installation of high-pressure pop-up discharge emitters",
            "Precision backfilling and professional sod restoration",
            "Full system flush to verify 100% underground flow"
        ],
        materials: [
            { name: "4-Inch SDR-35 PVC Pipe", description: "Solid-wall pipe for maximum durability and root resistance" },
            { name: "Integrated Debris Catch Basins", description: "Filters that prevent gutter debris from entering the pipes" },
            { name: "Pop-Up Emitter Valves", description: "Self-closing discharge points that block pests and grass" },
            { name: "Bentonite Foundation Seals", description: "Waterproof sealant where the pipe exits the house area" }
        ],
        faqs: [
            { q: "Will the underground pipes freeze in winter?", a: "We install our systems with a consistent slope so that gravity empties the pipes completely after each rain, preventing standing water and ice buildup." },
            { q: "Will this ruin my lawn?", a: "We use specialized trenching techniques and carefully preserve and replace your sod. Within 2-3 weeks, the installation is typically invisible." },
            { q: "Can't I just use cheap corrugated tubing?", a: "Corrugated tubing is prone to crushing and clogging with roots and silt. We recommend solid-wall PVC for a permanent, 50-year solution." },
            { q: "Where does the water go?", a: "We direct water to a lower point in your yard, a dry well, or a municipal storm drain (where permitted) to ensure it can never return to your foundation." }
        ],
        priceRange: "$25 - $45 per linear foot",
        duration: "1 - 2 days typical",
        warranty: "25-Year No-Clog/No-Crush Warranty"
    },
    "color-gutter-matching": {
        whatIs: "Your gutters shouldn't just be functional; they should complement your home's unique architectural style and color palette. Our color matching service offers over 35 factory-baked enamel colors, from classic eggshell white and royal brown to modern bronze, matte black, and forest green. We go beyond 'close enough' by providing physical color swatches that allow you to match your gutters perfectly to your siding, trim, or roof shingles. Our finishes are applied using a multi-stage baked-on enamel process that resists fading, chalking, and scratching for decades. Whether you want your gutters to blend invisibly into your trim or serve as a bold architectural accent, we have the palette and expertise to deliver a premium, high-end look for your home's exterior.",
        process: [
            "On-site color consultation with physical swatches",
            "Digital simulation of color choices on your home's exterior",
            "Order of premium factory-baked color-matched aluminum coils",
            "On-site fabrication of seamless runs to ensure color consistency",
            "Installation using color-matched hardware, screws, and hangers",
            "Precision sealing with specialized color-matched silicone",
            "Final walk-through to ensure perfect aesthetic integration"
        ],
        materials: [
            { name: "Factory-Baked Enamel Coils", description: "High-durability finish that resists UV fading and chalking" },
            { name: "Color-Matched Hardware", description: "Everything from screws to downspout straps matches exactly" },
            { name: "Premium Architectural Palettes", description: "Access to designer colors like Musket Brown, Tuxedo Gray, and Copper" },
            { name: "Color-Flex Sealants", description: "Specialized caulking that maintains its color even after years of exposure" }
        ],
        faqs: [
            { q: "Will the color fade over time?", a: "Our factory-baked finishes are designed for 30+ years of UV resistance. They are significantly more durable than field-painted gutters." },
            { q: "Can you match my house paint exactly?", a: "While we have 35+ standard colors that match 95% of home trims, we can also order custom-coated coils for an exact match to any major paint brand." },
            { q: "Are colored gutters more expensive?", a: "Standard colors (white, brown, bone) are our base price. Premium architectural colors carry a small surcharge but offer much higher curb appeal." },
            { q: "Can I paint my existing aluminum gutters?", a: "You can, but it requires specialized primer and doesn't last nearly as long as a factory-baked finish. If yours are old, replacement is usually a better long-term value." }
        ],
        priceRange: "+$1 - $5 per linear foot vs. White",
        duration: "Integrated into standard install",
        warranty: "20-Year No-Fade/No-Chalk Warranty"
    },
    "emergency-gutter-repair": {
        whatIs: "When gutter failure threatens your home's interior, you can't wait weeks for a repair. Emergency gutter failure—such as a collapsed section after a storm, a completely blocked downspout causing a basement float, or a detached gutter hanging dangerously over a walkway—requires immediate professional intervention. Our rapid-response team is on call 24/7 to stabilize your drainage system and prevent further damage. We arrive with a fully equipped 'mobile workshop' that allows us to fabricate parts and perform permanent repairs on the spot. Our priority is immediate stabilization: we stop the water intrusion, secure the dangerous components, and restore your home's safety. Whether it's a holiday weekend or a midnight storm, US Gutter Installation is ready to protect your most valuable asset.",
        process: [
            "Priority dispatch and 24/7 emergency site arrival",
            "Immediate stabilization of falling or dangerous components",
            "Localization and temporary sealing of active water leaks",
            "High-volume clearing of emergency downspout clogs",
            "On-site fabrication of replacement gutter and hardware parts",
            "Refastening and structural reinforcement of the entire run",
            "Full water flow test and insurance-ready documentation"
        ],
        materials: [
            { name: "High-Strength Structural Fasteners", description: "Oversized screws for securing to damaged fascia boards" },
            { name: "Rapid-Cure Industrial Sealants", description: "Waterproof sealants that set in minutes, even in rain" },
            { name: "Emergency Stabilization Brackets", description: "Temporary bracing to prevent further gutter collapse" },
            { name: "Heavy-Gauge Aluminum Patching", description: "Custom-cut pieces for immediate puncture or hole repair" }
        ],
        faqs: [
            { q: "How fast can you be at my house?", a: "For active flooding or life-safety issues (like hanging metal), we typically have a crew on-site within 2-4 hours." },
            { q: "Is the repair permanent?", a: "In 90% of cases, yes. Our goal is to fix the problem completely during the emergency visit. If a full replacement is needed, we will stabilize the house and quote the replacement separately." },
            { q: "Do you charge extra for emergency visits?", a: "We have a flat-rate emergency call-out fee that covers the first hour of stabilization. We provide full pricing before any work begins." },
            { q: "Can you work in the rain or dark?", a: "Yes. Our crews are equipped with industrial lighting and specialized waterproof gear to perform critical repairs in any conditions." }
        ],
        priceRange: "$250 Call-Out + Materials",
        duration: "1 - 3 hours typically",
        warranty: "Immediate Peace-of-Mind Guarantee"
    }
}

export default function ServiceSpecificPage({ city, state, stateCode, service, relatedCities, neighborhoodData }: ServiceSpecificPageProps) {
    const formattedCity = city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const formattedState = state.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    // Get extended content for this service
    const extendedContent = serviceExtendedContent[service.slug] || serviceExtendedContent["seamless-gutter-installation"]

    // Phone number logic
    // Winter services that use the special phone number
    const winterServices = ['ice-dam-removal', 'ice-dam-prevention', 'roof-snow-removal', 'gutter-heat-cables']
    const isWinterService = winterServices.includes(service.slug)
    const phoneNumber = isWinterService ? '+1 (323) 693-8415' : undefined
    const phoneHref = isWinterService ? 'tel:+13236938415' : undefined

    // Build comprehensive schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": `${service.title} in ${formattedCity}, ${stateCode}`,
        "description": service.description(formattedCity, formattedState),
        "provider": {
            "@type": "HomeAndConstructionBusiness",
            "name": "US Gutter Installation",
            "telephone": phoneNumber || "+18588985338",
            "url": "https://usgutterinstallation.com",
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
        "url": `https://usgutterinstallation.com/${stateCode}/${city}/${service.slug}`
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
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500 selection:text-white">

            {/* Schema Markup */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            {/* Navigation */}
            <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                        US Gutter Installation
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">Locations</Link>
                            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                        </div>
                        <NavbarCallBtn phoneNumber={phoneNumber} phoneHref={phoneHref} />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-slate-900 to-black opacity-95"></div>
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-sm text-blue-300 text-sm font-semibold uppercase tracking-wider">
                            {service.title} in {stateCode.toUpperCase()}
                        </div>
                        <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white mb-6 leading-tight tracking-tight">
                            {service.title} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{formattedCity}, {stateCode.toUpperCase()}</span>
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
                            <CallBtn className="py-4 px-10 text-lg w-full sm:w-auto transform hover:scale-105" label="Get Free Quote" showNumber={true} phoneNumber={phoneNumber} phoneHref={phoneHref} />
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                            {/* Professional Dynamic Service Image */}
                            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={service.heroImage}
                                    alt={`${service.title} - Professional Service`}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
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
                            <div key={i} className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl mb-4 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <p className="text-slate-700 font-medium leading-relaxed">{feature}</p>
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
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
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
                        Equipment & Options for {service.title}
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
                        Benefits of Professional {service.title} in {formattedCity}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {service.benefits.map((benefit, i) => (
                            <div key={i} className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl mb-4">
                                    {['✅', '⭐', '🏆', '💎'][i % 4]}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{benefit}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">Expert {service.title.toLowerCase()} delivers this lasting value.</p>
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
                            We provide {service.title.toLowerCase()} services throughout {formattedCity} and the surrounding {stateCode.toUpperCase()} areas. Our local crews are familiar with {formattedCity}'s climate, drainage requirements, and local building codes.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Licensed & Insured in {stateCode.toUpperCase()}
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Local {formattedCity} Experts
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Same-day or next-day quotes available
                            </li>
                            <li className="flex items-center gap-3 text-slate-700">
                                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">✓</span>
                                Top Rated in {stateCode}
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
                            <details key={i} className="group bg-slate-50 p-6 rounded-xl border border-slate-200 open:border-blue-300 open:bg-blue-50 transition-all">
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
                        *Prices vary based on home size, gutter condition, and material selection. Request a free quote for exact pricing.
                    </p>
                </div>
            </section>

            {/* Local Environment Data */}
            <LocalEnvironmentData
                city={formattedCity}
                stateCode={stateCode}
            />

            {/* Neighborhoods Section */}
            {neighborhoodData && (
                <NeighborhoodsSection
                    data={neighborhoodData}
                    city={formattedCity}
                    state={formattedState}
                    stateCode={stateCode}
                    serviceName={service.title}
                    serviceSlug={service.slug}
                />
            )}

            {/* Nearby Cities */}
            {relatedCities && relatedCities.length > 0 && (
                <section className="py-16 px-6 bg-white border-t border-slate-200">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                            {service.title} Also Available in Nearby {stateCode.toUpperCase()} Cities
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {relatedCities.map((cityData, i) => (
                                <Link
                                    key={i}
                                    href={`/${cityData.state_id.toLowerCase()}/${cityData.city.toLowerCase().replace(/ /g, '-')}/${service.slug}`}
                                    className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center text-slate-700 font-medium truncate"
                                    title={`${service.title} in ${cityData.city}`}
                                >
                                    {cityData.city}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Winter Services - Only show on winter service pages */}
            {isWinterService && (
                <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-t border-blue-100">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-3">❄️ Winter Protection</span>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Complete Winter Ice Dam Solutions in {formattedCity}
                            </h2>
                            <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
                                Protect your home from ice dams and winter roof damage with our comprehensive services.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { slug: 'ice-dam-removal', title: 'Ice Dam Removal', icon: '🧊', desc: 'Professional steam removal of existing ice dams' },
                                { slug: 'ice-dam-prevention', title: 'Ice Dam Prevention', icon: '🛡️', desc: 'Stop ice dams before they form with insulation upgrades' },
                                { slug: 'roof-snow-removal', title: 'Roof Snow Removal', icon: '❄️', desc: 'Safe snow clearing to prevent structural damage' },
                                { slug: 'gutter-heat-cables', title: 'Gutter Heat Cables', icon: '🔥', desc: 'Self-regulating heat cables for year-round protection' }
                            ].filter(s => s.slug !== service.slug).map((winterService, i) => (
                                <Link
                                    key={i}
                                    href={`/${stateCode.toLowerCase()}/${city.toLowerCase().replace(/ /g, '-')}/${winterService.slug}`}
                                    className="block p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group"
                                >
                                    <div className="text-3xl mb-3">{winterService.icon}</div>
                                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {winterService.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 mb-4">{winterService.desc}</p>
                                    <span className="text-blue-600 text-sm font-semibold flex items-center gap-1">
                                        Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </span>
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
                        Ready for {service.title} in {formattedCity}?
                    </h2>
                    <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
                        Get a free, no-obligation quote from our local {formattedCity} experts. We respond within 24 hours with transparent pricing.
                    </p>
                    <CallBtn className="py-4 px-12 text-xl" label="Call Now for Free Quote" showNumber={true} phoneNumber={phoneNumber} phoneHref={phoneHref} />
                </div>
            </section>

            <TrustBadges />
            <RelatedServices city={formattedCity} state={stateCode} />
            <Footer />
        </div>
    )
}
