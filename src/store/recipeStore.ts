import { create } from "zustand";
import { isAxiosError } from "axios";
import { Recipe, RecipeFilter } from "@/apis/recipe/type";
import { fetchRecipesApi } from "@/apis/recipe/recipeApi";

type RecipeState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  fetchRecipes: (ingredients: string[], filters: RecipeFilter) => Promise<void>;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  isLoading: false,
  error: null,

  fetchRecipes: async (ingredients, filters) => {
    set({ isLoading: true, error: null, recipes: [] });

    try {
      const recipes = await fetchRecipesApi(ingredients, filters);
      set({ recipes });
    } catch (error) {
      const message = isAxiosError(error)
        ? (error.response?.data?.error ?? "오류가 발생했습니다.")
        : "네트워크 오류가 발생했습니다.";
      set({ error: message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
