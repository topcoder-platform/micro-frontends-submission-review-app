/**
 * Container to provide user info to TopBar component
 */
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import { connect } from "react-redux";
import TopBar from "../../components/TopBar";

const TopbarContainer = ({ loadUser, auth }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = auth;
  return <TopBar user={user} />;
};

TopbarContainer.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopbarContainer);
