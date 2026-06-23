import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { getFavoritesByUser, addFavorite, removeFavorite } from '@/lib/services/favoriteService';

type AuthSession = { user: { id: string } };

async function requireSession(): Promise<AuthSession | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  return session as AuthSession;
}

export async function GET() {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await getFavoritesByUser(session.user.id);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { recipeId } = await req.json();
    if (!recipeId) return NextResponse.json({ error: 'recipeId is required' }, { status: 400 });

    const data = await addFavorite(session.user.id, recipeId);
    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add favorite' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { recipeId } = await req.json();
    if (!recipeId) return NextResponse.json({ error: 'recipeId is required' }, { status: 400 });

    await removeFavorite(session.user.id, recipeId);
    return NextResponse.json({ success: true, message: 'Removed from favorites' });
  } catch {
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 });
  }
}
