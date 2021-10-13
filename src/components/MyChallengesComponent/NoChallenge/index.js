/**
 * Component to render when there is no active challenge
 */
import React from "react";
import styles from "./NoChallenge.module.scss";
import cn from "classnames";
import {
  ARENA_URL,
  DATA_SCIENCE_CHALLENGES_URL,
  DESIGN_CHALLENGES_URL,
  DEVELOPMENT_CHALLENGES_URL,
} from "../../../config/constants";

const tags = [
  {
    name: "Competitive Programming",
    link: ARENA_URL,
    class: styles.orange,
  },
  {
    name: "Data Science",
    link: DATA_SCIENCE_CHALLENGES_URL,
    class: styles.orange,
  },
  {
    name: "Development",
    link: DEVELOPMENT_CHALLENGES_URL,
    class: styles.green,
  },
  {
    name: "Design",
    link: DESIGN_CHALLENGES_URL,
    class: styles.blue,
  },
];

const NoChallenge = () => {
  return (
    <div className={styles.noChallenge}>
      <p>You have no active challenges at the moment</p>
      <p>What are you interested in?</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <a
            key={tag.name}
            href={tag.link}
            className={cn(styles.tag, tag.class)}
          >
            {tag.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NoChallenge;
