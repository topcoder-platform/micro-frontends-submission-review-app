import React from "react";
import { Router } from "@reach/router";

import MyChallengesList from "./routes/MyChallengesList";
import ChallengeDetails from "./routes/ChallengeDetails";
import { ChallengeDetailsProvider } from "hooks/useChallengeDetails";
import "./styles/main.module.scss";

export default function Root() {
  return (
    <ChallengeDetailsProvider>
      <div styleName="topcoder-submission-review-app">
        <Router>
          <MyChallengesList path="/submissions" />
          <ChallengeDetails path="/submissions/mychallenges/:challengeId" />
        </Router>
      </div>
    </ChallengeDetailsProvider>
  );
}
