import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { mockRecipes } from "@/app/lib/mockData";
import Recipe from "@/app/models/Recipe";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("[ERROR]: MONGODB_URI is not defined in .env");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("[SUCCESS]: Connected to MongoDB");

    await Recipe.deleteMany({});
    console.log("[INFO]: Cleared existing recipes");

    await Recipe.insertMany(mockRecipes);
    console.log(`[INFO]: Seeded ${mockRecipes.length} recipes successfully`);
  } catch (err) {
    console.error("[ERROR]: Seed failed:", err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("[INFO]: Disconnected from MongoDB");
  }
}

seed();
