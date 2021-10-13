/**
 * Container to render My Challenges page
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MyChallengesComponent from "../../components/MyChallengesComponent";
import { loadChallenges } from "../../actions/challenges";
import {
  loadChallengeResources,
  loadResourceRoles,
} from "../../actions/resources";

const MyChallenges = (props) => {
  useEffect(() => {
    props.loadChallenges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.auth]);

  const { challenges, isLoading } = props;

  return (
    <MyChallengesComponent challenges={challenges} isLoading={isLoading} />
  );
};

MyChallenges.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  loadChallenges: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ challenges, resources, auth }) => ({
  ...challenges,
  resources,
  auth,
});

const mapDispatchToProps = {
  loadChallenges,
  loadChallengeResources,
  loadResourceRoles,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyChallenges);
