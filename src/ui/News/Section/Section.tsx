import { useNavigate } from "react-router-dom";
import { useArticles } from "../../../application/articles";
import { useBackdrop } from "../../../application/backdrop";
import { useArticlesStorage } from "../../../services/storageAdapter";
import bookMarkOnSvg from "../../../assets/bookmarkon-icon@2x.svg";
import styles from "./Section.module.css";

type IProps = {
  name: string;
  isBookmark?: boolean;
};

const options = [
  { value: "newest", text: "Newest First" },
  { value: "oldest", text: "Oldest First" },
];

export function Section({ name, isBookmark }: IProps) {
  // router
  const navigate = useNavigate();

  // application
  const { addLoading } = useBackdrop();
  const {
    searchArticles,
    getTopArticles,
    getCategoryArticles,
    selectSortingValue,
  } = useArticles();

  // adapter
  const { searching, selected } = useArticlesStorage();

  //
  //  function
  // ----------------------------------------------------------------------
  function goToBookmark() {
    navigate("/bookmark");
  }

  async function handleChange(e: React.BaseSyntheticEvent) {
    addLoading(true);
    e.preventDefault();
    const { value } = e.target;
    const searchQuery = localStorage.getItem("search") ?? "";
    if (searching) {
      await searchArticles(searchQuery, value);
    } else {
      await getTopArticles("news", value);
      await getCategoryArticles("sport|culture|lifeandstyle", value);
    }
    await selectSortingValue(value);
    addLoading(false);
  }

  return (
    <div className={styles.row}>
      <div className={styles.col_65}>{name}</div>
      {!isBookmark ? (
        <div className={styles.col_35}>
          <button
            className={styles.bookmark_btn}
            onClick={() => goToBookmark()}
          >
            <img src={bookMarkOnSvg} /> VIEW BOOKMARK
          </button>
          <select
            className={styles.select_option}
            value={selected}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className={styles.col_35}>
          <select className={styles.select_option}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
