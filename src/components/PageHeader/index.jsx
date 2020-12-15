/**
 * PageHeader
 *
 * Shows page header with optional back arrow.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const PageHeader = ({ title, aside }) => {
  return (
    <header styleName="header">
      <div styleName="title-wrapper">
        <h1 styleName="title">{title}</h1>
        <p styleName="title-content">
          Review your submission by selecting a challenge from below
        </p>
      </div>
      {aside}
    </header>
  );
};

PageHeader.propTypes = {
  title: PT.string,
  aside: PT.node,
};

export default PageHeader;
