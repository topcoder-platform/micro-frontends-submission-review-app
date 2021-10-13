import _ from "lodash";
import { axiosInstance } from "./axiosWithAuth";
import { V5_API_URL } from "../config/constants";

/**
 * Api request for fetching member's active challenges
 * @param userId user id
 * @returns {Promise<*>}
 */
export async function fetchMemberChallenges(userId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/challenges?memberId=${userId}&status=Active&perPage=100`
  );
  return _.get(response, "data");
}

/**
 * Api request for fetching challenge details
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchChallengeDetails(challengeId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/challenges?id=${challengeId}`
  );
  return _.get(response, "data[0]");
}

/**
 * Api request for fetching member's challenge (it includes member roles)
 * @param {String} userId
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchMemberChallenge(userId, challengeId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/challenges?memberId=${userId}&id=${challengeId}`
  );
  return _.get(response, "data[0]");
}

/**
 * Api request for fetching challenge types
 * @returns {Promise<*>}
 */
export async function fetchChallengeTypes() {
  const response = await axiosInstance.get(`${V5_API_URL}/challenge-types`);
  return _.get(response, "data");
}

/**
 * Api request for fetching challenge types
 * @param scoreCardId score card id
 * @param submissionId submission id
 * @returns {Promise<*>}
 */
export async function fetchReviewSummations(scoreCardId, submissionId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/reviewSummations?scoreCardId=${scoreCardId}&submissionId=${submissionId}`
  );
  return _.get(response, "data");
}
