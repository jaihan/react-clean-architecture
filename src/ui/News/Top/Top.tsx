import { useNavigate } from "react-router-dom";
import { useArticlesStorage } from "../../../services/storageAdapter";
import { Article } from "../../Article";
import styles from "./Top.module.css";

const imagePlaceholder = process.env.REACT_APP_IMAGE_PLACEHOLDER_API;

export function TopArticle() {
  // router
  const navigate = useNavigate();

  // adapter
  const { topArticles } = useArticlesStorage();

  //
  //  function
  // ----------------------------------------------------------------------
  function goToDetail(id: string) {
    navigate(`/article/${encodeURIComponent(id)}`);
  }

  return (
    <div>
      <div className={styles.row}>
        {topArticles.slice(0, 1).map((obj: any) => {
          return (
            <div className={styles.col_50} onClick={() => goToDetail(obj.id)}>
              <div className={styles.card}>
                <img
                  className={styles.card_image}
                  src={obj?.fields?.thumbnail ?? imagePlaceholder}
                  alt={obj.id}
                />
                <div className={styles.card_body}>
                  <h4>{obj.webTitle}</h4>
                  <p dangerouslySetInnerHTML={{ __html: obj.body }} />
                </div>
              </div>
            </div>
          );
        })}

        <div className={styles.col_25}>
          {topArticles.slice(1, 2).map((obj: any) => {
            return (
              <div className={styles.card} onClick={() => goToDetail(obj.id)}>
                <img
                  className={styles.card_image}
                  src={obj?.fields?.thumbnail ?? imagePlaceholder}
                  alt={obj.id}
                />
                <div className={styles.card_body}>
                  <h4>{obj.webTitle}</h4>
                  <p dangerouslySetInnerHTML={{ __html: obj.body }} />
                </div>
              </div>
            );
          })}

          {topArticles.slice(3, 4).map((obj: any) => {
            return (
              <div className={styles.card} onClick={() => goToDetail(obj.id)}>
                <div className={styles.card_body}>
                  <h4>{obj.webTitle}</h4>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.col_25}>
          {topArticles.slice(2, 3).map((obj: any) => {
            return (
              <div className={styles.card} onClick={() => goToDetail(obj.id)}>
                <img
                  className={styles.card_image}
                  src={obj?.fields?.thumbnail ?? imagePlaceholder}
                  alt={obj.id}
                />
                <div className={styles.card_body}>
                  <h4>{obj.webTitle}</h4>
                  <p dangerouslySetInnerHTML={{ __html: obj.body }} />
                </div>
              </div>
            );
          })}
          {topArticles.slice(5, 6).map((obj: any) => {
            return (
              <div className={styles.card} onClick={() => goToDetail(obj.id)}>
                <div className={styles.card_body}>
                  <h4>{obj.webTitle}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.row}>
        {topArticles.slice(6, 9).map((obj: any) => {
          return (
            <div className={styles.column} key={obj.id}>
              <Article article={obj} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
