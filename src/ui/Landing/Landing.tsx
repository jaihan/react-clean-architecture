import { useEffect } from "react";
import { useArticles } from "../../application/articles";
import {
  useArticlesStorage,
  useBackdropStorage,
} from "../../services/storageAdapter";
import { Loader } from "../Loader";
import { CategoryArticle, SearchArticle, Section, TopArticle } from "../News";
import styles from "./Landing.module.css";

export function Landing() {
  const { searching } = useArticlesStorage();
  const { loading } = useBackdropStorage();

  const { getCategoryArticles, getTopArticles } = useArticles();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await getTopArticles("news", "newest");
    await getCategoryArticles("sport|culture|lifeandstyle", "newest");
  }

  const sectionName = searching ? "Search result" : "Top Stories";

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );

  return (
    <div>
      <Section name={sectionName} isBookmark={false} />
      {searching ? (
        <SearchArticle />
      ) : (
        <>
          <TopArticle />
          <CategoryArticle />
        </>
      )}
    </div>
  );
}
