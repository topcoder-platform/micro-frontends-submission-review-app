/**
 * ChallengeDetails
 *
 * Page for the Details of Challenges.
 */
import React from "react";
import LayoutContainer from "../../components/LayoutContainer";
import ChallengeDetailsHeader from "./components/ChallengeDetailsHeader";
import ChallengeProgress from "./components/ChallengeProgress";
import { useData } from "../../hooks/useData";
import { getChallengeById } from "../../services/challenges";
import SubmissionDetails from "./components/SubmissionDetails";

const ChallengeDetails = ({ challengeId }) => {
  const [challenge, loadingError] = useData(getChallengeById, challengeId);

  return (
    <LayoutContainer>
      {!!challenge && (
        <ChallengeDetailsHeader
          title={challenge.title}
          tags={challenge.tags}
          role={challenge.role}
          backTo="/submissions"
        />
      )}
      {!!challenge && (
        <ChallengeProgress
          progress={challenge.progress}
          purse={challenge.purse}
          registers={challenge.registers}
          submitters={challenge.submitters}
        />
      )}
      {!!challenge && (
        <SubmissionDetails
          type={challenge.type}
          role={challenge.role}
          submissions={challenge.submissions}
        />
      )}
    </LayoutContainer>
  );
};

export default ChallengeDetails;
