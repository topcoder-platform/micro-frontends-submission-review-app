/**
 * Challenge Progress
 *
 * Shows Progress the challenge.
 */
import React from "react";
import ProgressBar from "../../../../components/ProgressBar";
import PT from "prop-types";
import "./styles.module.scss";

const ChallengeProgress = ({ progress, purse, registers, submitters }) => {
  const purseBackgroundColors = ["#fce217", "#d1d0cf", "#da8f64"];

  return (
    <div styleName="challenge-progress-container">
      <div styleName="purse-stats-wrapper">
        <div styleName="purse-wrapper">
          {purse &&
            purse.map((rank, index) => (
              <div
                key={index}
                styleName="purse-value"
                style={{ borderColor: purseBackgroundColors[index] }}
              >
                <span styleName="purse-rank">{rank.position}</span>
                <span styleName="purse-money">{rank.money}</span>
              </div>
            ))}
        </div>
        <div styleName="stats-wrapper">
          <span>{registers} Registrants</span>
          <span>{submitters} Submissions</span>
        </div>
      </div>
      <div styleName="progress-view-wrapper">
        <ProgressBar progress={progress} />
        <div styleName="view-challenge-wrapper">
          <button styleName="view-challenge">VIEW CHALLENGE</button>
        </div>
      </div>
    </div>
  );
};

ChallengeProgress.propTypes = {
  progress: PT.object,
  purse: PT.array,
  registers: PT.number,
  submitters: PT.number,
};

export default ChallengeProgress;
