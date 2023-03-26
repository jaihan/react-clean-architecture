import { useEffect, useState } from "react";
import { useBackdrop } from "../../../application/backdrop";
import { IArticle } from "../../../domain/article";
import { IData } from "../../../domain/respone";
import {
  useBackdropStorage,
  useBookmarkStorage,
} from "../../../services/storageAdapter";
import { Article } from "../../Article";
import { Loader } from "../../Loader";
import { Section } from "../Section";
import styles from "./Bookmark.module.css";

export function Bookmark() {
  // application
  const { addLoading } = useBackdrop();

  // adapter
  const { bookmark } = useBookmarkStorage();
  const { loading } = useBackdropStorage();

  //
  //  hooks
  // ----------------------------------------------------------------------
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    fetchData();
  }, []);

  //
  //  function
  // ----------------------------------------------------------------------
  async function fetchData() {
    addLoading(true);
    const data: IData = JSON.parse(localStorage.getItem("bookmark") ?? "");
    if (bookmark?.articles?.length == 0) setItem(data);
    else setItem(bookmark);
    addLoading(false);
  }

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader />
      </div>
    );
  return (
    <div>
      <Section name="All bookmark" isBookmark={true} />
      <div className={styles.search}>
        {item?.articles?.map((article: IArticle) => (
          <Article article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
