export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew: boolean;
  isBestseller: boolean;
  tags: string[];
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
}

// Comprehensive category structure
export const categories: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    icon: "👔",
    subcategories: [
      "Men's Clothing", "Women's Clothing", "Kids' Clothing",
      "Shoes", "Bags", "Accessories", "Jewelry", "Watches"
    ],
    productCount: 0
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    subcategories: [
      "Phones", "Laptops", "Headphones", "Smart Watches",
      "Cameras", "Audio", "Chargers", "Cables"
    ],
    productCount: 0
  },
  {
    id: "home",
    name: "Home & Garden",
    icon: "🏠",
    subcategories: [
      "Furniture", "Decor", "Kitchen", "Bedding",
      "Garden", "Tools", "Storage", "Lighting"
    ],
    productCount: 0
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    icon: "💄",
    subcategories: [
      "Skincare", "Makeup", "Haircare", "Fragrance",
      "Nails", "Tools", "Supplements", "Oral Care"
    ],
    productCount: 0
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: "🏃",
    subcategories: [
      "Clothing", "Shoes", "Equipment", "Fitness",
      "Camping", "Cycling", "Swimming", "Yoga"
    ],
    productCount: 0
  },
  {
    id: "toys",
    name: "Toys & Kids",
    icon: "🎮",
    subcategories: [
      "Toys", "Games", "Baby", "Educational",
      "Outdoor Play", "Arts", "Building Blocks", "Dolls"
    ],
    productCount: 0
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "🚗",
    subcategories: [
      "Accessories", "Electronics", "Tools", "Cleaning",
      "Parts", "Lights", "Seat Covers", "Organizers"
    ],
    productCount: 0
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: "🐕",
    subcategories: [
      "Dog", "Cat", "Food", "Toys",
      "Grooming", "Beds", "Collars", "Aquariums"
    ],
    productCount: 0
  }
];

// Product name components for realistic generation
const productTemplates = {
  fashion: [
    "Classic {color} {item}", "Premium {material} {item}", "Vintage {item}",
    "Designer {item}", "Casual {color} {item}", "Formal {item}",
    "Trendy {item}", "Comfortable {material} {item}", "Breathable {item}",
    "Waterproof {item}", "Lightweight {item}", "Stylish {color} {item}"
  ],
  electronics: [
    "{brand} {item} {series}", "Wireless {item}", "Smart {item}",
    "Portable {item}", "Professional {item}", "Compact {item}",
    "High-Performance {item}", "Budget-Friendly {item}", "Premium {item}",
    "Next-Gen {item}", "Ultra {item}", "Slim {item}"
  ],
  home: [
    "Modern {item}", "Rustic {item}", "Minimalist {item}",
    "Luxury {item}", "Space-Saving {item}", "Decorative {item}",
    "Functional {item}", "Elegant {item}", "Cozy {item}",
    "Industrial {item}", "Scandinavian {item}", "Bohemian {item}"
  ],
  beauty: [
    "Organic {item}", "Professional {item}", "Nourishing {item}",
    "Premium {item}", "Natural {item}", "Anti-Aging {item}",
    "Hydrating {item}", "Long-Lasting {item}", "Vegan {item}",
    "Cruelty-Free {item}", "Luxury {item}", "Daily {item}"
  ],
  sports: [
    "Professional {item}", "Lightweight {item}", "Durable {item}",
    "Breathable {item}", "Performance {item}", "Training {item}",
    "Competition {item}", "Outdoor {item}", "Indoor {item}",
    "All-Weather {item}", "Ergonomic {item}", "Flexible {item}"
  ],
  toys: [
    "Educational {item}", "Interactive {item}", "Creative {item}",
    "Fun {item}", "Colorful {item}", "Building {item}",
    "Learning {item}", "Plush {item}", "Action {item}",
    "Electronic {item}", "Outdoor {item}", "STEM {item}"
  ],
  automotive: [
    "Universal {item}", "Premium {item}", "Custom {item}",
    "Durable {item}", "Waterproof {item}", "LED {item}",
    "Multi-Functional {item}", "Easy-Install {item}", "Car {item}",
    "Truck {item}", "SUV {item}", "Interior {item}"
  ],
  pets: [
    "Comfortable {item}", "Durable {item}", "Interactive {item}",
    "Pet {item}", "Dog {item}", "Cat {item}",
    "Washable {item}", "Adjustable {item}", "Chew-Proof {item}",
    "Cozy {item}", "Travel {item}", "Grooming {item}"
  ]
};

const itemTypes = {
  fashion: {
    "Men's Clothing": ["T-Shirt", "Shirt", "Jeans", "Jacket", "Sweater", "Hoodie", "Shorts", "Pants"],
    "Women's Clothing": ["Dress", "Blouse", "Skirt", "Leggings", "Top", "Cardigan", "Coat", "Blazer"],
    "Kids' Clothing": ["Onesie", "T-Shirt", "Shorts", "Dress", "Pajamas", "Sweater"],
    "Shoes": ["Sneakers", "Sandals", "Boots", "Heels", "Flats", "Running Shoes"],
    "Bags": ["Backpack", "Tote Bag", "Shoulder Bag", "Clutch", "Wallet", "Handbag"],
    "Accessories": ["Hat", "Scarf", "Belt", "Sunglasses", "Gloves", "Beanie"],
    "Jewelry": ["Necklace", "Bracelet", "Earrings", "Ring", "Pendant", "Anklet"],
    "Watches": ["Analog Watch", "Digital Watch", "Smart Watch", "Sports Watch", "Luxury Watch"]
  },
  electronics: {
    "Phones": ["Smartphone", "Phone Case", "Screen Protector", "Phone Stand", "Grip", "Mount"],
    "Laptops": ["Laptop", "Laptop Stand", "Case", "Sleeve", "Keyboard Cover", "Docking Station"],
    "Headphones": ["Wireless Headphones", "Earbuds", "Noise-Cancelling", "Gaming Headset", "On-Ear"],
    "Smart Watches": ["Smart Watch", "Watch Band", "Screen Protector", "Charger"],
    "Cameras": ["Camera", "Lens", "Tripod", "Bag", "Memory Card", "Battery"],
    "Audio": ["Speaker", "Soundbar", "Microphone", "Audio Cable", "Amplifier"],
    "Chargers": ["USB Charger", "Wireless Charger", "Car Charger", "Power Bank", "Cable"],
    "Cables": ["USB Cable", "HDMI Cable", "Audio Cable", "Charging Cable", "Extension Cord"]
  },
  home: {
    "Furniture": ["Chair", "Table", "Sofa", "Coffee Table", "Bookshelf", "Bed Frame"],
    "Decor": ["Wall Art", "Vase", "Picture Frame", "Mirror", "Clock", "Plant Pot"],
    "Kitchen": ["Cookware", "Knife Set", "Cutting Board", "Mug", "Bowl", "Storage Container"],
    "Bedding": ["Bed Sheet", "Pillow", "Blanket", "Comforter", "Duvet Cover", "Pillowcase"],
    "Garden": ["Planter", "Garden Tool", "Watering Can", "Hose", "Decorative Light", "Furniture"],
    "Tools": ["Screwdriver", "Drill", "Tool Set", "Hammer", "Tape Measure", "Pliers"],
    "Storage": ["Storage Box", "Drawer Organizer", "Shelf", "Basket", "Container", "Hanger"],
    "Lighting": ["Table Lamp", "Floor Lamp", "String Lights", "LED Bulb", "Desk Lamp", "Chandelier"]
  },
  beauty: {
    "Skincare": ["Moisturizer", "Cleanser", "Serum", "Toner", "Sunscreen", "Face Mask"],
    "Makeup": ["Foundation", "Lipstick", "Eyeshadow", "Mascara", "Blush", "Concealer"],
    "Haircare": ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Dry Shampoo", "Styling Product"],
    "Fragrance": ["Perfume", "Cologne", "Body Spray", "Essential Oil", "Candle", "Diffuser"],
    "Nails": ["Nail Polish", "Nail File", "Cuticle Oil", "Nail Art", "Base Coat", "Top Coat"],
    "Tools": ["Brush", "Sponge", "Curler", "Straightener", "Dryer", "Tweezers"],
    "Supplements": ["Vitamin", "Collagen", "Omega-3", "Probiotic", "Herbal", "Mineral"],
    "Oral Care": ["Toothbrush", "Toothpaste", "Mouthwash", "Floss", "Whitening", "Tongue Cleaner"]
  },
  sports: {
    "Clothing": ["T-Shirt", "Shorts", "Leggings", "Jacket", "Tank Top", "Pants"],
    "Shoes": ["Running Shoes", "Sneakers", "Sandals", "Boots", "Cleats", "Trainers"],
    "Equipment": ["Ball", "Racket", "Bat", "Gloves", "Helmet", "Pads"],
    "Fitness": ["Dumbbell", "Resistance Band", "Yoga Mat", "Kettlebell", "Jump Rope", "Foam Roller"],
    "Camping": ["Tent", "Sleeping Bag", "Backpack", "Lantern", "Cookware", "Chair"],
    "Cycling": ["Bike", "Helmet", "Lock", "Light", "Water Bottle", "Pump"],
    "Swimming": ["Swimsuit", "Goggles", "Cap", "Towel", "Fins", "Snorkel"],
    "Yoga": ["Yoga Mat", "Block", "Strap", "Towel", "Ball", "Bands"]
  },
  toys: {
    "Toys": ["Action Figure", "Doll", "Car", "Plane", "Robot", "Plush Toy"],
    "Games": ["Board Game", "Card Game", "Puzzle", "Building Set", "Strategy Game", "Family Game"],
    "Baby": ["Rattle", "Teether", "Blanket", "Bottle", "High Chair", "Toy"],
    "Educational": ["Learning Toy", "Flash Cards", "Abacus", "Science Kit", "Art Set", "Book"],
    "Outdoor Play": ["Slide", "Swing", "Trampoline", "Pool", "Basketball Hoop", "Playhouse"],
    "Arts": ["Crayon Set", "Markers", "Coloring Book", "Paint Set", "Clay", "Craft Kit"],
    "Building Blocks": ["Blocks", "Bricks", "Construction Set", "Magnetic Tiles", "STEM Set"],
    "Dolls": ["Baby Doll", "Fashion Doll", "Plush Doll", "Accessories", "House", "Clothes"]
  },
  automotive: {
    "Accessories": ["Car Cover", "Seat Cover", "Steering Wheel Cover", "Sun Shade", "Organizer", "Decor"],
    "Electronics": ["Phone Mount", "Charger", "Bluetooth Adapter", "Dash Cam", "GPS", "Audio"],
    "Tools": ["Jumper Cables", "Tire Gauge", "Tool Kit", "Flashlight", "Tow Strap", "Jack"],
    "Cleaning": ["Car Wash", "Wax", "Polish", "Microfiber Towel", "Brush", "Vacuum"],
    "Parts": ["Wiper Blades", "Air Filter", "Bulbs", "Battery", "Oil Filter", "Fuses"],
    "Lights": ["LED Bulbs", "Headlights", "Taillights", "Interior Light", "Strip Light", "Fog Light"],
    "Seat Covers": ["Leather", "Fabric", "Custom", "Universal", "Waterproof", "Heated"],
    "Organizers": ["Trunk Organizer", "Seat Organizer", "Glove Box", "Console", "Cup Holder", "Storage"]
  },
  pets: {
    "Dog": ["Dog Bed", "Collar", "Leash", "Toy", "Bowl", "Brush"],
    "Cat": ["Cat Tree", "Litter Box", "Scratcher", "Toy", "Bed", "Brush"],
    "Food": ["Dog Food", "Cat Food", "Treats", "Chews", "Wet Food", "Dry Food"],
    "Toys": ["Ball", "Plush", "Chew Toy", "Interactive", "Rope", "Squeaky"],
    "Grooming": ["Brush", "Shampoo", "Nail Clipper", "Comb", "Deshedding", "Dryer"],
    "Beds": ["Dog Bed", "Cat Bed", "Cushion", "Mattress", "Heated", "Orthopedic"],
    "Collars": ["Collar", "Harness", "Leash", "ID Tag", "Bowtie", "Bandana"],
    "Aquariums": ["Fish Tank", "Filter", "Heater", "Light", "Decor", "Gravel"]
  }
};

const colors = ["Black", "White", "Gray", "Blue", "Red", "Green", "Pink", "Purple", "Yellow", "Orange", "Navy", "Brown", "Beige", "Cream"];
const materials = ["Cotton", "Polyester", "Leather", "Denim", "Silk", "Wool", "Linen", "Nylon", "Canvas", "Suede"];
const brands = ["TechPro", "StyleCo", "HomeEssentials", "BeautyLuxe", "SportMaster", "ToyWorld", "AutoCare", "PetLove", "UrbanFit", "ElegantHome"];
const series = ["X1", "Pro", "Ultra", "Elite", "Max", "Prime", "Classic", "Modern", "Premium", "Plus"];

const generateProduct = (id: number, category: Category, subcategory: string): Product => {
  const categoryKey = category.id as keyof typeof productTemplates;
  const templates = productTemplates[categoryKey];
  const items = (itemTypes as any)[categoryKey][subcategory];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const item = items[Math.floor(Math.random() * items.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const seriesName = series[Math.floor(Math.random() * series.length)];

  let name = template
    .replace("{color}", color)
    .replace("{item}", item)
    .replace("{material}", material)
    .replace("{brand}", brand)
    .replace("{series}", seriesName);

  const price = 5 + Math.random() * 195;
  const discount = 0.3 + Math.random() * 0.5;
  const originalPrice = price / (1 - discount);

  const tags = [category.name, subcategory, color, material].filter(Boolean);

  return {
    id,
    name,
    description: `High-quality ${name.toLowerCase()} perfect for everyday use. Durable construction and stylish design. Great value for money!`,
    price: Math.round(price * 100) / 100,
    originalPrice: Math.round(originalPrice * 100) / 100,
    category: category.name,
    subcategory,
    images: [
      `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(name + " product photography white background")}&image_size=square`,
      `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(name + " lifestyle photo")}&image_size=square`
    ],
    rating: 3.5 + Math.random() * 1.5,
    reviews: Math.floor(Math.random() * 5000),
    stock: Math.floor(Math.random() * 500),
    isNew: Math.random() > 0.8,
    isBestseller: Math.random() > 0.9,
    tags,
    createdAt: new Date(Date.now() - Math.random() * 10000000000)
  };
};

export const generateProducts = (count: number = 2000): Product[] => {
  const products: Product[] = [];
  let productId = 1;

  // Distribute products across categories
  const productsPerCategory = Math.floor(count / categories.length);

  categories.forEach(category => {
    const subcategories = category.subcategories;
    const productsPerSubcategory = Math.floor(productsPerCategory / subcategories.length);

    subcategories.forEach(subcategory => {
      for (let i = 0; i < productsPerSubcategory; i++) {
        if (productId <= count) {
          products.push(generateProduct(productId, category, subcategory));
          productId++;
        }
      }
    });
  });

  // Add any remaining products to fill up to count
  while (productId <= count) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomSubcategory = randomCategory.subcategories[Math.floor(Math.random() * randomCategory.subcategories.length)];
    products.push(generateProduct(productId, randomCategory, randomSubcategory));
    productId++;
  }

  // Update product counts in categories
  categories.forEach(category => {
    category.productCount = products.filter(p => p.category === category.name).length;
  });

  return products;
};
