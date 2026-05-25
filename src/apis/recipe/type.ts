export type RecipeFilter = {
  difficulty?: string;
  cookingTime?: string;
  calorie?: string;
};

export type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  cookingTime: string;
  calories: string;
  description: string;
};
