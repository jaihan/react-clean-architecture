import { useNavigate } from "react-router-dom";
import { IArticle } from "../../domain/article";

import styles from "./Article.module.css";

type ArticleProps = {
  article: IArticle;
};

const imagePlaceholder = process.env.REACT_APP_IMAGE_PLACEHOLDER_API;

export function Article({ article }: ArticleProps) {
  // router
  const navigate = useNavigate();

  //
  //  function
  // ----------------------------------------------------------------------
  function goToDetail(id: string) {
    navigate(`/article/${encodeURIComponent(id)}`);
  }

  return (
    <div className={styles.card} onClick={() => goToDetail(article.id)}>
      <img
        className={styles.card_img}
        src={article?.fields?.thumbnail ?? imagePlaceholder}
        alt={article.id}
      />
      <div className={styles.card_body}>
        <h4>{article.webTitle}</h4>
        <p dangerouslySetInnerHTML={{ __html: article?.body }} />
      </div>
    </div>
  );
}
