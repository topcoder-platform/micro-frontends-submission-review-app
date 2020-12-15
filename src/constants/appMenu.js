import challengeListIcon from "../assets/images/challenge-list.svg";
import challengeListActiveIcon from "../assets/images/challenge-list-green.svg";
import challengeDetailsIcon from "../assets/images/challenge-details.svg";
import challengeDetailsActiveIcon from "../assets/images/challenge-details-green.svg";

const appMenu = [
  {
    title: "My Challenges List",
    path: "/submissions",
    icon: challengeListIcon,
    activeIcon: challengeListActiveIcon,
  },
  {
    title: "Challenge Details",
    path: "/submissions/mychallenges",
    icon: challengeDetailsIcon,
    activeIcon: challengeDetailsActiveIcon,
  }
];

export default appMenu;
