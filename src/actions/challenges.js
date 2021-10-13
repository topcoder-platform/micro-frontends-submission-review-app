import { fetchMemberChallenges } from "../services/challenges";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import {
  LOAD_CHALLENGES_FAILURE,
  LOAD_CHALLENGES_PENDING,
  LOAD_CHALLENGES_SUCCESS,
} from "../config/constants";

/**
 * Loads active challenges of the authenticated user
 */
export function loadChallenges() {
  return async (dispatch, getState) => {
    dispatch({
      type: LOAD_CHALLENGES_PENDING,
    });

    const user = await getAuthUserProfile();

    if (user) {
      const { userId } = user;

      fetchMemberChallenges(userId)
        .then((challenges) =>
          dispatch({
            type: LOAD_CHALLENGES_SUCCESS,
            challenges,
          })
        )
        .catch(() =>
          dispatch({
            type: LOAD_CHALLENGES_FAILURE,
          })
        );
    }
  };
}
