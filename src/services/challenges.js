/**
 * Fetching Challenges Service
 *
 */
import axios from "axios";
import config from "../../config";

/**
 * Get my challenges.
 *
 * @returns {Promise<object[]>} list of challenges
 */
export const getMyChallenges = () => {
  return axios.get(`${config.TC_CHALLENGES_SERVICE_URL}/mychallenges`);
};

/**
 * Get challenge by id.
 *
 * @param {string|number} challengeId challenge id
 *
 * @returns {Promise<{}>} challenge object
 */
export const getChallengeById = (challengeId) => {
  return axios.get(
    `${config.TC_CHALLENGES_SERVICE_URL}/mychallenges/${challengeId}`
  );
};
