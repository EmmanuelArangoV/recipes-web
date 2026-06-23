import { Types } from "mongoose";
import type { DefaultSession } from "next-auth";

// Enums

export type DifficultyLevel = "easy" | "medium" | "hard";

// Interfaces

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IIngredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface IStep {
  stepNumber: number;
  description: string;
}

export interface IRecipe {
  _id: Types.ObjectId;
  title: string;
  image: string;
  prepTime: number;
  difficulty: DifficultyLevel;
  description: string;
  servings: number;
  ingredients: IIngredient[];
  steps: IStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IFavorite {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  recipeId: Types.ObjectId;
  createdAt: Date;
}

// DTOs

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface RecipeSummaryDTO {
  id: string;
  title: string;
  image: string;
  prepTime: number;
  difficulty: DifficultyLevel;
  description: string;
}

export interface RecipeDTO extends RecipeSummaryDTO {
  servings: number;
  ingredients: IIngredient[];
  steps: IStep[];
  createdAt: string;
}

export interface FavoriteDTO {
  id: string;
  userId: string;
  recipeId: string;
  recipe: RecipeSummaryDTO;
  createdAt: string;
}

// Component Props

export interface RecipeCardProps {
  recipe: RecipeSummaryDTO;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
  onToggleFavorite?: (recipeId: string) => void;
}

// Auth

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

// Extend next-auth's Session type to include the user id
declare module "next-auth" {
  interface Session {
    user: SessionUser & DefaultSession["user"];
  }
  interface User {
    id: string;
    name: string;
    email: string;
  }
}

// API Responses

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type RecipesResponse = ApiResponse<RecipeSummaryDTO[]>;
export type RecipeResponse = ApiResponse<RecipeDTO>;
export type FavoritesResponse = ApiResponse<FavoriteDTO[]>;
export type AuthResponse = ApiResponse<UserDTO>;
