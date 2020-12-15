import React, { useEffect } from "react";
import { Router } from "@reach/router";
import { setAppMenu } from "@topcoder/micro-frontends-navbar-app";
import appMenu from "./constants/appMenu";
import MyChallengesList from "./routes/MyChallengesList";
import ChallengeDetails from "./routes/ChallengeDetails";
import { ChallengeDetailsProvider } from "./hooks/useChallengeDetails";
import "./styles/main.module.scss";

export default function Root() {
  useEffect(() => {
    // when app starts it should set its side menu structure
    setAppMenu("/submissions", appMenu);
  }, []);

  return (
    <ChallengeDetailsProvider>
      <div styleName="micro-frontends-submission-review-app">
        <Router>
          <MyChallengesList path="/submissions" />
          <ChallengeDetails path="/submissions/mychallenges/:challengeId" />
        </Router>
      </div>
    </ChallengeDetailsProvider>
  );
}
