/**
 * MyChallnegesList
 *
 * Page for the list of challenges.
 */
import React, { useState } from "react";
import LayoutContainer from "components/LayoutContainer";
import PageHeader from "components/PageHeader";
import ChallengesContainer from "./components/ChallengesContainer";
import { useData } from "../../hooks/useData";
import { getMyChallenges } from "../../services/challenges";
import ChallengesHeader from "components/ChallengesHeader";
import ChallengesList from "./components/ChallengesList";
import LoadingIndicator from "../../components/LoadingIndicator";

const MyChallengesList = () => {
  const [myChallenges, loadingError] = useData(getMyChallenges);
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
