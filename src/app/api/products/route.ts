import { NextResponse } from 'next/server';
import { generateProducts } from '@/lib/data-generator';

const products = generateProducts(2000);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '24');
  const sort = searchParams.get('sort') || 'newest';
  const isNew = searchParams.get('isNew');
  const isBestseller = searchParams.get('isBestseller');
  const minDiscount = searchParams.get('minDiscount');

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
  }

  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (isNew === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isNew);
  }

  if (isBestseller === 'true') {
    filteredProducts = filteredProducts.filter(p => p.isBestseller);
  }

  if (minDiscount) {
    const discount = parseInt(minDiscount);
    filteredProducts = filteredProducts.filter(p => {
      const d = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
      return d >= discount;
    });
  }

  switch (sort) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'reviews':
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    case 'newest':
    default:
      filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
  }

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return NextResponse.json({
    products: paginatedProducts,
    total: totalProducts,
    page,
    totalPages,
    limit
  });
}
