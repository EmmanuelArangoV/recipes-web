import { NextRequest, NextResponse } from 'next/server';
import { getRecipeById } from '@/lib/services/recipeService';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const data = await getRecipeById(id);
    if (!data) return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch recipe' }, { status: 500 });
  }
}
