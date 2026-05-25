import axiosInstance from "@/apis/axiosInstance";
import { Recipe, RecipeFilter } from "@/apis/recipe/type";

export async function fetchRecipesApi(
  ingredients: string[],
  filters?: RecipeFilter
): Promise<Recipe[]> {
  const { data } = await axiosInstance.post<{ recipes: Recipe[] }>("/recipe", {
    ingredients,
    filters,
  });

  return data.recipes;
}
