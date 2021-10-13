import React, { useEffect } from "react";
import {
  loadResourceRoles,
  loadChallengeResources,
} from "../../actions/resources";
import { loadChallengeDetails } from "../../actions/challengeDetails";
import { loadChallengeSubmissions } from "../../actions/challengeSubmissions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "components/Loader";
import ChallengeDetailsComponent from "components/ChallengeDetails";

const ChallengeDetails = ({
  challengeId,
  loadResourceRoles,
  isLoading,
  loadChallengeResources,
  loadChallengeDetails,
  loadChallengeSubmissions,
  challengeDetails,
  resources,
  challengeSubmissions,
}) => {
  useEffect(() => {
    if (!resources?.resourceRoles?.length) {
      loadResourceRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (challengeId) {
      loadChallengeDetails(challengeId);
      loadChallengeResources(challengeId);
      loadChallengeSubmissions(challengeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challengeId]);

  return isLoading ? (
    <Loader />
  ) : (
    <ChallengeDetailsComponent
      challengeDetails={challengeDetails}
      resources={resources}
      resourceRoles={resources?.resourceRoles}
      challengeSubmissions={challengeSubmissions}
    />
  );
};

ChallengeDetails.defaultProps = {
  challengeDetails: {},
  resources: [],
  challengeSubmissions: [],
};

ChallengeDetails.propTypes = {
  challengeId: PropTypes.string.isRequired,
  loadResourceRoles: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadChallengeResources: PropTypes.func.isRequired,
  loadChallengeDetails: PropTypes.func.isRequired,
  loadChallengeSubmissions: PropTypes.func.isRequired,
  challengeDetails: PropTypes.shape(),
  resources: PropTypes.arrayOf(PropTypes.shape()),
  challengeSubmissions: PropTypes.arrayOf(PropTypes.shape()),
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  challengeDetails,
  challengeSubmissions,
  resources,
  auth,
}) => ({
  ...challengeDetails,
  resources,
  auth,
  challengeSubmissions: challengeSubmissions.challengeSubmissions,
});

const mapDispatchToProps = {
  loadResourceRoles,
  loadChallengeDetails,
  loadChallengeResources,
  loadChallengeSubmissions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeDetails);
