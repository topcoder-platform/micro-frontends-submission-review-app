import React from "react";
import PropTypes from "prop-types";
import styles from "./MyInfo.module.scss";
import { findRoleName } from "../../util/resources";

const MyInfo = ({ roles, resourceRoles }) => {
  const tableContents = roles.map((role) => {
    const { roleId } = role;
    const roleName = findRoleName(roleId, resourceRoles);
    return (
      <tr className={styles.content}>
        <td width="149px">{roleName}</td>
        <td width="100px"></td>
        <td></td>
      </tr>
    );
  });

  return (
    <div className={styles.myInfo}>
      <h3 className={styles.title}>MY INFO</h3>
      <table className={styles.table}>
        <tr className={styles.header}>
          <th>Role</th>
          <th>Payment</th>
          <th>Payment Status</th>
        </tr>
        {tableContents}
        <tr className={styles.footer}>
          <td>Total</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

MyInfo.defaultProps = {
  roles: [],
  resourceRoles: [],
};

MyInfo.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape()),
  resourceRoles: PropTypes.arrayOf(PropTypes.shape()),
};

export default MyInfo;
