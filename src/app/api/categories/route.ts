import { NextResponse } from 'next/server';
import { categories } from '@/lib/data-generator';
import { generateProducts } from '@/lib/data-generator';

export async function GET() {
  const products = generateProducts(2000);
  
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    productCount: products.filter(p => p.category === category.name).length
  }));

  return NextResponse.json(categoriesWithCounts);
}
