import { Recipe } from "@/apis/recipe/type";
import RecipeCard from "./RecipeCard";

type Props = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: Props) {
  if (recipes.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">
        추천 레시피 {recipes.length}개
      </h2>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
