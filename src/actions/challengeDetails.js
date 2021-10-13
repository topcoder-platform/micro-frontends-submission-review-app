import _ from "lodash";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import {
  fetchChallengeDetails,
  fetchMemberChallenge,
} from "../services/challenges";
import {
  LOAD_CHALLENGE_DETAILS_FAILURE,
  LOAD_CHALLENGE_DETAILS_PENDING,
  LOAD_CHALLENGE_DETAILS_SUCCESS,
} from "../config/constants";

/**
 * Load challenge details
 * @param {String} challengeId
 */
export function loadChallengeDetails(challengeId) {
  return async (dispatch, getState) => {
    const getLoadingId = () => _.get(getState(), "challengeDetails.loadingId");

    // if it's not loading already
    if (challengeId !== getLoadingId()) {
      dispatch({
        type: LOAD_CHALLENGE_DETAILS_PENDING,
        challengeId,
      });

      const profile = await getAuthUserProfile();
      const { userId } = profile;

      try {
        const memberChallenge = await fetchMemberChallenge(userId, challengeId);
        const roles = _.get(memberChallenge, "userDetails.roles");
        const challengeDetails = await fetchChallengeDetails(challengeId);

        // prevent possible race condition
        if (challengeId === getLoadingId()) {
          dispatch({
            type: LOAD_CHALLENGE_DETAILS_SUCCESS,
            challengeDetails: {
              ...challengeDetails,
              roles,
            },
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: LOAD_CHALLENGE_DETAILS_FAILURE,
        });
      }
    }
  };
}
