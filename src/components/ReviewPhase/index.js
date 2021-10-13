import React from "react";
import PropTypes from "prop-types";
import styles from "./ReviewPhase.module.scss";
import moment from "moment-timezone";
import { DAY_MS, HOUR_MS, MINUTE_MS } from "../../config/constants";

const ReviewPhase = ({ currentPhase }) => {
  const { name, scheduledEndDate, actualStartDate } = currentPhase;

  const currentTime = moment();
  const endTime = moment(scheduledEndDate);
  let timeLeft = endTime.diff(currentTime);
  const end = moment(scheduledEndDate);
  const start = moment(actualStartDate);
  const percentage = Math.min(
    100 * (moment().diff(start) / end.diff(start)),
    100
  );
  if (timeLeft < 0) {
    timeLeft = 0;
  }

  let format;
  if (timeLeft > DAY_MS) format = "D[ days]";
  else if (timeLeft > HOUR_MS) format = "H[ hours]";
  else if (timeLeft > MINUTE_MS) format = "m[ minutes]";
  else format = "s[ seconds]";

  timeLeft = moment.duration(timeLeft).format(format);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name?.toUpperCase()} PHASE</h3>

      <p className={styles.endTime}>Ends in {timeLeft}</p>
      <div className={styles.progress}>
        <div className={styles.bar} style={{ width: `${percentage}%` }}></div>
      </div>
      {scheduledEndDate ? (
        <p className={styles.date}>
          {moment(scheduledEndDate)
            .tz("America/New_York")
            .format("MM.DD.YYYY;HH:mm")}{" "}
          EDT
        </p>
      ) : null}
    </div>
  );
};

ReviewPhase.defaultProps = {
  currentPhase: {},
};

ReviewPhase.propTypes = {
  currentPhase: PropTypes.shape(),
};

export default ReviewPhase;
