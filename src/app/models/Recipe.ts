import { Schema, model, models, Document } from "mongoose";
import { IRecipe, IIngredient, IStep } from "@/app/types";

export interface IRecipeDocument extends IRecipe, Document {}

const IngredientSchema = new Schema<IIngredient>(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: String, required: true },
    unit: { type: String, trim: true },
  },
  { _id: false }
);

const StepSchema = new Schema<IStep>(
  {
    stepNumber: { type: Number, required: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const RecipeSchema = new Schema<IRecipeDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    prepTime: {
      type: Number,
      required: [true, "Prep time is required"],
      min: [1, "Prep time must be at least 1 minute"],
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [true, "Difficulty is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    servings: {
      type: Number,
      required: [true, "Servings is required"],
      min: [1, "Servings must be at least 1"],
    },
    ingredients: {
      type: [IngredientSchema],
      required: [true, "Ingredients are required"],
      validate: {
        validator: (v: IIngredient[]) => v.length > 0,
        message: "At least one ingredient is required",
      },
    },
    steps: {
      type: [StepSchema],
      required: [true, "Steps are required"],
      validate: {
        validator: (v: IStep[]) => v.length > 0,
        message: "At least one step is required",
      },
    },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model<IRecipeDocument>("Recipe", RecipeSchema);

export default Recipe;
