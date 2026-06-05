// Kaya hotel-supply catalog (static seed)
import lobby from "@/assets/hero-lobby.jpg";
import suite from "@/assets/hero-suite.jpg";
import bathroom from "@/assets/hero-bathroom.jpg";
import restaurant from "@/assets/hero-restaurant.jpg";
import pool from "@/assets/hero-pool.jpg";
import linens from "@/assets/hero-linens.jpg";

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
  { title: "Tbilisi Boutique Hotel · 84 rooms", location: "Tbilisi, Georgia", image: lobby, scope: "Full fit-out — furniture, linen, bath, lighting." },
  { title: "Black Sea Resort · 220 rooms", location: "Batumi, Georgia", image: pool, scope: "Outdoor, pool, FF&E and amenities." },
  { title: "Kazbegi Mountain Lodge", location: "Stepantsminda, Georgia", image: suite, scope: "Guest rooms, lobby, restaurant supply." },
  { title: "Old Town Serviced Apartments", location: "Tbilisi, Georgia", image: restaurant, scope: "48 units, kitchenettes and linens." },
];

// Sample products per category (image + name only — pricing handled per quote)
export type SeedProduct = {
  id: string;
  name: string;
  category: string; // slug
  image: string;
  description: string;
};

export const seedProducts: SeedProduct[] = [
  { id: "p-bed-king", name: "Hospitality King Bed", category: "guest-room-furniture", image: suite, description: "Solid-frame king bed with upholstered headboard, built for daily turnover." },
  { id: "p-wardrobe", name: "Open Suite Wardrobe", category: "guest-room-furniture", image: suite, description: "Walnut-finish open wardrobe with luggage shelf and hanging rail." },
  { id: "p-desk-walnut", name: "Walnut Writing Desk", category: "guest-room-furniture", image: suite, description: "Compact desk with cable port and integrated power." },
  { id: "p-armchair", name: "Lounge Reading Chair", category: "guest-room-furniture", image: lobby, description: "Linen-upholstered reading chair with hardwood frame." },
  { id: "p-sheet-king", name: "300TC Sateen Sheet Set", category: "bedding-linen", image: linens, description: "Long-staple cotton sateen, hospitality-laundering rated." },
  { id: "p-towel-bath", name: "600gsm Bath Towel", category: "bedding-linen", image: linens, description: "Heavyweight Egyptian cotton, ring-spun for plush hand." },
  { id: "p-robe-waffle", name: "Waffle Bathrobe", category: "bedding-linen", image: linens, description: "Lightweight waffle weave with kimono collar and tie belt." },
  { id: "p-duvet-king", name: "All-Season King Duvet", category: "bedding-linen", image: linens, description: "Microfibre fill with cotton shell, machine washable." },
  { id: "p-bath-tub", name: "Freestanding Marble Tub", category: "bathroom-solutions", image: bathroom, description: "Polished freestanding tub with brass mixer support." },
  { id: "p-rain-shower", name: "Rain Shower System", category: "bathroom-solutions", image: bathroom, description: "Brushed-brass overhead rain head with handheld diverter." },
  { id: "p-mirror-led", name: "Backlit Vanity Mirror", category: "bathroom-solutions", image: bathroom, description: "LED-backlit mirror with anti-fog and touch dimmer." },
  { id: "p-amenity-set", name: "Amenity Bottle Set", category: "bathroom-solutions", image: bathroom, description: "Shampoo, conditioner and body wash refillable bottles." },
  { id: "p-dining-table", name: "Restaurant Dining Table", category: "restaurant-dining", image: restaurant, description: "Solid oak top with wrought-iron base, seats 4." },
  { id: "p-glass-wine", name: "Crystal Wine Glasses", category: "restaurant-dining", image: restaurant, description: "Lead-free crystal, dishwasher safe — case of 24." },
  { id: "p-plate-set", name: "Porcelain Plate Set", category: "restaurant-dining", image: restaurant, description: "Banquet-grade porcelain, chip-resistant rim." },
  { id: "p-buffet-station", name: "Buffet Warming Station", category: "restaurant-dining", image: restaurant, description: "Twin-bay chafing station with adjustable thermostat." },
  { id: "p-reception-desk", name: "Marble Reception Desk", category: "reception-lobby", image: lobby, description: "Custom-length marble front desk with cable management." },
  { id: "p-lobby-sofa", name: "Modular Lobby Sofa", category: "reception-lobby", image: lobby, description: "3-seat modular sofa in performance velvet." },
  { id: "p-lounge-chair", name: "Brass Lounge Chair", category: "reception-lobby", image: lobby, description: "Mid-century lounge chair with brushed brass frame." },
  { id: "p-pool-lounger", name: "Aluminium Sun Lounger", category: "outdoor-pool", image: pool, description: "Powder-coated aluminium frame with weave sling." },
  { id: "p-pool-umbrella", name: "Cantilever Pool Umbrella", category: "outdoor-pool", image: pool, description: "3m cantilever umbrella with crank tilt." },
  { id: "p-outdoor-sofa", name: "Teak Outdoor Sofa", category: "outdoor-pool", image: pool, description: "FSC teak sofa with quick-dry foam cushions." },
  { id: "p-chandelier", name: "Crystal Lobby Chandelier", category: "lighting-decoration", image: lobby, description: "Multi-tier crystal chandelier for double-height lobbies." },
  { id: "p-pendant-brass", name: "Brushed Brass Pendant", category: "lighting-decoration", image: lobby, description: "Smoked-glass pendant with brushed-brass canopy." },
  { id: "p-carpet-runner", name: "Corridor Carpet Runner", category: "lighting-decoration", image: lobby, description: "Custom-woven carpet runner, hospitality stain rating." },
  { id: "p-smart-lock", name: "RFID Smart Lock", category: "security-smart", image: suite, description: "Card and mobile-key enabled lock with audit trail." },
  { id: "p-cctv-dome", name: "Dome CCTV Camera", category: "security-smart", image: suite, description: "4K dome with night vision and onboard storage." },
  { id: "p-room-safe", name: "In-Room Electronic Safe", category: "security-smart", image: suite, description: "Laptop-size safe with audit log and override key." },
  { id: "p-washer-25kg", name: "25kg Industrial Washer", category: "housekeeping-laundry", image: linens, description: "Soft-mount industrial washer with automatic dosing." },
  { id: "p-hk-trolley", name: "Housekeeping Trolley", category: "housekeeping-laundry", image: linens, description: "Aluminium frame trolley with sorting bags and linen shelves." },
  { id: "p-vacuum-pro", name: "Commercial Backpack Vacuum", category: "housekeeping-laundry", image: linens, description: "HEPA-filtered backpack vacuum for fast room turns." },
];

export function productsByCategory(slug: string) {
  return seedProducts.filter((p) => p.category === slug);
}
export function productBySlug(id: string) {
  return seedProducts.find((p) => p.id === id);
}
