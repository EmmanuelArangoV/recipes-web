import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/services/recipeService';

export async function GET() {
  try {
    const data = await getAllRecipes();
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
  }
}
