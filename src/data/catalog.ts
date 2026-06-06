// Kaya hotel-supply catalog (static seed)
import lobby from "@/assets/hero-lobby.jpg";
import suite from "@/assets/hero-suite.jpg";
import bathroom from "@/assets/hero-bathroom.jpg";
import restaurant from "@/assets/hero-restaurant.jpg";
import pool from "@/assets/hero-pool.jpg";
import linens from "@/assets/hero-linens.jpg";

// Real product images
import imgKingBed from "@/assets/hostpitality-king-bed.jpg";
import imgWardrobe from "@/assets/Open Suite Wardrobe.jpg";
import imgDesk from "@/assets/Walnut Writing Desk.jpg";
import imgArmchair from "@/assets/Lounge Reading Chair.jpg";
import imgSheetSet from "@/assets/300TC Sateen Sheet Set.jpg";
import imgBathTowel from "@/assets/600gsm Bath Towel.jpg";
import imgBathrobe from "@/assets/Waffle Bathrobe.jpg";
import imgDuvet from "@/assets/All-Season King Duvet.jpg";
import imgMarbleTub from "@/assets/Freestanding Marble Tub.jpg";
import imgDiningTable from "@/assets/Restaurant Dining Table.jpg";
import imgWineGlass from "@/assets/Crystal Wine Glasses.jpg";
import imgPlateSet from "@/assets/Porcelain Plate Set.jpg";
import imgBuffet from "@/assets/Buffet Warming Station.jpg";
import imgReceptionDesk from "@/assets/Marble Reception Desk.jpg";
import imgLobbySofa from "@/assets/Modular Lobby Sofa.jpg";
import imgBrassChair from "@/assets/Brass Lounge Chair.jpg";
import imgSunLounger from "@/assets/Aluminium Sun Lounger.jpg";
import imgPoolUmbrella from "@/assets/Cantilever Pool Umbrella.jpg";
import imgTeakSofa from "@/assets/Teak Outdoor Sofa.jpg";
import imgChandelier from "@/assets/Crystal Lobby Chandelier.jpg";
import imgBrassPendant from "@/assets/Brushed Brass Pendant.jpg";
import imgCarpetRunner from "@/assets/Corridor Carpet Runner.jpg";
import imgSmartLock from "@/assets/RFID Smart Lock.jpg";
import imgCCTV from "@/assets/Dome CCTV Camera.jpg";
import imgRoomSafe from "@/assets/In-Room Electronic Safe.jpg";
import imgWasher from "@/assets/25kg Industrial Washer.jpg";
import imgHKTrolley from "@/assets/Housekeeping Trolley.jpg";
import imgVacuum from "@/assets/Commercial Backpack Vacuum.jpg";

// Real project images
import imgTbilisiHotel from "@/assets/Tbilisi Boutique Hotel.jpg";
import imgBlackSea from "@/assets/Black Sea Resort.jpg";
import imgKazbegi from "@/assets/Kazbegi Mountain Lodge.jpg";
import imgOldTown from "@/assets/Old Town Serviced Apartments.jpg";

export type Category = {
  slug: string;
  name: string;
  short: string;        // short tagline
  blurb: string;        // 1-2 sentence description
  cover: string;        // hero image
  subcategories: string[];
  featured?: boolean;   // surface on landing
};

export const categories: Category[] = [
  {
    slug: "guest-room-furniture",
    name: "Guest Room Furniture",
    short: "Beds, wardrobes, seating",
    blurb: "Hospitality-grade furniture engineered for daily use — beds, wardrobes, desks and seating that hold up to years of turnover.",
    cover: suite,
    featured: true,
    subcategories: ["Hotel Beds","Mattresses","Headboards","Bedside Tables","Wardrobes","Desks","Chairs","Luggage Racks","Sofas","Coffee Tables","TV Stands","Mirrors"],
  },
  {
    slug: "bedding-linen",
    name: "Bedding & Linen",
    short: "Sheets, towels, robes",
    blurb: "Cotton-rich sheets, towels and robes specced for industrial laundering — soft on guests, tough through cycles.",
    cover: linens,
    featured: true,
    subcategories: ["Bed Sheets","Pillow Cases","Duvets","Blankets","Pillows","Mattress Protectors","Bed Runners","Towels","Bathrobes","Slippers"],
  },
  {
    slug: "bathroom-solutions",
    name: "Bathroom Solutions",
    short: "Fixtures, fittings, amenities",
    blurb: "Sinks, tubs, showers, mirrors and the small details that finish a guest bathroom.",
    cover: bathroom,
    featured: true,
    subcategories: ["Bathroom Sinks","Toilets","Bathtubs","Showers","Bathroom Mirrors","Soap Dispensers","Towel Holders","Hair Dryers","Bathroom Accessories","Hotel Toiletries"],
  },
  {
    slug: "restaurant-dining",
    name: "Restaurant & Dining",
    short: "Tabletop & service",
    blurb: "Dining tables, chairs, cutlery, glassware and serving — a complete F&B fit-out.",
    cover: restaurant,
    featured: true,
    subcategories: ["Dining Tables","Dining Chairs","Buffet Stations","Serving Trolleys","Cutlery","Plates","Glassware","Cups & Mugs","Food Warmers","Menu Holders"],
  },
  {
    slug: "commercial-kitchen",
    name: "Commercial Kitchen",
    short: "Cooking, cold, prep",
    blurb: "Ovens, refrigeration, dishwashers and prep stations sized for hotel kitchen volume.",
    cover: restaurant,
    subcategories: ["Ovens","Refrigerators","Freezers","Dishwashers","Grills","Deep Fryers","Mixers","Kitchen Utensils","Storage Shelves","Food Preparation Tables"],
  },
  {
    slug: "reception-lobby",
    name: "Reception & Lobby",
    short: "First impressions",
    blurb: "Reception desks, waiting sofas, lounge chairs and decorative pieces that set the tone on arrival.",
    cover: lobby,
    featured: true,
    subcategories: ["Reception Desks","Waiting Sofas","Lounge Chairs","Coffee Tables","Decorative Mirrors","Display Cabinets","Information Stands"],
  },
  {
    slug: "outdoor-pool",
    name: "Outdoor & Pool",
    short: "Loungers, umbrellas, gazebos",
    blurb: "Sun loungers, garden tables, gazebos and poolside furniture built for sun and water.",
    cover: pool,
    featured: true,
    subcategories: ["Garden Chairs","Garden Tables","Sun Loungers","Umbrellas","Gazebos","Outdoor Sofas","Poolside Furniture"],
  },
  {
    slug: "lighting-decoration",
    name: "Lighting & Decoration",
    short: "Chandeliers, decor, art",
    blurb: "Chandeliers, pendant lights and the soft furnishings that shape the atmosphere of every space.",
    cover: lobby,
    featured: true,
    subcategories: ["Chandeliers","Pendant Lights","Wall Lights","Ceiling Lights","Outdoor Lights","Garden Lights","Emergency Lights","Curtains","Blinds","Carpets","Rugs","Wall Art","Decorative Plants","Vases","Clocks"],
  },
  {
    slug: "security-smart",
    name: "Security & Smart Hotel",
    short: "CCTV, locks, automation",
    blurb: "CCTV, smart locks, key-card systems, fire safety and room automation — the invisible layer guests trust.",
    cover: suite,
    featured: true,
    subcategories: ["CCTV Cameras","Access Control Systems","Hotel Key Cards","Smart Locks","Fire Alarm Systems","Smoke Detectors","Safes","Smart Room Controls","Digital Door Locks","Hotel Management Systems","Self Check-In Kiosks","Smart Lighting","Energy Management Systems"],
  },
  {
    slug: "housekeeping-laundry",
    name: "Housekeeping & Laundry",
    short: "Carts, machines, consumables",
    blurb: "Industrial washers and dryers, housekeeping trolleys, chemicals and the consumables that keep rooms turning.",
    cover: linens,
    featured: true,
    subcategories: ["Washing Machines","Dryers","Ironing Equipment","Laundry Trolleys","Linen Storage","Vacuum Cleaners","Cleaning Chemicals","Housekeeping Trolleys","Dustbins","Mops","Cleaning Tools","Tissue Papers","Toilet Papers","Soap","Shampoo","Conditioner","Disposable Items"],
  },
  {
    slug: "hvac",
    name: "HVAC & Ventilation",
    short: "Climate & air",
    blurb: "Air conditioning, ventilation, purification and heating sized for hospitality buildings.",
    cover: lobby,
    subcategories: ["Air Conditioners","Fans","Ventilation Systems","Air Purifiers","Heating Systems"],
  },
  {
    slug: "conference-events",
    name: "Conference & Events",
    short: "Meeting & stage",
    blurb: "Conference furniture, AV equipment, stage and sound to outfit ballrooms and meeting halls.",
    cover: restaurant,
    subcategories: ["Conference Tables","Meeting Chairs","Projectors","Screens","Sound Systems","Podiums","Stage Equipment"],
  },
  {
    slug: "hotel-electronics",
    name: "Hotel Electronics",
    short: "TVs, safes, telephony",
    blurb: "Smart TVs, in-room safes, mini fridges, kettles and Wi-Fi gear, ready for room-by-room rollout.",
    cover: suite,
    subcategories: ["Smart TVs","Telephones","Mini Fridges","Room Safes","Kettles","Wi-Fi Equipment"],
  },
  {
    slug: "flooring-finishing",
    name: "Flooring & Finishing",
    short: "Tiles, marble, wood",
    blurb: "Marble, granite, tile, vinyl and wall panels for full property fit-outs.",
    cover: lobby,
    subcategories: ["Tiles","Marble","Granite","Wooden Flooring","Vinyl Flooring","Carpets","Wall Panels"],
  },
  {
    slug: "doors-windows",
    name: "Doors & Windows",
    short: "Security, sliding, glass",
    blurb: "Security doors, sliding systems, glazing and door hardware.",
    cover: lobby,
    subcategories: ["Wooden Doors","Glass Doors","Security Doors","Sliding Doors","Windows","Window Accessories"],
  },
  {
    slug: "construction-renovation",
    name: "Construction & Renovation",
    short: "Building materials",
    blurb: "Cement, steel, paint, plumbing and electrical materials for new builds and refurbishments.",
    cover: pool,
    subcategories: ["Roofing Materials","Exterior Paints","Fencing","Gates","Paving Blocks","Landscaping Materials","Cement","Bricks","Steel","Paint","Glass","Ceiling Materials","Plumbing Materials","Electrical Materials"],
  },
  {
    slug: "swimming-pool",
    name: "Swimming Pool Equipment",
    short: "Pumps, filters, lighting",
    blurb: "Pumps, filtration, lighting and cleaning gear for pools and spas.",
    cover: pool,
    subcategories: ["Pool Pumps","Pool Filters","Pool Furniture","Pool Cleaning Equipment","Pool Lighting"],
  },
];

export const featuredCategories = categories.filter((c) => c.featured);

// Industries we serve
export const industries = [
  { name: "Hotels", desc: "Boutique to flagship — full property fit-outs." },
  { name: "Resorts", desc: "Pool, beach and grounds, plus rooms." },
  { name: "Serviced Apartments", desc: "Move-in-ready packages per unit." },
  { name: "Restaurants", desc: "Kitchen, dining and service equipment." },
  { name: "Hospitals", desc: "Furniture and consumables at scale." },
  { name: "Schools", desc: "Dorm, classroom and dining furniture." },
  { name: "Offices", desc: "Reception, lounge and meeting spaces." },
];

// Sample projects
export const projects = [
  { title: "Tbilisi Boutique Hotel · 84 rooms", location: "Tbilisi, Georgia", image: imgTbilisiHotel, scope: "Full fit-out — furniture, linen, bath, lighting." },
  { title: "Black Sea Resort · 220 rooms", location: "Batumi, Georgia", image: imgBlackSea, scope: "Outdoor, pool, FF&E and amenities." },
  { title: "Kazbegi Mountain Lodge", location: "Stepantsminda, Georgia", image: imgKazbegi, scope: "Guest rooms, lobby, restaurant supply." },
  { title: "Old Town Serviced Apartments", location: "Tbilisi, Georgia", image: imgOldTown, scope: "48 units, kitchenettes and linens." },
];

// Sample products per category (image + name only — pricing handled per quote)
export type SeedProduct = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  pricingNote: string;   // product-specific pricing context
  tiers: string[];       // e.g. ["5+ units", "20+ units", "100+ units"]
};

export const seedProducts: SeedProduct[] = [
  // — Guest Room Furniture —
  { id: "p-bed-king", name: "Hospitality King Bed", category: "guest-room-furniture", image: imgKingBed,
    description: "Solid-frame king bed with upholstered headboard, built for daily turnover.",
    pricingNote: "Priced per unit. Typically ordered in full room-sets of 10–200+ beds.",
    tiers: ["5+ units", "20+ units", "100+ units"] },
  { id: "p-wardrobe", name: "Open Suite Wardrobe", category: "guest-room-furniture", image: imgWardrobe,
    description: "Walnut-finish open wardrobe with luggage shelf and hanging rail.",
    pricingNote: "Often paired with bed and desk as a room package — ask about set pricing.",
    tiers: ["5+ units", "20+ units", "80+ units"] },
  { id: "p-desk-walnut", name: "Walnut Writing Desk", category: "guest-room-furniture", image: imgDesk,
    description: "Compact desk with cable port and integrated power.",
    pricingNote: "Priced per unit. Volume tiers apply for full-floor or full-property orders.",
    tiers: ["10+ units", "50+ units", "150+ units"] },
  { id: "p-armchair", name: "Lounge Reading Chair", category: "guest-room-furniture", image: imgArmchair,
    description: "Linen-upholstered reading chair with hardwood frame.",
    pricingNote: "Priced per piece. Typically ordered alongside lobby or suite furniture sets.",
    tiers: ["6+ units", "30+ units", "100+ units"] },

  // — Bedding & Linen —
  { id: "p-sheet-king", name: "300TC Sateen Sheet Set", category: "bedding-linen", image: imgSheetSet,
    description: "Long-staple cotton sateen, hospitality-laundering rated.",
    pricingNote: "Priced per set (fitted + flat + 2 pillowcases). Hotels typically stock 3 sets per room.",
    tiers: ["30+ sets", "150+ sets", "500+ sets"] },
  { id: "p-towel-bath", name: "600gsm Bath Towel", category: "bedding-linen", image: imgBathTowel,
    description: "Heavyweight Egyptian cotton, ring-spun for plush hand.",
    pricingNote: "Priced per dozen. Standard hotel spec is 4–6 towels per room at opening.",
    tiers: ["5 doz+", "25 doz+", "100 doz+"] },
  { id: "p-robe-waffle", name: "Waffle Bathrobe", category: "bedding-linen", image: imgBathrobe,
    description: "Lightweight waffle weave with kimono collar and tie belt.",
    pricingNote: "Priced per unit. Most properties order 1–2 per room plus a lobby stock.",
    tiers: ["20+ units", "100+ units", "400+ units"] },
  { id: "p-duvet-king", name: "All-Season King Duvet", category: "bedding-linen", image: imgDuvet,
    description: "Microfibre fill with cotton shell, machine washable.",
    pricingNote: "Priced per unit. Hotels typically hold 2 duvets per room for rotation.",
    tiers: ["20+ units", "100+ units", "400+ units"] },

  // — Bathroom Solutions —
  { id: "p-bath-tub", name: "Freestanding Marble Tub", category: "bathroom-solutions", image: imgMarbleTub,
    description: "Polished freestanding tub with brass mixer support.",
    pricingNote: "High-specification item — typically quoted individually or for suite-level rooms.",
    tiers: ["1–4 units", "5–19 units", "20+ units"] },
  { id: "p-rain-shower", name: "Rain Shower System", category: "bathroom-solutions", image: bathroom,
    description: "Brushed-brass overhead rain head with handheld diverter.",
    pricingNote: "Priced per system (head + diverter + valve). Volume tiers for full-floor fit-outs.",
    tiers: ["10+ systems", "50+ systems", "150+ systems"] },
  { id: "p-mirror-led", name: "Backlit Vanity Mirror", category: "bathroom-solutions", image: bathroom,
    description: "LED-backlit mirror with anti-fog and touch dimmer.",
    pricingNote: "Priced per unit. One per bathroom — quote scales linearly with room count.",
    tiers: ["10+ units", "50+ units", "200+ units"] },
  { id: "p-amenity-set", name: "Amenity Bottle Set", category: "bathroom-solutions", image: bathroom,
    description: "Shampoo, conditioner and body wash refillable bottles.",
    pricingNote: "Priced per room set (3 bottles). Consumable refills quoted separately.",
    tiers: ["50+ sets", "200+ sets", "1 000+ sets"] },

  // — Restaurant & Dining —
  { id: "p-dining-table", name: "Restaurant Dining Table", category: "restaurant-dining", image: imgDiningTable,
    description: "Solid oak top with wrought-iron base, seats 4.",
    pricingNote: "Priced per table. F&B fit-outs are typically quoted as full dining-room packages.",
    tiers: ["6+ tables", "20+ tables", "60+ tables"] },
  { id: "p-glass-wine", name: "Crystal Wine Glasses", category: "restaurant-dining", image: imgWineGlass,
    description: "Lead-free crystal, dishwasher safe — case of 24.",
    pricingNote: "Priced per case of 24. Restaurants typically open with 3× seat-count in glass stock.",
    tiers: ["5+ cases", "20+ cases", "80+ cases"] },
  { id: "p-plate-set", name: "Porcelain Plate Set", category: "restaurant-dining", image: imgPlateSet,
    description: "Banquet-grade porcelain, chip-resistant rim.",
    pricingNote: "Priced per dozen. Standard F&B opening stock is 3–4× cover count.",
    tiers: ["10 doz+", "50 doz+", "200 doz+"] },
  { id: "p-buffet-station", name: "Buffet Warming Station", category: "restaurant-dining", image: imgBuffet,
    description: "Twin-bay chafing station with adjustable thermostat.",
    pricingNote: "Priced per station. Breakfast operations typically use 6–12 stations.",
    tiers: ["2+ stations", "6+ stations", "20+ stations"] },

  // — Reception & Lobby —
  { id: "p-reception-desk", name: "Marble Reception Desk", category: "reception-lobby", image: imgReceptionDesk,
    description: "Custom-length marble front desk with cable management.",
    pricingNote: "Quoted per project — desk length and finish are configured to your lobby dimensions.",
    tiers: ["Single unit", "2–3 units", "4+ units"] },
  { id: "p-lobby-sofa", name: "Modular Lobby Sofa", category: "reception-lobby", image: imgLobbySofa,
    description: "3-seat modular sofa in performance velvet.",
    pricingNote: "Priced per module. Lobby configurations typically use 2–6 modules.",
    tiers: ["2+ modules", "6+ modules", "20+ modules"] },
  { id: "p-lounge-chair", name: "Brass Lounge Chair", category: "reception-lobby", image: imgBrassChair,
    description: "Mid-century lounge chair with brushed brass frame.",
    pricingNote: "Priced per chair. Often ordered in pairs or sets of four for seating clusters.",
    tiers: ["4+ chairs", "16+ chairs", "60+ chairs"] },

  // — Outdoor & Pool —
  { id: "p-pool-lounger", name: "Aluminium Sun Lounger", category: "outdoor-pool", image: imgSunLounger,
    description: "Powder-coated aluminium frame with weave sling.",
    pricingNote: "Priced per lounger. Pool decks typically spec 2 loungers per key for resort properties.",
    tiers: ["10+ units", "40+ units", "150+ units"] },
  { id: "p-pool-umbrella", name: "Cantilever Pool Umbrella", category: "outdoor-pool", image: imgPoolUmbrella,
    description: "3m cantilever umbrella with crank tilt.",
    pricingNote: "Priced per umbrella. Typically 1 umbrella per 2–3 loungers.",
    tiers: ["5+ units", "20+ units", "80+ units"] },
  { id: "p-outdoor-sofa", name: "Teak Outdoor Sofa", category: "outdoor-pool", image: imgTeakSofa,
    description: "FSC teak sofa with quick-dry foam cushions.",
    pricingNote: "Priced per piece. Outdoor lounge areas are typically quoted as full sets.",
    tiers: ["4+ pieces", "16+ pieces", "50+ pieces"] },

  // — Lighting & Decoration —
  { id: "p-chandelier", name: "Crystal Lobby Chandelier", category: "lighting-decoration", image: imgChandelier,
    description: "Multi-tier crystal chandelier for double-height lobbies.",
    pricingNote: "Custom-quoted by size and tier count. Lead time 8–14 weeks for bespoke pieces.",
    tiers: ["1–2 units", "3–5 units", "6+ units"] },
  { id: "p-pendant-brass", name: "Brushed Brass Pendant", category: "lighting-decoration", image: imgBrassPendant,
    description: "Smoked-glass pendant with brushed-brass canopy.",
    pricingNote: "Priced per fitting. Restaurant and corridor schemes typically use 20–100+ pendants.",
    tiers: ["10+ fittings", "40+ fittings", "120+ fittings"] },
  { id: "p-carpet-runner", name: "Corridor Carpet Runner", category: "lighting-decoration", image: imgCarpetRunner,
    description: "Custom-woven carpet runner, hospitality stain rating.",
    pricingNote: "Priced per linear metre. Width and pattern are quoted per project.",
    tiers: ["20 m+", "100 m+", "500 m+"] },

  // — Security & Smart Hotel —
  { id: "p-smart-lock", name: "RFID Smart Lock", category: "security-smart", image: imgSmartLock,
    description: "Card and mobile-key enabled lock with audit trail.",
    pricingNote: "Priced per door. Full-property installs include PMS integration — quoted per project.",
    tiers: ["10+ doors", "50+ doors", "200+ doors"] },
  { id: "p-cctv-dome", name: "Dome CCTV Camera", category: "security-smart", image: imgCCTV,
    description: "4K dome with night vision and onboard storage.",
    pricingNote: "Priced per camera. Security layouts are designed and quoted as complete systems.",
    tiers: ["8+ cameras", "30+ cameras", "100+ cameras"] },
  { id: "p-room-safe", name: "In-Room Electronic Safe", category: "security-smart", image: imgRoomSafe,
    description: "Laptop-size safe with audit log and override key.",
    pricingNote: "Priced per unit. One safe per room — quote scales with room count.",
    tiers: ["10+ units", "50+ units", "200+ units"] },

  // — Swimming Pool Equipment —
  { id: "p-pool-pump", name: "Variable Speed Pool Pump", category: "swimming-pool", image: pool,
    description: "Energy-efficient variable speed pump for pools up to 120m³, whisper-quiet operation.",
    pricingNote: "Priced per unit. Pump sizing is based on pool volume — quoted per project.",
    tiers: ["1–2 units", "3–6 units", "7+ units"] },
  { id: "p-pool-filter", name: "Commercial Sand Filter", category: "swimming-pool", image: pool,
    description: "High-rate sand filter for hotel and resort pools, manual multiport valve included.",
    pricingNote: "Priced per filter. Typically paired with a pump — ask about system bundles.",
    tiers: ["1–2 units", "3–5 units", "6+ units"] },
  { id: "p-pool-light", name: "Underwater LED Spotlight", category: "swimming-pool", image: pool,
    description: "12V RGB underwater spotlight, colour-changeable with remote. IP68 rated.",
    pricingNote: "Priced per fitting. Pools typically use 4–20 lights depending on size and design.",
    tiers: ["4+ fittings", "12+ fittings", "40+ fittings"] },
  { id: "p-pool-cleaner", name: "Robotic Pool Cleaner", category: "swimming-pool", image: pool,
    description: "Autonomous robotic cleaner for floor, walls and waterline. 90-minute cycle.",
    pricingNote: "Priced per unit. One cleaner per pool is standard for hotel properties.",
    tiers: ["1–2 units", "3–5 units", "6+ units"] },
  { id: "p-pool-ladder", name: "Stainless Steel Pool Ladder", category: "swimming-pool", image: pool,
    description: "316-grade stainless steel 3-step ladder with anti-slip treads and deck flanges.",
    pricingNote: "Priced per ladder. Most pools require 2–4 entry points.",
    tiers: ["2+ units", "6+ units", "20+ units"] },

  // — Housekeeping & Laundry —
  { id: "p-washer-25kg", name: "25kg Industrial Washer", category: "housekeeping-laundry", image: imgWasher,
    description: "Soft-mount industrial washer with automatic dosing.",
    pricingNote: "Quoted per machine. Laundry room capacity is planned based on room count and linen volume.",
    tiers: ["1–2 machines", "3–5 machines", "6+ machines"] },
  { id: "p-hk-trolley", name: "Housekeeping Trolley", category: "housekeeping-laundry", image: imgHKTrolley,
    description: "Aluminium frame trolley with sorting bags and linen shelves.",
    pricingNote: "Priced per trolley. Typically 1 trolley per floor or per 10–15 rooms.",
    tiers: ["3+ trolleys", "10+ trolleys", "40+ trolleys"] },
  { id: "p-vacuum-pro", name: "Commercial Backpack Vacuum", category: "housekeeping-laundry", image: imgVacuum,
    description: "HEPA-filtered backpack vacuum for fast room turns.",
    pricingNote: "Priced per unit. Most properties use 1 vacuum per 2 housekeeping staff on shift.",
    tiers: ["4+ units", "15+ units", "50+ units"] },
];

export function productsByCategory(slug: string) {
  return seedProducts.filter((p) => p.category === slug);
}
export function productBySlug(id: string) {
  return seedProducts.find((p) => p.id === id);
}
