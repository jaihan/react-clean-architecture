import {
  ArticleStorageService,
  BackdropStorageService,
  BookmarkStorageService,
  SnackbarStorageService,
} from "../application/ports";
import { useStore } from "./store";

// It's also possible to split the whole storage into atomic stores.
// Inside corresponding hooks we can apply memoization, optimizations, selectors...
// Well, you get the idea.

export function useArticlesStorage(): ArticleStorageService {
  return useStore();
}

export function useBookmarkStorage(): BookmarkStorageService {
  return useStore();
}

export function useBackdropStorage(): BackdropStorageService {
  return useStore();
}

export function useSnackbarStorage(): SnackbarStorageService {
  return useStore();
}
