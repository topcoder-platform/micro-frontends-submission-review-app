/**
 * Component to render My Challenges page
 */
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import ChallengeList from "./ChallengeList";
import PageHeader from "../PageHeader";
import styles from "./MyChallengesComponent.module.scss";
import Loader from "../Loader";

const PAGE_TITLE = "My Challenges";
const MyChallengesComponent = ({ challenges, isLoading }) => {
  return (
    <div>
      <Helmet title={PAGE_TITLE} />
      <PageHeader title="My Challenges" />
      <div className={styles.challenges}>
        {isLoading ? <Loader /> : <ChallengeList challenges={challenges} />}
      </div>
    </div>
  );
};

MyChallengesComponent.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

MyChallengesComponent.defaultProps = {
  challenges: [],
  resources: {},
  isLoading: true,
};

export default MyChallengesComponent;
