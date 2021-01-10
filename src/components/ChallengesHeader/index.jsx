/**
 * CardHeader
 *
 * Shows title in a standard rounded-corner cards.
 * Also, can show something right to the title (aside).
 */
import React from "react";
import DownArrow from "../../assets/images/tick-down-green.svg";
import PT from "prop-types";
import "./styles.module.scss";

const ChallengesHeader = ({ title, onChangeFilter }) => {
  return (
    <header styleName="card-header">
      <h2 styleName="title">{title}</h2>
      <div styleName="filter-dropdowns">
        <fieldset styleName="filter-dropdown">
          <legend styleName="dropdown-legend">My Roles</legend>
          <div styleName="dropdown-select-div">
            <select styleName="dropdown-select" onChange={onChangeFilter}>
              <option value=""> All </option>
              <option value="Submitter"> Submitter </option>
              <option value="Copilot"> Copilot </option>
              <option value="Reviewer"> Reviewer </option>
            </select>
            <DownArrow styleName="down-arrow" />
          </div>
        </fieldset>
        <div styleName="dropdowns-separator" />
        <fieldset styleName="filter-dropdown">
          <legend styleName="dropdown-legend">Sort By</legend>
          <div styleName="dropdown-select-div">
            <select styleName="dropdown-select">
              <option>Current Phase</option>
            </select>
            <DownArrow styleName="down-arrow" />
          </div>
        </fieldset>
        <div styleName="mobile-filter-dropdown">
          <div styleName="mobile-dropdown-label">My Roles:</div>
          <div styleName="mobile-dropdown-wrapper">
            <select
              styleName="mobile-dropdown-select"
              onChange={onChangeFilter}
            >
              <option value=""> All </option>
              <option value="Submitter"> Submitter </option>
              <option value="Copilot"> Co-Pilot </option>
            </select>
            <DownArrow styleName="down-arrow" />
          </div>
        </div>
        <div styleName="mobile-filter-dropdown">
          <div styleName="mobile-dropdown-label">Sort By:</div>
          <div styleName="mobile-dropdown-wrapper">
            <select styleName="mobile-dropdown-select">
              <option>Current Phase</option>
            </select>
            <DownArrow styleName="down-arrow" />
          </div>
        </div>
      </div>
    </header>
  );
};

ChallengesHeader.propTypes = {
  title: PT.string,
  onChangeFilter: PT.func,
};

export default ChallengesHeader;
