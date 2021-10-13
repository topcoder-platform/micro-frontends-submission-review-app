import React from "react";
import { NavLink } from "react-router-dom";
import TopcoderLogo from "assets/images/topcoder-logo.png";
import styles from "./ChallengeDetailsSidebar.module.scss";

import UserIcon from "assets/icons/user.svg";
import ListIcon from "assets/icons/list.svg";
import DraftsIcon from "assets/icons/drafts.svg";
import CalendarIcon from "assets/icons/calendar.svg";

const links = [
  {
    icon: <UserIcon />,
    name: "My Challenges",
    to: "/submission-review",
  },
  {
    icon: <ListIcon />,
    name: "All Challenges",
    to: "/submission-review",
  },
  {
    icon: <DraftsIcon />,
    name: "Drafts",
    to: "/submission-review",
  },
  {
    icon: <CalendarIcon />,
    name: "Late Deliverables",
    to: "/submission-review",
  },
];

const ChallengeDetailsSidebar = () => {
  const linkComponents = links.map((l) => (
    <NavLink
      className={styles.item}
      activeClassName={styles.active}
      key={l.name}
      to={l.to}
      exact
    >
      {l.icon}
      <span>{l.name}</span>
    </NavLink>
  ));

  return (
    <div className={styles.sidebar}>
      <img src={TopcoderLogo} alt="Topcoder Logo" className={styles.logo} />
      <div className={styles.links}>{linkComponents}</div>
    </div>
  );
};

export default ChallengeDetailsSidebar;
