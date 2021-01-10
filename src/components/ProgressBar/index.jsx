/**
 * ProgressBar
 *
 * Shows Progress Bar.
 */
import React from "react";
import PT from "prop-types";
import Check from "../../assets/images/check.svg";
import "./styles.module.scss";
import _ from "lodash";

const ProgressBar = ({ phases, currentPhases }) => {
  /**
   * Calculates the percentage progress of the progress bar
   * @param {*} phases
   * @param {*} currentPhases
   * @returns {number} progressPercent
   */
  const generateProgressPercentage = (phases, currentPhases) => {
    const percentagePerPhase = 100 / (phases.length - 1);
    let progressPercent = 0;
    _.forEach(phases, (phase, index) => {
      if (index === 0) {
        // The first phase need not contribute to percentage on the progress bar
        return; // to make forEach continue
      }
      if (phase.scheduledEndDate < new Date()) {
        // if a phase has already passed add its entire percentage to the progress bar
        progressPercent += percentagePerPhase;
        return; // to make forEach continue
      } else if (_.includes(currentPhases, phase.name)) {
        progressPercent +=
          ((new Date() - new Date(phase.scheduledStartDate)) /
            (phase.duration * 1000)) *
          percentagePerPhase;
      }
    });
    return progressPercent;
  };

  /**
   * Generate progress data from challenge phases data
   * @param {Object} phases
   * @param {Object} currentPhases
   * @returns {Object} progress
   */
  const generateProgress = (phases, currentPhases) => {
    const progressBar = _.map(phases, (phase, index) => {
      return {
        name: phase.name,
        deadline: new Intl.DateTimeFormat("Default", {
          month: "short",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(phase.scheduledEndDate)),
        completed: new Date(phase.scheduledEndDate) < new Date() || index === 0, // mark phase completed if date passed or registration phase
      };
    });
    const currentPhase = _.last(currentPhases); // takes the current phase, If both Register and Submission are present take Submission
    const progressPercent = generateProgressPercentage(phases, currentPhases);
    const progress = {
      progressBar: progressBar,
      currentPhase: currentPhase,
      progressPercent: progressPercent,
    };
    return progress;
  };

  const progress = generateProgress(phases, currentPhases);
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
              {phase.completed && <span styleName="phase-name">{phase.name}</span>}
              {!phase.completed && <span styleName="phase-name-dull">{phase.name}</span>}

              {phase.completed && <span styleName="phase-deadline">{phase.deadline}</span>}
              {!phase.completed && <span styleName="phase-deadline-dull">{phase.deadline}</span>}
            </div>
          ))}
      </div>

      <div styleName="mobile-progress-details">
        {!!progressBar &&
          progressBar.map((phase, index) => (
            <div styleName="phase-detail" key={index}>
              <div styleName="circle-name-wrapper">
                {phase.completed ? (
                  <div styleName="phase-circle">
                    <Check />
                  </div>
                ) : (
                  <div styleName="phase-circle"></div>
                )}  
                {phase.completed && <span styleName="phase-name">{phase.name}</span>}
                {!phase.completed && <span styleName="phase-name-dull">{phase.name}</span>}
              </div>
              <div styleName="deadline-phase">
                {phase.completed && <span styleName="phase-deadline">{phase.deadline}</span>}
                {!phase.completed && <span styleName="phase-deadline-dull">{phase.deadline}</span>}
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
