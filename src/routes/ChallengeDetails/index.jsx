/**
 * ChallengeDetails
 *
 * Page for the Details of Challenges.
 */
import React, { useState } from "react";
import LayoutContainer from "../../components/LayoutContainer";
import ChallengeDetailsHeader from "./components/ChallengeDetailsHeader";
import ChallengeProgress from "./components/ChallengeProgress";
import SubmissionDetails from "./components/SubmissionDetails";
import { useData } from "../../hooks/useData";
import { getChallengeById } from "../../services/challenges";
import {
  getRelevantResourceRolesMap,
  getRoles,
  getRelevantRoles,
  getMyChallengesForRelevantRoles,
} from "../../services/resources";
import { useAsync } from "react-use";
import { decodeToken } from "@topcoder-platform/tc-auth-lib";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";
import _ from "lodash";

const ChallengeDetails = ({ challengeId }) => {
  const authUserTokens = useAsync(getAuthUserTokens);
  const tokenV3 = authUserTokens.value ? authUserTokens.value.tokenV3 : null;
  const memberId = tokenV3 ? decodeToken(tokenV3).userId : null;
  const [challenge, loadingError] = useData(
    getChallengeById,
    tokenV3,
    challengeId,
    memberId
  );
  const [role, setRole] = useState("");
  const [roles, roleLoadingError] = useData(getRoles, tokenV3);
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
      if (challengeToRoleMap[challengeId]) {
        setRole(challengeToRoleMap[challengeId]);
      }
    });
  }

  return (
    <LayoutContainer>
      {!!challenge && (
        <ChallengeDetailsHeader
          title={challenge.name}
          tags={challenge.tags}
          role={role}
          backTo="/submissions"
        />
      )}
      {!!challenge && (
        <ChallengeProgress
          phases={challenge.phases}
          currentPhases={challenge.currentPhaseNames}
          prizeSets={challenge.prizeSets}
          registers={challenge.numOfRegistrants}
          submitters={challenge.numOfSubmissions}
          challengeId={challengeId}
        />
      )}
      {!!challenge && (
        <SubmissionDetails
          challengeId={challengeId}
          type={challenge.track}
          role={role}
          submissionCompleted={challenge.submissionCompleted}
          submissions={challenge.submissions}
        />
      )}
    </LayoutContainer>
  );
};

export default ChallengeDetails;
