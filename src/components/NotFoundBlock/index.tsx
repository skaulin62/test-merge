import React from "react";
import styles from "./NotFound.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={styles.notFoundBlock}>
      <span>😥</span>
      <h2>Ничего не найдено!</h2>
      <p>К сожалению страница не найдена</p>
    </div>
  );
}
