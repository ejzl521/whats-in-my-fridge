import { NextRequest, NextResponse } from "next/server";
import { getRecipes } from "@/apis/recipe/claude";
import { RecipeFilter } from "@/apis/recipe/type";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ingredients, filters } = body as {
      ingredients: string[];
      filters?: RecipeFilter;
    };

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: "재료를 하나 이상 선택해주세요." },
        { status: 400 }
      );
    }

    const recipes = await getRecipes(ingredients, filters);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error("Recipe API error:", error);
    return NextResponse.json(
      { error: "레시피를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
