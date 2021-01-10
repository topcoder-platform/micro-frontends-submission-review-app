/**
 * Fetching Submissions Service
 *
 */
import axios from "axios";
import config from "../../config";

/**
 * Get member submissions by challenge id.
 *
 * @param {String} tokenV3 login token
 * @param {String} challengeId challenge id
 * @param {Number} memberId member Id
 *
 * @returns {Promise<{}>} submissions
 */
export const getSubmissionsByChallengeForMember = (
  tokenV3,
  challengeId,
  memberId
) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(`${config.TC_SUBMISSIONS_SERVICE_URL}/submissions`, {
    headers: { Authorization: `Bearer ${tokenV3}` },
    params: {
      challengeId: challengeId,
      memberId: memberId,
    },
  });
};

/**
 * Get member submissions by challenge id.
 *
 * @param {String} tokenV3 login token
 * @param {String} submissionId submission id
 *
 * @returns {Promise<{}>} Download artifact
 */
export const downloadSubmission = (tokenV3, submissionId) => {
  if (!tokenV3) {
    return Promise.resolve({
      data: null,
    });
  }
  return axios.get(
    `${config.TC_SUBMISSIONS_SERVICE_URL}/submissions/${submissionId}/download`,
    {
      headers: { Authorization: `Bearer ${tokenV3}` },
      responseType: "blob",
    }
  );
};
