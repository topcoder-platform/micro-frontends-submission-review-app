import _ from "lodash";
import React from "react";
import styles from "./Role.module.scss";
import PropTypes from "prop-types";
import { DEFAULT_ROLE } from "../../config/constants";

const Role = ({ resourceRoles, resources }) => {
  const roleName = DEFAULT_ROLE;
  const { roles } = resources;
  const role = _.find(resourceRoles, { name: roleName });

  const user = _.find(roles, { roleId: role.id });

  return (
    <div className={styles.roleContainer}>
      <span className={styles.role}>{roleName} :</span>
      <span className={styles.handle}>{user?.memberHandle}</span>
    </div>
  );
};

Role.defaultProps = {
  resources: [],
  resourceRoles: [],
};

Role.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape()),
  resourceRoles: PropTypes.arrayOf(PropTypes.shape()),
};

export default Role;
