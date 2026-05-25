import { Recipe } from "../apis/recipe/type";

const BOOKMARKS_KEY = "whats-in-my-fridge-bookmarks";

export function getBookmarks(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveBookmark(recipe: Recipe): void {
  const bookmarks = getBookmarks();
  if (!bookmarks.find((b) => b.id === recipe.id)) {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...bookmarks, recipe]));
  }
}

export function removeBookmark(recipeId: string): void {
  const bookmarks = getBookmarks().filter((b) => b.id !== recipeId);
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

export function isBookmarked(recipeId: string): boolean {
  return getBookmarks().some((b) => b.id === recipeId);
}
