export type IngredientCategory = {
  name: string;
  items: string[];
};

export const INGREDIENT_CATEGORIES: IngredientCategory[] = [
  {
    name: "채소",
    items: [
      "양파",
      "마늘",
      "당근",
      "감자",
      "대파",
      "브로콜리",
      "시금치",
      "토마토",
      "오이",
      "버섯",
    ],
  },
  {
    name: "육류",
    items: ["닭고기", "돼지고기", "소고기", "베이컨", "소시지"],
  },
  {
    name: "해산물",
    items: ["새우", "오징어", "고등어", "참치캔", "게맛살"],
  },
  {
    name: "유제품",
    items: ["계란", "우유", "버터", "치즈", "요거트"],
  },
  {
    name: "곡류",
    items: ["쌀", "밀가루", "파스타", "라면"],
  },
  {
    name: "소스/양념",
    items: ["간장", "고추장", "된장", "케첩", "마요네즈", "올리브오일"],
  },
];

export const DIFFICULTY_OPTIONS = ["쉬움", "보통", "어려움"];
export const COOKING_TIME_OPTIONS = [
  "15분 이하",
  "30분 이하",
  "1시간 이하",
  "1시간 이상",
];
export const CALORIE_OPTIONS = [
  "저칼로리 (400kcal 이하)",
  "중칼로리 (400-700kcal)",
  "고칼로리 (700kcal 이상)",
];
