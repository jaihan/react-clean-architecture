import { IData } from "../domain/respone";
import { useArticleService } from "../services/articleAdapter";
import { useNotifier } from "../services/notificationAdapter";
import { useArticlesStorage } from "../services/storageAdapter";
import { ArticleService, ArticleStorageService } from "./ports";

export function useArticles() {
  const notifier = useNotifier();
  const articeService: ArticleService = useArticleService();
  const storage: ArticleStorageService = useArticlesStorage();

  async function getTopArticles(section: string, orderBy: string) {
    const data: IData = await articeService.findBySection(section, orderBy);
    if (!data) return notifier.notify("Get top articles wasn't successful");

    storage.updateTopArticle(data?.response?.results);
    storage.updateLoading(false);
  }

  async function getCategoryArticles(section: string, orderBy: string) {
    const data: IData = await articeService.findBySection(section, orderBy);
    if (!data)
      return notifier.notify("Get category articles wasn't successful");

    storage.updateCategoryArticle(data?.response?.results);
    storage.updateLoading(false);
  }

  async function searchArticles(query: string, orderBy: string) {
    const data: IData = await articeService.search(query, orderBy);
    if (!data) return notifier.notify("Search article wasn't successful");

    storage.updateArticles(data?.response?.results);
    storage.updateLoadMoreArticle(data?.response?.results);
    storage.updateSearching(true);
    storage.updateLoading(false);
  }

  async function loadMoreArticle(page: number, query: string) {
    const data: IData = await articeService.paginate(page, query);
    if (!data) return notifier.notify("Load more article wasn't successful");

    storage.updateSearching(true);
    storage.updateLoadMoreArticle(data?.response?.results);
  }

  async function findById(id: string) {
    const data: IData = await articeService.findById(id);
    if (!data) return notifier.notify("The payment wasn't successful 🤷");

    storage.updateArticle(data?.response?.content);
  }

  async function goHome() {
    storage.updateSearching(false);
  }

  async function selectSortingValue(selected: string) {
    storage.updateSortingValue(selected);
  }

  return {
    getTopArticles,
    getCategoryArticles,
    searchArticles,
    findById,
    loadMoreArticle,
    selectSortingValue,
    goHome,
  };
}
