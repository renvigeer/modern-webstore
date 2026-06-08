// Database Seeding Script
// This script can be used to seed your database with 2000+ products

import { generateProducts } from "../src/lib/data-generator";

async function seedDatabase() {
  console.log("🚀 Starting database seeding...");

  console.log("📦 Generating 2000+ products...");
  const products = generateProducts(2000);

  console.log(`✅ Generated ${products.length} products!`);

  // TODO: Connect to your database and insert the products
  // Example (MongoDB/Mongoose):
  // await Product.insertMany(products);

  console.log("\n📊 Product Statistics:");
  console.log(`- Total Products: ${products.length}`);

  // Count by category
  const categoryCounts: Record<string, number> = {};
  products.forEach(product => {
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
  });

  console.log("\n📁 Category Breakdown:");
  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`- ${category}: ${count} products`);
  });

  console.log("\n✨ Seeding complete!");
  console.log("\n💡 Next steps:");
  console.log("1. Set up your MongoDB connection in .env.local");
  console.log("2. Uncomment the database insertion code in this script");
  console.log("3. Run 'npx tsx scripts/seed-database.ts' to seed your database");
}

seedDatabase().catch(console.error);
