/**
 * ChallengeDetailsHeader
 *
 * Shows page header with optional back arrow.
 */
import React from "react";
import PT from "prop-types";
import { Link } from "@reach/router";
import IconArrowLeft from "../../../../assets/images/icon-arrow-left.svg";
import "./styles.module.scss";

const ChallengeDetailsHeader = ({ title, tags, role, backTo }) => {
  return (
    <header styleName="challenge-header">
      <div styleName="title-back-wrapper">
        <Link to={backTo} styleName="back-btn">
          <IconArrowLeft styleName="back-btn-svg" />
        </Link>
        <div styleName="title-tag-wrapper">
          <h1 styleName="challenge-title">{title}</h1>
          <div styleName="tags-wrapper">
            {!!tags &&
              tags.map((tag) => (
                <div key={tag} styleName="tag-wrapper">
                  {tag}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div styleName="challenge-role">
        <div styleName="role">My role: {role}</div>
      </div>
    </header>
  );
};

ChallengeDetailsHeader.propTypes = {
  title: PT.string,
  tags: PT.array,
  role: PT.string,
  backTo: PT.string,
};

export default ChallengeDetailsHeader;
