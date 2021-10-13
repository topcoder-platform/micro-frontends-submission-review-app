/**
 * Main App component
 */
import React, { useEffect, useLayoutEffect } from "react";
import {
  disableSidebarForRoute,
  login,
} from "@topcoder/micro-frontends-navbar-app";
import { Route, Switch, Redirect } from "react-router-dom";

import MyChallenges from "./containers/MyChallenges";
import TopBarContainer from "./containers/TopbarContainer";
import ChallengeDetails from "./containers/ChallengeDetails";
import ChallengeDetailsTopbar from "./containers/ChallengeDetailsTopbar";

import TwoColsLayout from "./components/TwoColsLayout";
import ChallengeDetailsLayout from "./components/ChallengeDetailsLayout";
import Sidebar from "./components/Sidebar";
import renderApp from "./components/AppLayout";
import ChallengeDetailsSidebar from "./components/ChallengeDetailsSidebar";
import { isUserLoggedIn } from "./util/api";

const App = () => {
  useLayoutEffect(() => {
    disableSidebarForRoute("/submission-review/*");
  }, []);

  useEffect(() => {
    isUserLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        login();
      }
    });
  }, []);

  return (
    <Switch>
      <Route
        exact
        path="/submission-review"
        render={renderApp(
          <MyChallenges />,
          <TopBarContainer />,
          <Sidebar />,
          TwoColsLayout
        )}
      />
      <Route
        exact
        path="/submission-review/challenges/:challengeId([\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}|\d{5,8})"
        render={({ match }) =>
          renderApp(
            <ChallengeDetails challengeId={match.params.challengeId} />,
            <ChallengeDetailsTopbar />,
            <ChallengeDetailsSidebar />,
            ChallengeDetailsLayout,
            true
          )()
        }
      />
      {/* If path is not defined redirect to landing page */}
      <Redirect to="/submission-review" />
    </Switch>
  );
};

export default App;
