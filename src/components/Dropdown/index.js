import React from "react";
import styles from "./Dropdown.module.scss";

import DocumentIcon from "assets/icons/document.svg";
import ArrowDown from "assets/icons/arrow-down-blue.svg";

const Dropdown = () => {
  return (
    <div className={styles.dropdown}>
      <div>
        <DocumentIcon className={styles.documentIcon} />
        <span className={styles.title}>View project details</span>
        <ArrowDown className={styles.arrowIcon} />
      </div>
    </div>
  );
};

export default Dropdown;
