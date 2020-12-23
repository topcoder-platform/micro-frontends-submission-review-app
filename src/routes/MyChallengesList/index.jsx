/**
 * MyChallnegesList
 *
 * Page for the list of challenges.
 */
import React, { useState } from "react";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import ChallengesContainer from "./components/ChallengesContainer";
import { useData } from "../../hooks/useData";
import { getMyChallenges } from "../../services/challenges";
import ChallengesHeader from "../../components/ChallengesHeader";
import ChallengesList from "./components/ChallengesList";
import LoadingIndicator from "../../components/LoadingIndicator";
import challengesJson from "../../../local/mock-server/data/challenges.json";

const MyChallengesList = () => {

  // Uncomment this whenever APIs are ready or whenever you want to use Mock Server, for now static jsons are loaded
  // const [myChallenges, loadingError] = useData(getMyChallenges);
  const [myChallenges, loadingError] = [challengesJson, ''];
  const [filterRole, setFilterRole] = useState("");

  const changeFilterRoleHandler = (event) => {
    if (!!event.target.value) {
      setFilterRole(event.target.value);
    } else {
      setFilterRole("");
    }
  };

  return (
    <LayoutContainer>
      <PageHeader title="My Challenges" />
      <ChallengesContainer>
        <ChallengesHeader
          title="Challenge Title"
          onChangeFilter={changeFilterRoleHandler}
        />
        {!myChallenges && (
          <LoadingIndicator error={loadingError && loadingError.toString()} />
        )}
        {myChallenges && filterRole === "" && (
          <ChallengesList challenges={myChallenges.challenges} />
        )}
        {myChallenges && filterRole !== "" && (
          <ChallengesList
            challenges={myChallenges.challenges.filter(
              (x) => x["role"] === filterRole
            )}
          />
        )}
      </ChallengesContainer>
    </LayoutContainer>
  );
};

export default MyChallengesList;
