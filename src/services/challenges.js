/**
 * Fetching Challenges Service
 *
 */
import axios from "axios";
import config from "../../config";

/**
 * Get my challenges.
 * @param {String} tokenV3 login token
 * @param {Number} memberId memberId
 * @returns {Promise<object[]>} list of challenges
 */
export const getMyChallenges = (tokenV3, memberId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.TC_CHALLENGES_SERVICE_URL}/challenges`, {
    params: {
      memberId: memberId,
      status: "Active",
      perPage: 100,
    },
    headers: { Authorization: `Bearer ${tokenV3}` },
  });
};

/**
 * Get challenge by id.
 *
 * @param {String} tokenV3 login token
 * @param {Number} challengeId challenge id
 *
 * @returns {Promise<{}>} challenge object
 */
export const getChallengeById = (tokenV3, challengeId, memberId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(
    `${config.TC_CHALLENGES_SERVICE_URL}/challenges/${challengeId}`,
    {
      headers: { Authorization: `Bearer ${tokenV3}` },
    }
  );
};
