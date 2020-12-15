/**
 * ChallengesContainer
 *
 * Implements a container for Challenges.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const ChallengesContainer = ({ children }) => {
  return <div styleName="challenges-container">{children}</div>;
};

ChallengesContainer.propTypes = {
  children: PT.node,
};

export default ChallengesContainer;
