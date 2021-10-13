import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ChallengeDetailsTopbar.module.scss";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "assets/icons/arrow-left.svg";
import ArrowDownIcon from "assets/icons/arrow-down.svg";
import UserIcon from "assets/icons/user.svg";
import BellIcon from "assets/icons/bell.svg";

const TopBar = ({ role }) => {
  return (
    <div className={styles.topbar}>
      <>
        <div className={styles.backArrow}>
          <Link to="/submission-review">
            <ArrowLeftIcon className={styles.backIcon} />
            <span className={styles.backText}>Back</span>
          </Link>
        </div>

        <div className={styles.title}>
          <span>Online Review</span>
        </div>

        <div className={styles.rightContent}>
          <div>
            <Link to="#">
              <BellIcon className={styles.bellIcon} />
            </Link>
            <Link to="#">
              <UserIcon className={styles.userIcon} />
            </Link>
            <span className={styles.role}>{role}</span>
            <ArrowDownIcon className={styles.downIcon} />
          </div>
        </div>
      </>
    </div>
  );
};

TopBar.defaultProps = {
  role: "",
};

TopBar.propTypes = {
  role: PropTypes.string,
};

export default TopBar;
