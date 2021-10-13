import React from "react";
import PropTypes from "prop-types";
import styles from "./Pill.module.scss";

const Pill = ({ track }) => {
  return <span className={styles.pill}>{track}</span>;
};

Pill.defaultProps = {
  track: "",
};

Pill.propTypes = {
  track: PropTypes.string,
};

export default Pill;
