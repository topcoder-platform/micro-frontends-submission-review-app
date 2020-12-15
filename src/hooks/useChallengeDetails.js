/**
 * useChallengeDetails hook with ChallengeDetailsProvider
 *
 * `useChallengeDetails` hook can be used to get challenge details about any user by `challengeId`.
 * `ChallengeDetailsProvider` is need to cache challenge details for already loaded challenges so we don't have to load data for the same challenge twice.
 */
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
// import { getMembersDetailsByIds } from "../services/members";

const ChallengeDetailsContext = createContext({});
const loadingChallenges = {};

/**
 * Hook which returns details of challenges provided by the value of challengeId.
 *
 * @param {number[]} challengeIds challenge ids
 *
 * @return {Object} object that has [challengeId] as keys and challenge details as values.
 */
export function useChallengeDetails(challengeIds) {
  const { challenges, setChallenges } = useContext(ChallengeDetailsContext);

  // when requested `challengeId` or already loaded `challenges` are changed
  // find which challenges are already loaded, and which we have to load
  const [foundChallenges, challengeIdsToLoad] = useMemo(() => {
    const found = {};
    const toLoad = [];
    challengeIds.forEach((challengeId) => {
      if (typeof challenges[challengeId] !== "undefined") {
        found[challengeId] = challenges[challengeId];
      } else if (!loadingChallenges[challengeId]) {
        toLoad.push(challengeId);
      }
    });
    return [found, toLoad];
  }, [challengeIds, challenges]);

  // if there are any users has to be loaded, then start loading them
  useEffect(() => {
    if (challengeIdsToLoad.length > 0) {
      // mark users which are being loaded
      challengeIdsToLoad.forEach((loadingUserId) => {
        loadingChallenges[loadingUserId] = true;
      });

      //   getMembersDetailsByIds(userIdsToLoad).then((members) => {
      //     const newUsers = { ...users };
      //     members.forEach((member) => {
      //       newUsers[member.userId] = member;
      //       delete loadingUsers[member.userId];
      //     });
      //     setUsers(newUsers);
      //   });
    }
  }, [challengeIdsToLoad, challenges, setChallenges]);

  return foundChallenges;
}

/**
 * Provides a place where we catch loaded user details.
 */
export const ChallengeDetailsProvider = ({ children }) => {
  const [challenges, setChallenges] = useState({});
  return (
    <ChallengeDetailsContext.Provider value={{ challenges, setChallenges }}>
      {children}
    </ChallengeDetailsContext.Provider>
  );
};
