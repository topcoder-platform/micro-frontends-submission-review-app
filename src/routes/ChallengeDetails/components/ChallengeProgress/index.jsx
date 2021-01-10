/**
 * Challenge Progress
 *
 * Shows Progress the challenge.
 */
import React from "react";
import ProgressBar from "../../../../components/ProgressBar";
import PT from "prop-types";
import "./styles.module.scss";
import config from "../../../../../config";
import _ from "lodash";

const ChallengeProgress = ({
  phases,
  currentPhases,
  prizeSets,
  registers,
  submitters,
  challengeId,
}) => {
  const purseBackgroundColors = ["#fce217", "#d1d0cf", "#da8f64"];

  /**
   * Generate purse of prizes from challenge prizeSets data.
   * @param {Array} prizeSets
   * @returns {Object} purse
   */
  const generatePurse = (prizeSets) => {
    const prizes = _.find(prizeSets, { type: "placement" }).prizes;
    const positionSuffixes = ["st", "nd", "rd", "th"];
    return _.map(prizes, (prize, i) => {
      return {
        position:
          i + 1 < 3 ? i + 1 + positionSuffixes[i] : i + 1 + positionSuffixes[3],
        money: (prize.type != "USD" ? prize.type : "$") + " " + prize.value,
      };
    });
  };

  /**
   * @param {String} challengeId
   * @returns {String} challengeURL
   */
  const getChallengeUrl = (challengeId) => {
    return `${config.TOPCODER_COMMUNITY_WEBSITE_URL}/challenges/${challengeId}`;
  };

  const purse = generatePurse(prizeSets);

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
        <ProgressBar phases={phases} currentPhases={currentPhases} />
        <div styleName="view-challenge-wrapper">
          <a
            styleName="view-challenge"
            href={getChallengeUrl(challengeId)}
            target="_blank"
          >
            <button styleName="view-challenge">VIEW CHALLENGE</button>
          </a>
        </div>
      </div>
    </div>
  );
};

ChallengeProgress.propTypes = {
  phases: PT.array,
  currentPhases: PT.array,
  prizeSets: PT.array,
  registers: PT.number,
  submitters: PT.number,
  challengeId: PT.string,
};

export default ChallengeProgress;
