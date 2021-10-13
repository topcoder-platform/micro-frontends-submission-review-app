/**
 * Component to render two column layout
 * Provides a sidebar column and content column
 */
import React from "react";
import PropTypes from "prop-types";

import styles from "./ChallengeDetailsLayout.module.scss";

const ChallengeDetailsLayout = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

ChallengeDetailsLayout.Sidebar = ({ children }) => (
  <aside className={styles.sidebar}>{children}</aside>
);

ChallengeDetailsLayout.Sidebar.defaultProps = {
  children: null,
};

ChallengeDetailsLayout.Sidebar.propTypes = {
  children: PropTypes.node,
};

ChallengeDetailsLayout.Content = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

ChallengeDetailsLayout.Content.defaultProps = {
  children: null,
};

ChallengeDetailsLayout.Content.propTypes = {
  children: PropTypes.node,
};

ChallengeDetailsLayout.defaultProps = {
  children: null,
};

ChallengeDetailsLayout.propTypes = {
  children: PropTypes.node,
};

export default ChallengeDetailsLayout;
