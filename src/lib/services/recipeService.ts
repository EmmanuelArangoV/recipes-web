import { connectDB } from '@/app/lib/mongodb';
import Recipe from '@/app/models/Recipe';
import { IRecipe } from '@/app/types';
import { Types } from 'mongoose';

type LeanRecipe = Omit<IRecipe, '_id'> & { _id: Types.ObjectId };

export async function getAllRecipes() {
  await connectDB();
  const recipes = await Recipe.find({})
    .select('title image prepTime difficulty description')
    .lean<LeanRecipe[]>();
  return recipes.map((r) => ({ ...r, id: r._id.toString(), _id: undefined }));
}

export async function getRecipeById(id: string) {
  await connectDB();
  const recipe = await Recipe.findById(id)
    .select('title image prepTime difficulty description servings ingredients steps createdAt')
    .lean<LeanRecipe>();
  if (!recipe) return null;
  return { ...recipe, id: recipe._id.toString(), _id: undefined };
}
