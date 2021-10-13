import _ from "lodash";
import moment from "moment-timezone";
import React from "react";
import PropTypes from "prop-types";
import StarIcon from "assets/icons/star.svg";
import styles from "./Submissions.module.scss";
import { Link } from "react-router-dom";

const Submissions = ({ challengeSubmissions }) => {
  const renderBody = challengeSubmissions.map((ch, index) => (
    <tr className={index % 2 ? styles.even : styles.odd}>
      <td className={styles.memberCol}>
        <span>
          <StarIcon className={styles.starIcon} />
          <span className={styles.blue}>{ch.memberId}</span>{" "}
          <span className={styles.dark}>({ch.createdBy})</span>
        </span>
      </td>
      <td className={styles.dark}>
        {moment(ch.created).tz("America/New_York").format("MM.DD.YYYY;HH:mm")}{" "}
        EDT
      </td>
      <td className={styles.blue}>N/A</td>
      <td className={styles.blue}>N/A</td>
      <td className={styles.blue}>N/A</td>
      <td className={styles.blue}>N/A</td>
      <td className={styles.blue}>N/A</td>
      <td className={styles.blue}>
        <Link to="#">Start Review</Link>
      </td>
    </tr>
  ));

  return (
    <table className={styles.submissions}>
      <tr className={styles.head}>
        <th className={styles.row1}>Submission ID</th>
        <th className={styles.row2}>Submitted Date</th>
        <th className={styles.row3} colspan="2">
          Reviewer 1
        </th>
        <th className={styles.row4} colspan="2">
          Reviewer 2
        </th>
        <th className={styles.row5}>Total Score</th>
        <th></th>
      </tr>
      <tr className={styles.subhead}>
        <th></th>
        <th></th>
        <th>Score</th>
        <th>Appeal</th>
        <th>Score</th>
        <th>Appeal</th>
        <th></th>
        <th></th>
      </tr>
      {renderBody}
    </table>
  );
};

Submissions.defaultProps = {
  challengeSubmissions: [],
};

Submissions.propTypes = {
  challengeSubmissions: PropTypes.arrayOf(PropTypes.shape()),
};

export default Submissions;
