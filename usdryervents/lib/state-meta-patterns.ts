// This file defines unique meta title patterns for every state to maximize SEO diversity.
// {0} = City Name
// {1} = State Code (e.g. TX)
// {2} = State Name (e.g. Texas)

export const stateMetaPatterns: Record<string, string> = {
    // A
    "AL": "Best Dryer Vent Cleaning in {0}, {1} | Prevent Fires",
    "AK": "{0} Dryer Vent Services: Cleaning & Thawing | Alaska",
    "AZ": "Dryer Vent Cleaning, Repair & Install {0} | {1} Experts",
    "AR": "Affordable Dryer Vent Cleaning {0} Near Me | Lint Removal",

    // C
    "CA": "Professional Dryer Duct Cleaning {0}, CA | Safety Inspection",
    "CO": "Dryer Vent Cleaning & Bird Guards {0}, CO | Fire Safety",
    "CT": "Dryer Vent Cleaning, Installation & Repair {0} {1}",

    // D - G
    "DE": "{0} Dryer Vent Cleaning & Repair | Delaware Experts",
    "DC": "Dryer Vent Cleaning Washington DC | Metro Area Pros",
    "FL": "Dryer Vent Cleaning {0} FL | Condo & Home Services",
    "GA": "Dryer Vent Cleaning & Rerouting in {0} | #1 Georgia Pros",

    // H - I
    "HI": "Dryer Vent Service {0}, Hawaii | Lint Removal & Safety",
    "ID": "{0} Dryer Vent Company: Cleaning & Repair | {1}",
    "IL": "Top Rated Dryer Vent Cleaning {0}, IL | Duct Repair",
    "IN": "{0} Dryer Vent Services: Cleaning & Installation",
    "IA": "Dryer Duct Cleaning & Maintenance {0} | Iowa Local Experts",

    // K - M
    "KS": "Reliable Dryer Vent Cleaners in {0}, KS | Fire Prevention",
    "KY": "{0} Dryer Vent Services: Cleaning & Bird Guards",
    "LA": "Dryer Vent Cleaning {0}, LA | Lint Removal Experts",
    "ME": "Dryer Vent Cleaning & Ice Blockage Removal {0}, Maine",
    "MD": "Maryland Dryer Vent Pros: Cleaning & Repair in {0}",
    "MA": "Dryer Vent Cleaning, Repair & Install {0} Near Me",
    "MI": "{0} Dryer Vent Techs: Cleaning, Repair & Install",
    "MN": "Dryer Vent Cleaning & De-Icing {0} MN | Safety Checks",
    "MS": "Affordable Dryer Vent Cleaning {0}, Mississippi",
    "MO": "Dryer Vent Solutions {0}, MO: Cleaning & Repair",
    "MT": "Montana Dryer Vent Cleaners in {0} | Safety Inspections",

    // N
    "NE": "Dryer Vent Cleaning & Repair Services {0}, NE",
    "NV": "Dryer Vent Cleaning {0} NV | Lint & Dust Removal",
    "NH": "{0} Dryer Vent Services | New Hampshire Pros",
    "NJ": "Best Dryer Vent Cleaning & Repair {0}, NJ | Fire Safety",
    "NM": "Dryer Duct Cleaning & Installation {0}, New Mexico",
    "NY": "Dryer Vent Cleaning, Repair & Install {0} Near Me",
    "NC": "North Carolina Dryer Vent Pros: {0} Cleaning & Repair",
    "ND": "Expert Dryer Vent Cleaning {0}, ND | Winter Safety",

    // O - P
    "OH": "{0} Dryer Vent Experts: Cleaning, Guards & Repair",
    "OK": "Dryer Vent Cleaning & Repair in {0}, Oklahoma",
    "OR": "Dryer Vent Specialists {0}, OR | Duct Replacement",
    "PA": "Dryer Vent Cleaning, Repair & Install {0} | Pennsylvania",

    // R - S
    "RI": "Rhode Island Dryer Vent Services: Serving {0} Areas",
    "SC": "Professional Dryer Vent Cleaning {0}, SC | Low Country",
    "SD": "South Dakota Dryer Vent Services: {0} Cleaning",

    // T
    "TN": "{0} Dryer Vent Cleaning: Repair & Install | Tennessee",
    "TX": "Dryer Vent Cleaning, Repair & Installation {0} Near Me",

    // U - V
    "UT": "Utah Dryer Vent Solutions: {0} Cleaning & Safety",
    "VT": "Vermont Dryer Vent Cleaning in {0} | Local Pros",
    "VA": "Virginia Dryer Vent Pros: {0} Cleaning & Repair",

    // W
    "WA": "Dryer Vent Cleaning {0}, WA | Duct Rerouting",
    "WV": "West Virginia Dryer Vent Pros: Serving {0} & Nearby",
    "WI": "Wisconsin Dryer Vent Services {0}: Clean, Repair, Thaw",
    "WY": "Wyoming Dryer Vent Cleaning: {0} Services"
}

// Fallback if state is missing
export const defaultMetaPattern = "Dryer Vent Cleaning, Repair & Installation {0} Near Me"

export function getMetaTitle(city: string, stateCode: string, stateName: string): string {
    const pattern = stateMetaPatterns[stateCode.toUpperCase()] || defaultMetaPattern

    return pattern
        .replace("{0}", city)
        .replace("{1}", stateCode)
        .replace("{2}", stateName)
}
