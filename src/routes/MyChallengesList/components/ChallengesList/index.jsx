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

const ChallengesList = ({ challenges }) => {
  const logoStyleName = {
    Design: "logo-design",
    Development: "logo-dev",
    Data: "logo-data",
    QA: "logo-qa",
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
                  `${logoStyleName[challenge.type]}`
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
                    {challenge.title}
                  </Link>
                  <div styleName="challenge-deadline">{challenge.deadline}</div>
                </div>
                <div styleName="challenge-count">
                  <div styleName="register-count-wrapper">
                    <User styleName="user-icon" />
                    <div>{challenge.registers}</div>
                  </div>
                  <div styleName="submissions-count-wrapper">
                    <Files styleName="files-icon" />
                    <div>{challenge.submitters}</div>
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
              <div styleName="phase-value">{challenge.phase}</div>
            </div>

            <div styleName="mobile-challenge-logo">
              <span
                styleName={cn(
                  "challenge-logo",
                  `${logoStyleName[challenge.type]}`
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
                  {challenge.title}
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
                  <div styleName="phase-value">{challenge.phase}</div>
                </div>
              </div>

              <div styleName="mobile-stats-wrapper">
                <div styleName="register-count-wrapper">
                  <UserMobile styleName="user-icon" />
                  <div>{challenge.registers}</div>
                </div>
                <div styleName="submissions-count-wrapper">
                  <Files styleName="files-icon" />
                  <div>{challenge.submitters}</div>
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
  challenges: PT.object,
};

export default ChallengesList;
