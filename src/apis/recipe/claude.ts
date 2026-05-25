import Anthropic from "@anthropic-ai/sdk";
import { Recipe, RecipeFilter } from "./type";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function getRecipes(
  ingredients: string[],
  filters: RecipeFilter = {}
): Promise<Recipe[]> {
  const filterText = [
    filters.difficulty ? `난이도: ${filters.difficulty}` : "",
    filters.cookingTime ? `조리시간: ${filters.cookingTime}` : "",
    filters.calorie ? `칼로리: ${filters.calorie}` : "",
  ]
    .filter(Boolean)
    .join(", ");

  const prompt = `다음 재료들로 만들 수 있는 요리 레시피 3가지를 추천해주세요.

재료: ${ingredients.join(", ")}
${filterText ? `조건: ${filterText}` : ""}

반드시 다음 JSON 형식으로만 응답해주세요. 다른 텍스트 없이 JSON만 반환하세요:
[
  {
    "id": "unique-id-1",
    "name": "레시피 이름",
    "description": "간단한 설명 (1-2문장)",
    "ingredients": ["재료1", "재료2"],
    "steps": ["1. 첫 번째 단계", "2. 두 번째 단계"],
    "difficulty": "쉬움|보통|어려움",
    "cookingTime": "예: 30분",
    "calories": "예: 450kcal"
  }
]`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");

  const jsonMatch = content.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON found in response");

  return JSON.parse(jsonMatch[0]) as Recipe[];
}
