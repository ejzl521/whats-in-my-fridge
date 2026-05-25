"use client";

import { useState } from "react";
import { Recipe } from "@/apis/recipe/type";
import { useBookmarkStore } from "@/store/bookmarkStore";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const [open, setOpen] = useState(false);

  const bookmarked = isBookmarked(recipe.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{recipe.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>
          </div>
          <button
            onClick={() => toggleBookmark(recipe)}
            className={`text-xl flex-shrink-0 ${
              bookmarked
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            }`}
            aria-label="북마크"
          >
            ★
          </button>
        </div>

        <div className="flex gap-3 mt-3">
          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full cursor-pointer">
            {recipe.difficulty}
          </span>
          <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full cursor-pointer">
            {recipe.cookingTime}
          </span>
          <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full cursor-pointer">
            {recipe.calories}
          </span>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="mt-4 text-sm text-green-600 hover:text-green-700 font-medium"
        >
          {open ? "접기" : "레시피 보기"} {open ? "▲" : "▼"}
        </button>

        {open && (
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">재료</h4>
              <div className="flex flex-wrap gap-1.5">
                {recipe.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full cursor-pointer"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                조리 순서
              </h4>
              <ol className="space-y-1.5">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
