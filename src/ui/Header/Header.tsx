import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticles } from "../../application/articles";
import { useBackdrop } from "../../application/backdrop";
import logoWhitePng from "../../assets/Logo_White.png";
import searchIconSvg from "../../assets/search-icon@2x.svg";
import styles from "./Header.module.css";

export function Header() {
  // router
  const navigate = useNavigate();

  // application
  const { searchArticles, goHome } = useArticles();
  const { addLoading } = useBackdrop();

  // function
  async function handleSubmit(e: React.BaseSyntheticEvent) {
    addLoading(true);
    e.preventDefault();
    await searchArticles(e.target.value, "newest");
    localStorage.setItem("search", e.target.value);
    addLoading(false);
  }

  async function goToHome(e: React.SyntheticEvent) {
    e.preventDefault();
    await goHome();
    navigate("/");
  }

  return (
    <div className={styles.header}>
      <img
        className={styles.logo_png}
        src={logoWhitePng}
        alt="logo"
        onClick={(e) => goToHome(e)}
      />
      <div className={styles.search_box}>
        <input
          className={styles.search_input}
          type="text"
          name="search"
          placeholder="Search all news"
          onChange={(e) => handleSubmit(e)}
        />
        <img
          className={styles.search_icon}
          src={searchIconSvg}
          alt={searchIconSvg}
        />
      </div>
    </div>
  );
}
