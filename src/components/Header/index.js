import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";

import Pill from "components/Pill";
import Dropdown from "components/Dropdown";
import CodeIcon from "assets/icons/code.svg";
import { Link } from "react-router-dom";

const Header = ({ name, track }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleContainer}>
          <CodeIcon className={styles.codeIcon} />
          <span className={styles.title}>{name}</span>
          <span className={styles.version}>version 1.0</span>
        </div>
        <Pill track={track} />
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <Link to="#">Late Deliverables</Link>
          <Link to="#">Contact Managers</Link>
          <Link to="#">View Contest</Link>
          <Link to="#">Forums</Link>
        </div>
        <Dropdown />
      </div>
    </div>
  );
};

Header.defaultProps = {
  name: "",
  track: "",
};

Header.propTypes = {
  name: PropTypes.string,
  track: PropTypes.string,
};

export default Header;
