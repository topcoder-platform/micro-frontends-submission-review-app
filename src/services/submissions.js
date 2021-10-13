import { axiosInstance } from "./axiosWithAuth";
import { V5_API_URL } from "../config/constants";

/**
 * Api request for fetching submissions for a specific challenge
 * @param challengeId
 * @returns {Promise<*>}
 */
export async function fetchChallengeSubmissions(challengeId) {
  const response = await axiosInstance.get(
    `${V5_API_URL}/submissions?challengeId=${challengeId}`
  );
  return response.data;
}
