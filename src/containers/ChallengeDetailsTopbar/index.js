/**
 * Container to provide user info to TopBar component
 */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import ChallengeDetailsTopbar from "../../components/ChallengeDetailsTopbar";
import { findRoleName } from "../../util/resources";

const ChallengeDetailsTopbarContainer = ({ resources }) => {
  const [role, setRole] = useState("");
  const [roleLoaded, setRoleLoaded] = useState(false);

  useEffect(() => {
    if (
      resources?.resourceRoles.length &&
      resources?.roles.length &&
      !roleLoaded
    ) {
      const { roleId } = resources.roles[0];
      const roleName = findRoleName(roleId, resources.resourceRoles);

      if (roleName) {
        setRole(roleName);
        setRoleLoaded(true);
      }
    } else {
      setRole("");
      setRoleLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  return <ChallengeDetailsTopbar role={role} />;
};

ChallengeDetailsTopbarContainer.propTypes = {
  resources: PropTypes.object.isRequired,
};

const mapStateToProps = ({ resources }) => ({
  resources,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeDetailsTopbarContainer);
