import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSnackbarStorage } from "../../services/storageAdapter";
import styles from "./Snackbar.module.css";

type IProps = {
  isSaved?: boolean;
};

export function Snackbar({ isSaved }: IProps) {
  const { msg } = useSnackbarStorage();

  return ReactDOM.createPortal(
    <div
      className={
        isSaved
          ? styles.add_snackbar_container
          : styles.remove_snackbar_container
      }
    >
      <div className={styles.snackbar_label}>{msg}</div>
    </div>,
    document.getElementById("snackbar__root")!
  );
}
