import React, { useState } from "react";
import { useContext } from "react";
import { IArticle } from "../domain/article";
import { IBookmark } from "../domain/bookmark";

const StoreContext = React.createContext<any>({});
export const useStore = () => useContext(StoreContext);

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState([]);
  const [topArticles, setTopArticles] = useState([]);
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [loadMoreArticles, setLoadMoreArticles] = useState([]);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<IArticle>();
  const [bookmark, setBookmark] = useState<IBookmark>({ articles: [] });
  const [selected, setSelected] = useState("");
  const [msg, setMsg] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);

  let timer: any;
  const displayHandler = (msg: string) => {
    setMsg(msg);
    setIsDisplayed(true);
    timer = setTimeout(() => {
      closeHandler();
    }, 1000);
  };
  const closeHandler = () => {
    clearTimeout(timer);
    setIsDisplayed(false);
  };

  const value = {
    articles,
    searching,
    article,
    bookmark,
    loading,
    topArticles,
    categoryArticles,
    loadMoreArticles,
    selected,
    msg,
    isDisplayed,
    updateArticles: setArticles,
    updateSearching: setSearching,
    updateArticle: setArticle,
    updateBookmark: setBookmark,
    updateLoading: setLoading,
    updateTopArticle: setTopArticles,
    updateLoadMoreArticle: setLoadMoreArticles,
    updateCategoryArticle: setCategoryArticles,
    updateSortingValue: setSelected,
    displayMsg: displayHandler,
    onClose: closeHandler,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
