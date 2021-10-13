/**
 * Component to render a row for ChallengeList component
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import "moment-duration-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faUser } from "@fortawesome/free-solid-svg-icons";

import TrackIcon from "../../TrackIcon";
import styles from "./ChallengeCard.module.scss";
import { getFormattedDuration, getLastDate } from "../../../util/date";

const STALLED_MSG = "Stalled";
const DRAFT_MSG = "In Draft";
const STALLED_TIME_LEFT_MSG = "Challenge is currently on hold";
const FF_TIME_LEFT_MSG = "Winner is working on fixes";

const getEndDate = (c) => {
  let { phases } = c;
  if (c.type === "First2Finish" && c.status === "Completed") {
    phases = phases.filter((p) => p.name === "Iterative Review" && !p.isOpen);
  }
  const endPhaseDate = getLastDate(
    phases.map((d) => new Date(d.scheduledEndDate))
  );
  return moment(endPhaseDate).format("MMM DD");
};

/**
 * Format the remaining time of a challenge phase
 * @param phase Challenge phase
 * @returns {*}
 */
const getTimeLeft = (phase) => {
  if (!phase) return STALLED_TIME_LEFT_MSG;
  if (phase.name === "Final Fix") {
    return FF_TIME_LEFT_MSG;
  }

  let time = moment(phase.scheduledEndDate).diff();
  const late = time < 0;
  if (late) time = -time;
  const duration = getFormattedDuration(time);
  return late ? `Late by ${duration}` : `${duration} to go`;
};

/**
 * Find current phase and remaining time of it
 * @param c Challenge
 * @returns {{phaseMessage: string, endTime: {late, text}}}
 */
const getPhaseInfo = (c) => {
  const { phases, legacy, status } = c;
  const { subTrack } = legacy;
  let statusPhase = phases
    .filter((p) => p.name !== "Registration")
    .sort((a, b) => moment(a.scheduledEndDate).diff(b.scheduledEndDate))[0];

  if (!statusPhase && subTrack === "FIRST_2_FINISH" && phases.length) {
    try {
      statusPhase = Object.clone(phases[0]);
      statusPhase.name = "Submission";
    } catch (e) {}
  }
  let phaseMessage = STALLED_MSG;
  if (statusPhase) phaseMessage = statusPhase.name;
  else if (status === "Draft") phaseMessage = DRAFT_MSG;

  const endTime = getTimeLeft(statusPhase);
  return { phaseMessage, endTime };
};

const ChallengeCard = ({ challenge }) => {
  const { phaseMessage, endTime } = getPhaseInfo(challenge);
  return (
    <Link to={`submission-review/challenges/${challenge.id}`}>
      <div className={styles.item}>
        <div className={styles.col1}>
          <div>
            <TrackIcon
              className={styles.icon}
              track={challenge.track}
              type={challenge.type}
            />
          </div>
          <div className={styles.name}>
            <span className={styles.block}>{challenge.name}</span>
            <span className="block light-text">
              Ends {getEndDate(challenge)}
            </span>
          </div>
        </div>
        <div className={styles.col3}>
          <span className={styles.block}>{phaseMessage}</span>
          <span className="block light-text">{endTime}</span>
        </div>
        <div className={styles.col4}>
          <div className={styles.faIconContainer}>
            <FontAwesomeIcon icon={faUser} className={styles.faIcon} />
            <span>{challenge.numOfRegistrants}</span>
          </div>
          <div className={styles.faIconContainer}>
            <FontAwesomeIcon icon={faFile} className={styles.faIcon} />
            <span>{challenge.numOfSubmissions}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

ChallengeCard.propTypes = {
  challenge: PropTypes.object,
};

export default withRouter(ChallengeCard);
