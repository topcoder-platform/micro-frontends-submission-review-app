import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import styles from "./Prize.module.scss";
import PrizeIcon from "assets/icons/prize.svg";
import { getOrdinal } from "../../util/date";

const Prize = ({ prizeSets }) => {
  const placementPrizes = _.find(prizeSets, { type: "placement" });
  const { prizes } = placementPrizes;

  const renderPrizes = prizes.map((prize, index) => (
    <div className={styles.placement}>
      {!index && <PrizeIcon />}
      <div className={styles.prizeContainer}>
        <span className={styles.prize}>${prize.value}</span>
        <span className={styles.ordinal}>{getOrdinal(index + 1)}</span>
      </div>
    </div>
  ));

  return (
    <div className={styles.prizes}>
      <h3 className={styles.title}>CONTEST PRIZE</h3>
      <div className={styles.container}>{renderPrizes}</div>
      <p className={styles.checkpoint}>5 checkpoint prizes $100 each*</p>
    </div>
  );
};

Prize.defaultProps = {
  prizeSets: [],
};

Prize.propTypes = {
  prizeSets: PropTypes.arrayOf(PropTypes.shape()),
};

export default Prize;
