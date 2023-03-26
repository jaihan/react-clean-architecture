import { IArticle } from "../domain/article";
import { addItem, IBookmark, removeItem } from "../domain/bookmark";
import { useBookmarkStorage } from "../services/storageAdapter";
import { BookmarkStorageService } from "./ports";

export function useBookmark() {
  const storage: BookmarkStorageService = useBookmarkStorage();

  function addBookmark(bookmark: IBookmark, article: IArticle): void {
    const updated = addItem(bookmark, article);
    localStorage.setItem("bookmark", JSON.stringify(updated));
    storage.updateBookmark(updated);
  }

  function removeBookmark(bookmark: IBookmark, id: string): void {
    const updated = removeItem(id, bookmark);
    localStorage.setItem("bookmark", JSON.stringify(updated));
    storage.updateBookmark(updated);
  }

  return { addBookmark, removeBookmark };
}
