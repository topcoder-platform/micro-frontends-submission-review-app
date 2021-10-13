/**
 * Component to render list of challenges
 */
import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styles from "./ChallengeList.module.scss";
import NoChallenge from "../NoChallenge";
import ChallengeCard from "../ChallengeCard";

const ChallengeList = ({ challenges }) => {
  if (challenges.length === 0) return <NoChallenge />;

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <div className={styles.col1}>Challenge</div>
        <div className={styles.col3}>Current phase</div>
        <div className={styles.col4}>&nbsp;</div>
      </div>
      <ul>
        {_.map(challenges, (c) => {
          return (
            <li key={`challenge-card-${c.id}`}>
              <ChallengeCard challenge={c} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
};

export default ChallengeList;
