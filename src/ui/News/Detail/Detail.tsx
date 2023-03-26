import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useArticles } from "../../../application/articles";
import { useBookmark } from "../../../application/bookmark";
import { useSnackbar } from "../../../application/snackbar";
import bookMarkOnSvg from "../../../assets/bookmarkon-icon@2x.svg";
import bookMarkOffSvg from "../../../assets/bookmarkoff-icon@2x.svg";
import { IArticle } from "../../../domain/article";
import { IBookmark } from "../../../domain/bookmark";
import {
  useArticlesStorage,
  useBookmarkStorage,
  useSnackbarStorage,
} from "../../../services/storageAdapter";
import { Snackbar } from "../../Snackbar";
import styles from "./Detail.module.css";

const imagePlaceholder = process.env.REACT_APP_IMAGE_PLACEHOLDER_API;

export function DetailArticle() {
  // router
  let { articleId } = useParams();

  // application
  const { findById } = useArticles();
  const { addBookmark, removeBookmark } = useBookmark();
  const { displayMsg } = useSnackbar();

  // adapter
  const { article } = useArticlesStorage();
  const { bookmark } = useBookmarkStorage();
  const { isDisplayed } = useSnackbarStorage();

  //
  //  hooks
  // ----------------------------------------------------------------------
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (articleId) fetchDataByArticleId(articleId);
  }, [articleId]);

  //
  //  function
  // ----------------------------------------------------------------------
  async function fetchData() {
    const obj: any = JSON.parse(localStorage.getItem("bookmark") ?? "");
    if (bookmark?.articles?.length === 0) setItem(obj);
    else setItem(bookmark);
  }

  async function fetchDataByArticleId(articleId: string) {
    await findById(articleId);
  }

  async function addToBookmark(bookmark: IBookmark, article: IArticle) {
    await addBookmark(item, article);
    await displayMsg("SAVED TO BOOKMARK");
  }

  async function remove(bookmark: IBookmark, id: string) {
    await removeBookmark(item, id);
    await displayMsg("REMOVED FROM BOOKMARK");
  }

  function savedBookmark() {
    const data: any = JSON.parse(localStorage.getItem("bookmark") ?? "");
    const found = data?.articles?.find((el: any) => el.id === articleId);
    if (found) return true;
    else return false;
  }

  return (
    <div>
      <div>
        {!savedBookmark() ? (
          <button
            className={styles.bookmark_btn}
            onClick={() => addToBookmark(bookmark, article)}
          >
            <img src={bookMarkOnSvg} alt={bookMarkOnSvg} /> ADD BOOKMARK
          </button>
        ) : (
          <button
            className={styles.bookmark_btn}
            onClick={() => remove(bookmark, article.id)}
          >
            <img src={bookMarkOffSvg} alt={bookMarkOffSvg} /> REMOVE BOOKMARK
          </button>
        )}
        <p>{article?.webPublicationDate}</p>
        <h2>{article?.webTitle}</h2>
        <h4>{article?.fields?.headline}</h4>
      </div>
      <div className={styles.row}>
        <div
          className={styles.col_50}
          dangerouslySetInnerHTML={{ __html: article?.fields?.body }}
        />
        <div className={styles.col_50}>
          <img
            className={styles.img}
            src={article?.fields?.thumbnail ?? imagePlaceholder}
            alt="img"
          />
        </div>
      </div>
      {isDisplayed && <Snackbar isSaved={savedBookmark()} />}
    </div>
  );
}
