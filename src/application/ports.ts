import { IArticle } from "../domain/article";
import { IBookmark } from "../domain/bookmark";
import { IData } from "../domain/respone";

export interface BookmarkStorageService {
  bookmark: IBookmark;
  updateBookmark(bookmark: IBookmark): void;
  emptyBookmark(): void;
}

export interface ArticleStorageService {
  articles: IArticle[];
  searching: boolean;
  article: IArticle;
  loading: boolean;
  topArticles: IArticle[];
  categoryArticles: IArticle[];
  loadMoreArticles: IArticle[];
  selected: string;
  updateArticles(articles: IArticle[]): void;
  updateSearching(searching: boolean): void;
  updateArticle(article: IArticle): void;
  updateLoading(loading: boolean): void;
  updateTopArticle(topArticles: IArticle[]): void;
  updateCategoryArticle(categoryArticles: IArticle[]): void;
  updateLoadMoreArticle(loadMoreArticles: IArticle[]): void;
  updateSortingValue(selected: string): void;
}

export interface BackdropStorageService {
  loading: boolean;
  updateLoading(loading: boolean): void;
}

export interface SnackbarStorageService {
  msg: string;
  isDisplayed: boolean;
  displayMsg(msg: string): void;
  onClose(): void;
}

export interface NotificationService {
  notify(message: string): void;
}

export interface GetArticleService {
  getArticle(article: any): Promise<boolean>;
}

export interface SortArticleService {
  sortArticle(article: any): Promise<boolean>;
}
export interface ArticleService {
  sort(article: any): Promise<IData>;
  search(query: string, orderBy: string): Promise<IData>;
  findById(id: string): Promise<IData>;
  findBySection(section: string, orderBy: string): Promise<IData>;
  paginate(page: number, query: string): Promise<IData>;
}
