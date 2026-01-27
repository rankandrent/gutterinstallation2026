// Optimization: Pre-computed patterns for better performance (Verified Build)
// {0} = City, {1} = State Code

export const stateMetaPatterns: Record<string, string> = {
    "AL": "Best Gutter Installation & Repair in {0}, {1} | Seamless Gutters",
    "AK": "Gutter Repair & Ice Dam Protection {0}, AK | Arctic Systems",
    "AZ": "Gutter Installation, Cleaning & Repair {0} | Top Rated {1}",
    "AR": "Seamless Gutter Installation {0}, AR | Storm Protection",
    "CA": "Seamless Gutter Installation {0}, CA | Repair & Gutter Guards",
    "CO": "Heavy Duty Gutter Installation {0}, CO | Mountain Systems",
    "CT": "Gutter Replacement & Installation {0}, CT | Leaf Guards",
    "DE": "Gutter Services {0}, DE | Coastal Rain Protection",
    "FL": "Gutter Installation {0} FL | Hurricane Ready Systems",
    "GA": "Soffit & Fascia Gutter Installation {0}, GA | Storm Drainage",
    "HI": "Gutter Installation {0}, Hawaii | Tropical Storm Protection",
    "ID": "Gutter Repair & Installation {0}, ID | Mountain Runoff",
    "IL": "Top Rated Gutter Installation {0}, IL | Leaf Protection",
    "IN": "Gutter Replacement {0}, IN | Seamless Systems",
    "IA": "Gutter Installation & Repair {0}, IA | Storm Control",
    "KS": "Emergency Gutter Services {0}, KS | Tornado Alley Protection",
    "KY": "Licensed Gutter Installers {0}, KY | Rain Solutions",
    "LA": "Gutter Installation {0}, LA | Heavy Rain Control",
    "ME": "Gutter Installation & Ice Dam Protection {0}, Maine",
    "MD": "Gutter Services {0}, MD | Chesapeake Bay Area",
    "MA": "Gutter Installation, Cleaning & Repair {0} Near Me",
    "MI": "Seamless Gutter Systems {0}, MI | Lake Effect Protection",
    "MN": "Gutter Installation {0}, MN | Ice Dam Prevention",
    "MS": "Gutter Repair {0}, MS | Storm Drainage Systems",
    "MO": "Gutter Installation {0}, MO | Residential & Commercial",
    "MT": "Gutter Services {0}, MT | Snow Melt Protection",
    "NE": "Gutter Installation & Repair Services {0}, NE",
    "NV": "Gutter Installation {0} NV | Desert Flash Flood Systems",
    "NH": "Gutter Guards & Installation {0}, NH",
    "NJ": "Gutter Installation {0}, NJ | Heavy Rain Solutions",
    "NM": "Gutter Services {0}, NM | Monsoon Protection",
    "NY": "Gutter Installation, Cleaning & Repair {0} Near Me",
    "NC": "Gutter Installation {0}, NC | Hurricane Ready Systems",
    "ND": "Durable Gutter Installation {0}, ND | Winter Ready Systems",
    "OH": "Gutter Installation {0}, OH | Storm Drainage",
    "OK": "Storm Gutter Systems {0}, OK | Tornado Protection",
    "OR": "Heavy Rain Gutter Systems {0}, OR | Pacific NW",
    "PA": "Gutter Installation, Cleaning & Repair {0} | Pennsylvania",
    "RI": "Seamless Gutters {0}, RI | Coastal Protection",
    "SC": "Gutter Installation {0}, SC | Low Country Pros",
    "SD": "Gutter Services {0}, SD | Meltwater Protection",
    "TN": "Gutter Installation & Guards {0}, TN | Heavy Rain",
    "TX": "Gutter Installation, Cleaning & Repair {0} Near Me",
    "UT": "Gutter Services {0}, UT | Snow Melt & Flash Flood",
    "VT": "Seamless Gutter Systems {0}, VT | Spring Thaw Protection",
    "VA": "Gutter Installation {0}, VA | Coastal & Inland",
    "WA": "Gutter Installation {0}, WA | Continuous Rain Systems",
    "WV": "Hillside Gutter Systems {0}, WV | Runoff Control",
    "WI": "Gutter Installation {0}, WI | Storm Drainage Experts",
    "WY": "Gutter Repair {0}, WY | Reliable Systems"
}

export const defaultMetaPattern = "Gutter Installation, Cleaning & Repair {0} Near Me"

export function getMetaTitle(city: string, stateCode: string, stateName?: string): string {
    const pattern = stateMetaPatterns[stateCode.toUpperCase()] || defaultMetaPattern
    return pattern.replace('{0}', city).replace('{1}', stateName || stateCode)
}
