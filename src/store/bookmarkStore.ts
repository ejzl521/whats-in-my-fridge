import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Recipe } from "@/apis/recipe/type";

type BookmarkState = {
  bookmarks: Recipe[];
  toggleBookmark: (recipe: Recipe) => void;
  isBookmarked: (id: string) => boolean;
};

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      toggleBookmark: (recipe) => {
        const exists = get().bookmarks.some((b) => b.id === recipe.id);
        set({
          bookmarks: exists
            ? get().bookmarks.filter((b) => b.id !== recipe.id)
            : [...get().bookmarks, recipe],
        });
      },

      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
    }),
    {
      name: "whats-in-my-fridge-bookmarks",
    }
  )
);
