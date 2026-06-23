import { connectDB } from '@/app/lib/mongodb';
import Favorite from '@/app/models/Favorite';

export async function getFavoritesByUser(userId: string) {
  await connectDB();
  return Favorite.find({ userId }).populate(
    'recipeId',
    'title image prepTime difficulty description'
  );
}

export async function addFavorite(userId: string, recipeId: string) {
  await connectDB();
  return Favorite.findOneAndUpdate(
    { userId, recipeId },
    { userId, recipeId },
    { upsert: true, returnDocument: 'after' }
  );
}

export async function removeFavorite(userId: string, recipeId: string) {
  await connectDB();
  return Favorite.findOneAndDelete({ userId, recipeId });
}
