import { IArticle } from "../../../domain/article";
import { useArticlesStorage } from "../../../services/storageAdapter";
import { Article } from "../../Article";
import styles from "./Category.module.css";

export function CategoryArticle() {
  const { categoryArticles } = useArticlesStorage();
  return (
    <div>
      <h1>Sports</h1>

      <div className={styles.row}>
        {categoryArticles.slice(0, 3).map((article: IArticle) => (
          <div className={styles.column} key={article.id}>
            <Article article={article} />
          </div>
        ))}
      </div>
    </div>
  );
}
