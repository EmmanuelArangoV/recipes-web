import { Schema, model, models, Document, Types } from "mongoose";
import { IFavorite } from "@/app/types";

export interface IFavoriteDocument extends IFavorite, Document {}

const FavoriteSchema = new Schema<IFavoriteDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: [true, "Recipe ID is required"],
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

FavoriteSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

const Favorite =
  models.Favorite || model<IFavoriteDocument>("Favorite", FavoriteSchema);

export default Favorite;
