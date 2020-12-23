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
import challengesById from "../../../local/mock-server/data/challengesById.json";

const ChallengeDetails = ({ challengeId }) => {

  // Uncomment this whenever APIs are ready or whenever you want to use Mock Server, for now static jsons are loaded
  // const [challenge, loadingError] = useData(getChallengeById, challengeId);
  const [challenge, loadingError] = [challengesById[challengeId], ''];

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
          submissionCompleted={challenge.submissionCompleted}
          submissions={challenge.submissions}
        />
      )}
    </LayoutContainer>
  );
};

export default ChallengeDetails;
