/**
 * Reducer to process actions related to challenge details
 */
import {
  CREATE_REVIEW_RECORDS_ERROR,
  CREATE_REVIEW_RECORDS_PENDING,
  CREATE_REVIEW_RECORDS_SUCCESS,
  LOAD_CHALLENGE_SUBMISSIONS_FAILURE,
  LOAD_CHALLENGE_SUBMISSIONS_PENDING,
  LOAD_CHALLENGE_SUBMISSIONS_SUCCESS,
  REVIEW_TYPE_ID,
  SET_CHALLENGE_SUBMISSION_PLACE,
} from "../config/constants";

const initialState = {
  hasSubmittedReviews: false,
  isSubmittingReviews: false,
  isLoading: true,
  loadingId: null,
  challengeId: null,
  challengeSubmissions: [],
};

export default function (state = initialState, action) {
  let submissions;

  switch (action.type) {
    case LOAD_CHALLENGE_SUBMISSIONS_SUCCESS:
      submissions = action.challengeSubmissions;
      const hasSubmittedReviews =
        !!submissions.length &&
        submissions.every(
          ({ review }) =>
            review &&
            review.some(({ typeId }) => typeId === REVIEW_TYPE_ID.REVIEW)
        );
      return {
        ...state,
        challengeSubmissions: submissions,
        hasSubmittedReviews,
        isLoading: false,
        loadingId: null,
        challengeId: state.loadingId,
      };
    case LOAD_CHALLENGE_SUBMISSIONS_PENDING:
      return {
        ...state,
        isLoading: true,
        loadingId: action.challengeId,
        challengeId: null,
      };
    case LOAD_CHALLENGE_SUBMISSIONS_FAILURE:
      return {
        ...state,
        isLoading: false,
        loadingId: null,
        challengeId: null,
        challengeSubmissions: [],
      };
    case CREATE_REVIEW_RECORDS_PENDING:
      return {
        ...state,
        isSubmittingReviews: true,
      };
    case CREATE_REVIEW_RECORDS_SUCCESS:
      return {
        ...state,
        hasSubmittedReviews: true,
        isSubmittingReviews: false,
      };
    case CREATE_REVIEW_RECORDS_ERROR:
      return {
        ...state,
        isSubmittingReviews: false,
      };
    case SET_CHALLENGE_SUBMISSION_PLACE:
      let { startIndex, endIndex } = action;
      if (startIndex === endIndex) {
        return state;
      }
      submissions = [...state.challengeSubmissions];
      endIndex = Math.min(endIndex, submissions.length - 1);
      const [submission] = submissions.splice(startIndex, 1);
      submissions.splice(endIndex, 0, submission);
      return { ...state, challengeSubmissions: submissions };
    default:
      return state;
  }
}
