/**
 * MyChallnegesList
 *
 * Page for the list of challenges.
 */
import React, { useState } from "react";
import LayoutContainer from "../../components/LayoutContainer";
import PageHeader from "../../components/PageHeader";
import ChallengesContainer from "./components/ChallengesContainer";
import ChallengesHeader from "../../components/ChallengesHeader";
import ChallengesList from "./components/ChallengesList";
import LoadingIndicator from "../../components/LoadingIndicator";
import { useData } from "../../hooks/useData";
import { getMyChallenges } from "../../services/challenges";
import {
  getRelevantResourceRolesMap,
  getRoles,
  getMyChallengesForRelevantRoles,
  getRelevantRoles,
} from "../../services/resources";
import { useAsync } from "react-use";
import { decodeToken } from "@topcoder-platform/tc-auth-lib";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";

const MyChallengesList = () => {
  const authUserTokens = useAsync(getAuthUserTokens);
  const tokenV3 = authUserTokens.value ? authUserTokens.value.tokenV3 : null;
  const memberId = tokenV3 ? decodeToken(tokenV3).userId : null;
  const [myChallenges, loadingError] = useData(
    getMyChallenges,
    tokenV3,
    memberId
  );
  const [roles, roleLoadingError] = useData(getRoles, tokenV3);
  const [loading, setLoading] = useState(true);

  const rolesMap = getRelevantResourceRolesMap(roles);

  let myChallengesByRolesPromises = [];
  if (rolesMap) {
    const relevantRoles = getRelevantRoles();
    myChallengesByRolesPromises = getMyChallengesForRelevantRoles(
      tokenV3,
      memberId,
      rolesMap
    );
    const challengeToRoleMap = {};
    Promise.all(myChallengesByRolesPromises).then((responses) => {
      _.forEach(responses, (response, index) => {
        _.forEach(response.data, (challengeId) => {
          challengeToRoleMap[challengeId] = relevantRoles[index];
        });
      });

      _.forEach(myChallenges, (challenge) => {
        challenge["role"] = challengeToRoleMap[challenge.id] || "";
      });
      myChallenges && setLoading(false);
    });
  }

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
        {(loading || !myChallenges) && (
          <LoadingIndicator error={loadingError && loadingError.toString()} />
        )}
        {!loading && myChallenges && filterRole === "" && (
          <ChallengesList challenges={myChallenges} />
        )}
        {!loading && myChallenges && filterRole !== "" && (
          <ChallengesList
            challenges={myChallenges.filter((x) => x["role"] === filterRole)}
          />
        )}
      </ChallengesContainer>
    </LayoutContainer>
  );
};

export default MyChallengesList;
