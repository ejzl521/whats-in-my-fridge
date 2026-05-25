"use client";

import { useState } from "react";
import {
  INGREDIENT_CATEGORIES,
  DIFFICULTY_OPTIONS,
  COOKING_TIME_OPTIONS,
  CALORIE_OPTIONS,
} from "@/constants/recipe";
import { RecipeFilter } from "@/apis/recipe/type";

type Props = {
  onSearch: (ingredients: string[], filters: RecipeFilter) => void;
  isLoading: boolean;
};

export default function IngredientSelector({ onSearch, isLoading }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<RecipeFilter>({});

  const toggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {INGREDIENT_CATEGORIES.map((category) => (
          <div key={category.name}>
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selected.includes(item)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } cursor-pointer`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 필터 */}
      <div className="border-t pt-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-500">필터 (선택사항)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            value={filters.difficulty || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                difficulty: e.target.value || undefined,
              }))
            }
            className="border rounded-lg px-3 py-2 text-sm text-gray-700"
          >
            <option value="">난이도 전체</option>
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={filters.cookingTime || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                cookingTime: e.target.value || undefined,
              }))
            }
            className="border rounded-lg px-3 py-2 text-sm text-gray-700"
          >
            <option value="">조리시간 전체</option>
            {COOKING_TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={filters.calorie || ""}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                calorie: e.target.value || undefined,
              }))
            }
            className="border rounded-lg px-3 py-2 text-sm text-gray-700"
          >
            <option value="">칼로리 전체</option>
            {CALORIE_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selected.length > 0 && (
        <div className="text-sm text-gray-600">
          선택된 재료:{" "}
          <span className="font-medium text-green-600">
            {selected.join(", ")}
          </span>
        </div>
      )}

      <button
        onClick={() => onSearch(selected, filters)}
        disabled={selected.length === 0 || isLoading}
        className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-base hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "레시피 찾는 중..." : "레시피 찾기"}
      </button>
    </div>
  );
}
