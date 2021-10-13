/**
 * Component to render an icon for a track, subTrack pair
 * Uses './Abbreviation.js' for choosing an abbreviation for a subTrack
 */
import React from "react";
import PropTypes from "prop-types";
import Abbreviation from "./Abbreviation";
import cn from "classnames";
import styles from "./TrackIcon.module.scss";
import { MARATHON_MATCH_SUBTRACKS } from "../../config/constants";

const TrackIcon = ({ track, type, className }) => {
  const styleTrack = MARATHON_MATCH_SUBTRACKS.includes(type)
    ? "data_science"
    : track.toLowerCase();
  return (
    <span className={cn(styles.icon, className)}>
      <div className={`${styleTrack}`}>{Abbreviation[type] || "NA"}</div>
    </span>
  );
};

TrackIcon.propTypes = {
  track: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default TrackIcon;
