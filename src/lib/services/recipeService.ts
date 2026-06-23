import { connectDB } from '@/app/lib/mongodb';
import Recipe from '@/app/models/Recipe';

export async function getAllRecipes() {
  await connectDB();
  const recipes = await Recipe.find({})
    .select('title image prepTime difficulty description')
    .lean();
  return recipes.map((r: any) => ({ ...r, id: r._id.toString(), _id: undefined }));
}

export async function getRecipeById(id: string) {
  await connectDB();
  const recipe = await Recipe.findById(id)
    .select('title image prepTime difficulty description servings ingredients steps createdAt')
    .lean();
  if (!recipe) return null;
  return { ...(recipe as any), id: (recipe as any)._id.toString(), _id: undefined };
}
