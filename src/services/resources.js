import _ from "lodash";
import { axiosInstance } from "./axiosWithAuth";
import { V5_API_URL } from "../config/constants";

/**
 * Api request for fetching challenge roles
 * @param challengeId challenge id
 * @param memberId member id
 * @returns {Promise<*>}
 */
export async function fetchChallengeRoles(challengeId, memberId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/resources?challengeId=${challengeId}&memberId=${memberId}`
  );
  return _.get(response, "data");
}

/**
 * Api request for fetching resource roles name
 * @returns {Promise<*>}
 */
export async function fetchResourceRoles() {
  const response = await axiosInstance.get(`${V5_API_URL}/resource-roles`);
  return _.get(response, "data");
}
