import { useEffect, useState } from "react";
import { useArticles } from "../../../application/articles";
import { IArticle } from "../../../domain/article";
import {
  useArticlesStorage,
  useBackdropStorage,
} from "../../../services/storageAdapter";
import { Article } from "../../Article";
import { Loader } from "../../Loader";
import styles from "./Search.module.css";

export function SearchArticle() {
  // application
  const { loadMoreArticle } = useArticles();
  const { loading } = useBackdropStorage();

  // adapter
  const { articles, loadMoreArticles } = useArticlesStorage();

  //
  //  hooks
  // ----------------------------------------------------------------------
  const [items, setItems] = useState<IArticle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page != 1 || hasMore) fetchData(page);
    else setItems(articles);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  //
  //  function
  // ----------------------------------------------------------------------
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
      setLoadMore(true);
    }
  };

  const fetchData = async (page: number) => {
    await loadMoreArticle(page, localStorage.getItem("search") ?? "");
    setLoadMore(false);

    if (!items.length) {
      setHasMore(false);
    }
    setItems([...items, ...loadMoreArticles]);
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );

  return (
    <div className={styles.search}>
      {items?.map((article: IArticle) => (
        <Article article={article} key={article.id} />
      ))}
      {loadMore ? (
        <div className={styles.loard_more}>
          <h2>Loading...</h2>
        </div>
      ) : null}
    </div>
  );
}
