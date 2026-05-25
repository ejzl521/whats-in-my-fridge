"use client";

import IngredientSelector from "@/components/IngredientSelector";
import RecipeList from "@/components/RecipeList";
import { useRecipeStore } from "@/store/recipeStore";

export default function Home() {
  const { recipes, isLoading, error, fetchRecipes } = useRecipeStore();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">🥦 냉장고 털기</h1>
          <p className="text-gray-500 mt-2">있는 재료로 만들 수 있는 레시피를 찾아드려요</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <IngredientSelector onSearch={fetchRecipes} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-3 animate-bounce">👨‍🍳</div>
            <p>레시피를 생성하고 있어요...</p>
          </div>
        )}

        <RecipeList recipes={recipes} />
      </div>
    </main>
  );
}
