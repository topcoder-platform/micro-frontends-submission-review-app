import { configureConnector, decodeToken } from "tc-auth-lib";
import { fetchProfile } from "../services/user";
import {
  ACCOUNTS_APP_CONNECTOR_URL,
  LOAD_USER_SUCCESS,
  SAVE_AUTH_TOKEN,
} from "../config/constants";

import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

/**
 * Authentication and user related redux actions
 */

// Creates an iframe on the page for handling authentication
configureConnector({
  connectorUrl: ACCOUNTS_APP_CONNECTOR_URL,
  frameId: "tc-accounts-iframe",
});

/**
 * Load user profile
 * @returns {Function}
 */
export function loadUser() {
  return async (dispatch, getState) => {
    if (!getState().auth.user) {
      getAuthUserTokens().then((tokens) => {
        const token = tokens.tokenV3 || tokens.tokenV2;

        if (token) {
          const { handle } = decodeToken(token);
          fetchProfile(handle).then((user) => {
            dispatch({
              type: LOAD_USER_SUCCESS,
              user: { ...user, token },
            });
          });
        }
      });
    }
  };
}

/**
 * Save token in redux store
 * @param token authentication token
 * @returns {Function}
 */
export function saveToken(token) {
  return (dispatch) => {
    dispatch({
      type: SAVE_AUTH_TOKEN,
      token,
    });
    const { handle } = decodeToken(token);
    dispatch(loadUser(handle));
  };
}
