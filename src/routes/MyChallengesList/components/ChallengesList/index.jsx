/**
 * Challenges List
 *
 * Shows all the challenges.
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import Files from "../../../../assets/images/files.svg";
import User from "../../../../assets/images/iconregistrant.svg";
import UserMobile from "../../../../assets/images/user.svg";
import { Link } from "@reach/router";
import "./styles.module.scss";
import _ from "lodash";

const ChallengesList = ({ challenges }) => {
  const logoStyleName = {
    Design: "logo-design",
    Development: "logo-dev",
    Data: "logo-data",
    "Quality Assurance": "logo-qa",
  };

  const getCurrentPhase = (currentPhases) => {
    return _.last(currentPhases);
  };
  /**
   *
   * @param {Object} challenge
   * @returns {String} Time to deadline of Current Phase eg. '12d 5h to go'
   */
  const getChallengeDeadline = (challenge) => {
    if (challenge) {
      let currentPhase = _.find(challenge.phases, {
        name: getCurrentPhase(challenge.currentPhaseNames),
      });
      let today = new Date();
      if (currentPhase && currentPhase.scheduledEndDate) {
        let phaseDeadline = new Date(currentPhase.scheduledEndDate);
        let duration = (phaseDeadline - today) / 1000;
        let days = Math.floor(duration / 86400);
        duration = duration - days * 86400;
        let hours = Math.floor(duration / 3600);
        let dayString = days <= 0 ? "" : days + "d ";
        let hoursString = hours <= 0 ? "0h to go" : hours + "h to go";
        return dayString + hoursString;
      }
      return "";
    }
    return "";
  };

  return (
    <div styleName="challenge-list-container">
      {!!challenges &&
        challenges.map((challenge) => (
          <div key={challenge.id} styleName="challenge-list-row">
            <div styleName="challenge-title">
              <span
                styleName={cn(
                  "challenge-logo",
                  `${
                    logoStyleName[challenge.track] || logoStyleName.Development
                  }`
                )}
              >
                <div styleName="logo-upper">
                  <div>CH</div>
                </div>
                <div styleName="logo-lower">
                  <div>TCO</div>
                </div>
              </span>
              <div styleName="challenge-body">
                <div styleName="title-deadline-wrapper">
                  <Link
                    to={`/submissions/mychallenges/${challenge.id}`}
                    styleName="challenge-title"
                  >
                    {challenge.name}
                  </Link>
                  <div styleName="challenge-deadline">
                    {getChallengeDeadline(challenge)}
                  </div>
                </div>
                <div styleName="challenge-count">
                  <div styleName="register-count-wrapper">
                    <User styleName="user-icon" />
                    <div>{challenge.numOfRegistrants}</div>
                  </div>
                  <div styleName="submissions-count-wrapper">
                    <Files styleName="files-icon" />
                    <div>{challenge.numOfSubmissions}</div>
                  </div>
                </div>
              </div>
            </div>
            <div styleName="challenge-role">
              <p styleName="role-label">My Role</p>
              <div styleName="role-value">{challenge.role}</div>
            </div>
            <div styleName="challenge-phase">
              <p styleName="phase-label">Phase</p>
              <div styleName="phase-value">
                {getCurrentPhase(challenge.currentPhaseNames)}
              </div>
            </div>

            <div styleName="mobile-challenge-logo">
              <span
                styleName={cn(
                  "challenge-logo",
                  `${
                    logoStyleName[challenge.track] || logoStyleName.Development
                  }`
                )}
              >
                <div styleName="logo-upper">
                  <div>CH</div>
                </div>
                <div styleName="logo-lower">
                  <div>TCO</div>
                </div>
              </span>
            </div>

            <div styleName="mobile-challenge-body">
              <div styleName="mobile-challenge-title">
                <Link
                  to={`/submissions/mychallenges/${challenge.id}`}
                  styleName="mobile-challenge-title-text"
                >
                  {challenge.name}
                </Link>
                <div styleName="challenge-deadline">{challenge.deadline}</div>
              </div>

              <div styleName="mobile-role-phase-wrapper">
                <div styleName="challenge-role">
                  <div styleName="role-label">My Role</div>
                  <div styleName="role-value">{challenge.role}</div>
                </div>
                <div styleName="challenge-phase">
                  <div styleName="phase-label">Phase</div>
                  <div styleName="phase-value">
                    {getCurrentPhase(challenge.currentPhaseNames)}
                  </div>
                </div>
              </div>

              <div styleName="mobile-stats-wrapper">
                <div styleName="register-count-wrapper">
                  <UserMobile styleName="user-icon" />
                  <div>{challenge.numOfRegistrants}</div>
                </div>
                <div styleName="submissions-count-wrapper">
                  <Files styleName="files-icon" />
                  <div>{challenge.numOfSubmissions}</div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div styleName="bottom-challenge-message">
        Don't see a challenge you're looking for? It will appear once you upload
        a submission
      </div>
    </div>
  );
};

ChallengesList.propTypes = {
  challenges: PT.array,
};

export default ChallengesList;
