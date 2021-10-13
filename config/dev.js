module.exports = {
  ACCOUNTS_APP_CONNECTOR_URL:
    process.env.ACCOUNTS_APP_CONNECTOR_URL ||
    "https://accounts-auth0.topcoder-dev.com",
  ACCOUNTS_APP_LOGIN_URL:
    process.env.ACCOUNTS_APP_LOGIN_URL ||
    "https://accounts-auth0.topcoder-dev.com",
  COMMUNITY_APP_URL:
    process.env.COMMUNITY_APP_URL || "https://www.topcoder-dev.com",
  MEMBER_API_URL:
    process.env.MEMBER_API_URL || "https://api.topcoder-dev.com/v4/members",
  MEMBER_API_V3_URL:
    process.env.MEMBER_API_V3_URL || "https://api.topcoder-dev.com/v3/members",
  ARENA_URL: process.env.ARENA_URL || "https://arena.topcoder-dev.com",
  DEV_APP_URL:
    process.env.DEV_APP_URL || "https://submission-review.topcoder-dev.com",
  SUBMISSION_REVIEW_API_URL:
    process.env.SUBMISSION_REVIEW_API_URL ||
    "https://submission-review-api.topcoder-dev.com",
  V5_API_URL: process.env.V5_API_URL || "https://api.topcoder-dev.com/v5",
  FILESTACK_API_KEY: process.env.FILESTACK_API_KEY,
  FILESTACK_SUBMISSION_CONTAINER: process.env.FILESTACK_SUBMISSION_CONTAINER,
  FILESTACK_REGION: process.env.FILESTACK_REGION || "us-east-1",
  DEFAULT_ROLE: "Copilot",
};
