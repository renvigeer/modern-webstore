import { NextResponse } from 'next/server';
import { generateProducts } from '@/lib/data-generator';

const products = generateProducts(2000);

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string; }> }
) {
  const { id } = await context.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return NextResponse.json({
    product,
    relatedProducts
  });
}
