/**
 * Constants used across the app
 */
// Actions
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";

export const LOAD_CHALLENGES_SUCCESS = "LOAD_CHALLENGES_SUCCESS";
export const LOAD_CHALLENGES_PENDING = "LOAD_CHALLENGES_PENDING";
export const LOAD_CHALLENGES_FAILURE = "LOAD_CHALLENGES_FAILURE";

export const LOAD_CHALLENGE_DETAILS_SUCCESS = "LOAD_CHALLENGE_DETAILS_SUCCESS";
export const LOAD_CHALLENGE_DETAILS_PENDING = "LOAD_CHALLENGE_DETAILS_PENDING";
export const LOAD_CHALLENGE_DETAILS_FAILURE = "LOAD_CHALLENGE_DETAILS_FAILURE";

export const LOAD_CHALLENGE_SUBMISSIONS_SUCCESS =
  "LOAD_CHALLENGE_SUBMISSIONS_SUCCESS";
export const LOAD_CHALLENGE_SUBMISSIONS_PENDING =
  "LOAD_CHALLENGE_SUBMISSIONS_PENDING";
export const LOAD_CHALLENGE_SUBMISSIONS_FAILURE =
  "LOAD_CHALLENGE_SUBMISSIONS_FAILURE";

export const LOAD_CHALLENGE_TYPES_SUCCESS = "LOAD_CHALLENGE_TYPES_SUCCESS";
export const LOAD_CHALLENGE_TYPES_PENDING = "LOAD_CHALLENGE_TYPES_PENDING";
export const LOAD_CHALLENGE_TYPES_FAILURE = "LOAD_CHALLENGE_TYPES_FAILURE";

export const LOAD_SUBMISSION_DETAILS_SUCCESS =
  "LOAD_SUBMISSION_DETAILS_SUCCESS";
export const LOAD_SUBMISSION_DETAILS_PENDING =
  "LOAD_SUBMISSION_DETAILS_PENDING";
export const LOAD_SUBMISSION_DETAILS_FAILURE =
  "LOAD_SUBMISSION_DETAILS_FAILURE";

export const LOAD_SUBMISSION_ARTIFACTS_SUCCESS =
  "LOAD_SUBMISSION_ARTIFACTS_SUCCESS";
export const LOAD_SUBMISSION_ARTIFACTS_PENDING =
  "LOAD_SUBMISSION_ARTIFACTS_PENDING";
export const LOAD_SUBMISSION_ARTIFACTS_FAILURE =
  "LOAD_SUBMISSION_ARTIFACTS_FAILURE";

export const LOAD_CHALLENGE_RESOURCES_PENDING =
  "LOAD_CHALLENGE_RESOURCES_PENDING";
export const LOAD_CHALLENGE_RESOURCES_SUCCESS =
  "LOAD_CHALLENGE_RESOURCES_SUCCESS";
export const LOAD_CHALLENGE_RESOURCES_FAILURE =
  "LOAD_CHALLENGE_RESOURCES_FAILURE";

export const LOAD_RESOURCE_ROLES_PENDING = "LOAD_RESOURCE_ROLES_PENDING";
export const LOAD_RESOURCE_ROLES_SUCCESS = "LOAD_RESOURCE_ROLES_SUCCESS";
export const LOAD_RESOURCE_ROLES_FAILURE = "LOAD_RESOURCE_ROLES_FAILURE";

export const LOAD_REVIEW_TYPES_PENDING = "LOAD_REVIEW_TYPES_PENDING";
export const LOAD_REVIEW_TYPES_SUCCESS = "LOAD_REVIEW_TYPES_SUCCESS";
export const LOAD_REVIEW_TYPES_FAILURE = "LOAD_REVIEW_TYPES_FAILURE";

export const LOAD_REVIEW_SUMMATION_PENDING = "LOAD_REVIEW_SUMMATION_PENDING";
export const LOAD_REVIEW_SUMMATION_SUCCESS = "LOAD_REVIEW_SUMMATION_SUCCESS";
export const LOAD_REVIEW_SUMMATION_FAILURE = "LOAD_REVIEW_SUMMATION_FAILURE";

export const LOAD_SCORECARDS_PENDING = "LOAD_SCORECARDS_PENDING";
export const LOAD_SCORECARDS_SUCCESS = "LOAD_SCORECARDS_SUCCESS";
export const LOAD_SCORECARDS_FAILURE = "LOAD_SCORECARDS_FAILURE";

export const POST_SUBMISSION_REVIEW_PENDING = "POST_SUBMISSION_REVIEW_PENDING";
export const POST_SUBMISSION_REVIEW_SUCCESS = "POST_SUBMISSION_REVIEW_SUCCESS";
export const POST_SUBMISSION_REVIEW_FAILURE = "POST_SUBMISSION_REVIEW_FAILURE";

export const SET_CHALLENGE_SUBMISSION_PLACE = "SET_CHALLENGE_SUBMISSION_PLACE";
export const CREATE_REVIEW_RECORDS_PENDING = "CREATE_REVIEW_RECORDS_PENDING";
export const CREATE_REVIEW_RECORDS_SUCCESS = "CREATE_REVIEW_RECORDS_SUCCESS";
export const CREATE_REVIEW_RECORDS_ERROR = "CREATE_REVIEW_RECORDS_ERROR";

export const SWITCH_TAB = "SWITCH_TAB";

export const SAVE_AUTH_TOKEN = "SAVE_AUTH_TOKEN";

// Name of challenge tracks
export const CHALLENGE_TRACKS = {
  DEVELOP: "Development",
  DESIGN: "Design",
  DATA_SCIENCE: "Data_Science",
};

// List of challenge phase statuses
export const PHASE_STATUS = {
  CLOSED: "Closed",
  OPEN: "Open",
  SCHEDULED: "Scheduled",
};

export const PHASE_NAME = {
  REVIEW: "Review",
};

export const REVIEW_TYPE_ID = {
  REVIEW: "c56a4180-65aa-42ec-a945-5fd21dec0503",
};

export const DESIGN_SUBMISSION_SCORE_MIN = 50;

// List of subtracks that should be considered as Marathon Matches
export const MARATHON_MATCH_SUBTRACKS = ["DEVELOP_MARATHON_MATCH"];

export const SUBMISSION_DETAILS_TABS = {
  REVIEW_SUMMARY: "Review Summary",
  ARTIFACTS: "Artifacts",
};

export const ACCOUNTS_APP_CONNECTOR_URL =
  process.env.ACCOUNTS_APP_CONNECTOR_URL;
export const ACCOUNTS_APP_LOGIN_URL = process.env.ACCOUNTS_APP_LOGIN_URL;

export const COMMUNITY_APP_URL = process.env.COMMUNITY_APP_URL;

export const V5_API_URL = process.env.V5_API_URL;

export const SUBMISSION_REVIEW_API_URL = process.env.SUBMISSION_REVIEW_API_URL;

export const MEMBER_API_URL = process.env.MEMBER_API_URL;
export const MEMBER_API_V3_URL = process.env.MEMBER_API_V3_URL;

export const ARENA_URL = process.env.ARENA_URL;
export const DATA_SCIENCE_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][datasci]=true`;
export const DESIGN_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][design]=true`;
export const DEVELOPMENT_CHALLENGES_URL = `${COMMUNITY_APP_URL}/challenges?filter[tracks][develop]=true`;

export const getTCChallengeURL = (challengeId) =>
  `${COMMUNITY_APP_URL}/challenges/${challengeId}`;
export const getTCMemberURL = (handle) =>
  `${COMMUNITY_APP_URL}/members/${handle}`;
export const downloadSubmissionURL = (submissionId, token) =>
  `${SUBMISSION_REVIEW_API_URL}/challengeSubmissions/${submissionId}/download?token=${token}`;
export const downloadSubmissionArtifactURL = (
  submissionId,
  artifactId,
  token
) =>
  `${SUBMISSION_REVIEW_API_URL}/challengeSubmissions/${submissionId}/artifacts/${artifactId}/download?token=${token}`;

export const FILESTACK = {
  API_KEY: process.env.FILESTACK_API_KEY,
  SUBMISSION_CONTAINER: process.env.FILESTACK_SUBMISSION_CONTAINER,
  REGION: process.env.FILESTACK_REGION,
};

export const DEFAULT_ROLE = process.env.DEFAULT_ROLE;

export const SYSTEM_USERS = ["TC System", "Applications"];

export const SUBMISSION_TABS = {
  CONTEST_SUBMISSION: "Contest Submission",
  CHECKPOINT_SUBMISSION: "Checkpoint Submission",
  FINAL_FIX_SUBMISSION: "Final Fix Submission",
};

// Lexical meaning different, though they contain the same attributes
export const SUBMISSION_TYPES = SUBMISSION_TABS;

export const PROJECT_ROLES = {
  Manager: "Manager",
  Copilot: "Copilot",
  Observer: "Observer",
  Reviewer: "Reviewer",
  Submitter: "Submitter",
  Client_Manager: "Client Manager",
  Iterative_Reviewer: "Iterative Reviewer",
};

export const REVIEW_TYPES = {
  Screening: "c56a4180-65aa-42ec-a945-5fd21dec0501",
  CheckpointReview: "c56a4180-65aa-42ec-a945-5fd21dec0502",
  Review: "c56a4180-65aa-42ec-a945-5fd21dec0503",
  AppealsResponse: "c56a4180-65aa-42ec-a945-5fd21dec0504",
  IterativeReview: "c56a4180-65aa-42ec-a945-5fd21dec0505",
  FinalFix: "9ecc88e5-a4ee-44a4-8ec1-70bd98022510",
  Approval: "d6d31f34-8ee5-4589-ae65-45652fcc01a6",
};

export const PHASE_IDS = {
  RegistrationPhase: "a93544bc-c165-4af4-b55e-18f3593b457a",
  SubmissionPhase: "6950164f-3c5e-4bdc-abc8-22aaf5a1bd49",
  CheckpointSubmissionPhase: "d8a2cdbe-84d1-4687-ab75-78a6a7efdcc8",
  CheckpointScreeningPhase: "ce1afb4c-74f9-496b-9e4b-087ae73ab032",
  CheckpointReviewPhase: "84b43897-2aab-44d6-a95a-42c433657eed",
  ScreeningPhase: "2d7d3d85-0b29-4989-b3b4-be7f2b1d0aa6",
  ReviewPhase: "aa5a3f78-79e0-4bf7-93ff-b11e8f5b398b",
  FinalFixPhase: "3e2afca6-9542-4763-a135-96b33f12c082",
  ApprovalPhase: "ad985cff-ad3e-44de-b54e-3992505ba0ae",
};

export const TOPCODER_TERMS =
  "https://www.topcoder.com/community/how-it-works/terms/";

/* Holds day and hour range in ms. */
export const MINUTE_MS = 60 * 1000;
export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;
