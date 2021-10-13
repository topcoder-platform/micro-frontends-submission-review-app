import React from "react";
import PropTypes from "prop-types";
import styles from "./ChallengeDetails.module.scss";
import Header from "../Header";
import MyInfo from "../MyInfo";
import ReviewPhase from "../ReviewPhase";
import Prize from "../Prize";
import Role from "../Role";
import Submissions from "../Submissions";
import MyDeliverables from "../MyDeliverables";

const ChallengeDetails = ({
  challengeDetails,
  resources,
  resourceRoles,
  challengeSubmissions,
}) => {
  const { name, track, currentPhase, prizeSets } = challengeDetails;
  const { roles } = resources;

  return (
    <div className={styles.challengeDetails}>
      <Header name={name} track={track} />
      <div className={styles.infoContainer}>
        <MyInfo roles={roles} resourceRoles={resourceRoles} />
        <ReviewPhase currentPhase={currentPhase} />
        <Prize prizeSets={prizeSets} />
      </div>
      <div className={styles.hr} />
      <Role resourceRoles={resourceRoles} resources={resources} />
      <Submissions challengeSubmissions={challengeSubmissions} />
      <MyDeliverables />
    </div>
  );
};

ChallengeDetails.defaultProps = {
  challengeDetails: {},
  resources: [],
  resourceRoles: [],
  challengeSubmissions: [],
};

ChallengeDetails.propTypes = {
  challengeDetails: PropTypes.shape(),
  resources: PropTypes.arrayOf(PropTypes.shape()),
  resourceRoles: PropTypes.arrayOf(PropTypes.shape()),
  challengeSubmissions: PropTypes.arrayOf(PropTypes.shape()),
};

export default ChallengeDetails;
