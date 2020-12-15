/**
 * ProgressBar
 *
 * Shows Progress Bar.
 */
import React from "react";
import PT from "prop-types";
import Check from "../../assets/images/check.svg";
import "./styles.module.scss";

const ProgressBar = ({ progress }) => {
  const progressBar = progress.progressBar;

  return (
    <div styleName="progress-bar-wrapper">
      <div styleName="progress-bar">
        <div
          styleName="dynamic-bar"
          style={{ width: `${progress.progressPercent}%` }}
        />

        <div
          styleName="status-detail-wrapper"
          style={{ marginLeft: `${(progress.progressPercent * 700) / 100}px` }}
        >
          <div styleName="status-detail">
            {(progress.progressPercent * 700) / 100 < 500 && (
              <div styleName="status-text">
                <span styleName="detail-header">Detail Status:</span>
                <span styleName="detail-value">{progress.currentPhase}</span>
              </div>
            )}
            {(progress.progressPercent * 700) / 100 >= 500 && (
              <div
                styleName="status-text"
                style={{ marginLeft: "-300px", marginRight: "300px" }}
              >
                <span styleName="detail-header">Detail Status:</span>
                <span styleName="detail-value">{progress.currentPhase}</span>
              </div>
            )}
            <div styleName="status-marker"></div>
          </div>
        </div>
      </div>

      <div styleName="phase-details">
        {!!progressBar &&
          progressBar.map((phase, index) => (
            <div styleName="phase" key={index}>
              {phase.completed ? (
                <div styleName="phase-circle">
                  <Check />
                </div>
              ) : (
                <div styleName="phase-circle"></div>
              )}
              <span styleName="phase-name">{phase.name}</span>
              <span styleName="phase-deadline">{phase.deadline}</span>
            </div>
          ))}
      </div>

      <div styleName="mobile-progress-details">
        {!!progressBar &&
          progressBar.map((phase, index) => (
            <div styleName="phase-detail">
              <div styleName="circle-name-wrapper">
                {phase.completed ? (
                  <div styleName="phase-circle">
                    <Check />
                  </div>
                ) : (
                  <div styleName="phase-circle"></div>
                )}
                <span styleName="phase-name">{phase.name}</span>
              </div>
              <div styleName="deadline-phase">
                <span styleName="phase-deadline">{phase.deadline}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PT.object,
};

export default ProgressBar;
