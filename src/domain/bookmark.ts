import { IArticle } from "./article";

export type IBookmark = {
  articles: IArticle[];
};

export function addItem(bookmark: IBookmark, articles: IArticle): IBookmark {
  return { ...bookmark, articles: [...bookmark.articles, articles] };
}

export function removeItem(id: string, bookmark: IBookmark): IBookmark {
  const objWithIdIndex = bookmark?.articles?.findIndex((obj) => obj.id === id);

  if (objWithIdIndex > -1) {
    bookmark?.articles?.splice(objWithIdIndex, 1);
  }

  return bookmark;
}
