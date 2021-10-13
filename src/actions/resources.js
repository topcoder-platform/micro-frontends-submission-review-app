import { fetchChallengeRoles, fetchResourceRoles } from "../services/resources";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";

import {
  LOAD_CHALLENGE_RESOURCES_PENDING,
  LOAD_CHALLENGE_RESOURCES_SUCCESS,
  LOAD_CHALLENGE_RESOURCES_FAILURE,
  LOAD_RESOURCE_ROLES_PENDING,
  LOAD_RESOURCE_ROLES_SUCCESS,
  LOAD_RESOURCE_ROLES_FAILURE,
} from "../config/constants";

/**
 * Loads roles of current challenge
 * @param challengeId challenge id
 */
export function loadChallengeResources(challengeId) {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_CHALLENGE_RESOURCES_PENDING,
    });

    getAuthUserProfile().then((profile) => {
      const { userId } = profile;

      fetchChallengeRoles(challengeId, userId)
        .then((results) => {
          let roles = [];
          for (let result of results) {
            roles = roles.concat(result);
          }

          dispatch({
            type: LOAD_CHALLENGE_RESOURCES_SUCCESS,
            roles,
          });
        })
        .catch(() =>
          dispatch({
            type: LOAD_CHALLENGE_RESOURCES_FAILURE,
          })
        );
    });
  };
}

/**
 * Loads role names from resources
 */
export function loadResourceRoles() {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_RESOURCE_ROLES_PENDING,
    });

    fetchResourceRoles()
      .then((resourceRoles) =>
        dispatch({
          type: LOAD_RESOURCE_ROLES_SUCCESS,
          resourceRoles,
        })
      )
      .catch(() =>
        dispatch({
          type: LOAD_RESOURCE_ROLES_FAILURE,
        })
      );
  };
}
