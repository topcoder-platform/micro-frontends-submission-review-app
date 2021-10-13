import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

export const isUserLoggedIn = async () => {
  const { tokenV3, tokenV2 } = await getAuthUserTokens();
  return tokenV3 != null || tokenV2 != null;
};

export const getToken = async () => {
  return getAuthUserTokens();
};
