/**
 * Submission Details
 *
 * Shows Details of the submission.
 */
import React, { useCallback, useEffect, useState } from "react";
import PT from "prop-types";
import DownArrow from "../../../../assets/images/tick-down.svg";
import ExpandArrow from "../../../../assets/images/expand-arrow.svg";
import Download from "../../../../assets/images/download.svg";
import View from "../../../../assets/images/view.svg";
import SubmissionModal from "../../../../components/SubmissionModal";
import "./styles.module.scss";
import _ from "lodash";
import { useData } from "../../../../hooks/useData";
import {
  getSubmissionsByChallengeForMember,
  downloadSubmission,
} from "../../../../services/submissions";
import { decodeToken } from "@topcoder-platform/tc-auth-lib";
import { useAsync } from "react-use";
import { getAuthUserTokens } from "@topcoder/micro-frontends-navbar-app";

const SubmissionDetails = ({ challengeId, type, role }) => {
  const authUserTokens = useAsync(getAuthUserTokens);
  const tokenV3 = authUserTokens.value ? authUserTokens.value.tokenV3 : null;
  const memberId = tokenV3 ? decodeToken(tokenV3).userId : null;
  const [myChallengeSubmissions, loadingError] = useData(
    getSubmissionsByChallengeForMember,
    tokenV3,
    challengeId,
    memberId
  );

  /**
   * Returns Date in the format 01 Sep 2019
   * @param {String} Datetime
   * @returns {String} Date
   */
  const generateDate = (dateTime) => {
    if (!dateTime) {
      return "";
    }
    return new Intl.DateTimeFormat("Default", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(dateTime));
  };

  /**
   * Returns time in the format hh:mm:ss
   * @param {String} Datetime
   * @returns {String} Time
   */
  const generateTime = (dateTime) => {
    if (!dateTime) {
      return "";
    }
    return new Intl.DateTimeFormat("Default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date(dateTime));
  };

  /**
   *
   * @param {Object} myChallengeSubmissions
   * @returns {Object} Simplified challenge submissions data
   */
  const generateMySubmissions = (myChallengeSubmissions) => {
    return _.map(myChallengeSubmissions, (myChallengeSubmission, index) => {
      return {
        id: myChallengeSubmission.id,
        rank: myChallengeSubmissions.length - index,
        submission_date: generateDate(myChallengeSubmission.submittedDate),
        submission_time: generateTime(myChallengeSubmission.submittedDate),
        review_date:
          myChallengeSubmission.review.length > 0
            ? generateDate(myChallengeSubmission.review[0].reviewedDate)
            : "N/A",
        review_time:
          myChallengeSubmission.review.length > 0
            ? generateTime(myChallengeSubmission.review[0].reviewedDate)
            : "",
        review_score:
          myChallengeSubmission.review.length > 0
            ? myChallengeSubmission.review[0].score
            : "N/A",
        type: myChallengeSubmission.type,
      };
    });
  };

  /**
   *
   * @param {String} submissionId submission Id
   * @returns Triggers file download for submissionId
   */
  const downloadFile = (submissionId) => {
    downloadSubmission(tokenV3, submissionId).then((response) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", submissionId + ".zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  const mySubmissions = generateMySubmissions(myChallengeSubmissions);
  const [submissionId, setSubmissionId] = useState(-1);
  const [viewSummary, setViewSummary] = useState(true);
  const [viewLogs, setViewLogs] = useState(false);
  const [previewLogId, setPreviewLogId] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  const [viewCheckpoint, setViewCheckpoint] = useState(true);
  const [viewFinal, setViewFinal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const submissionExpandHandler = (submission_id) => {
    if (!!submission_id) {
      if (submissionId === submission_id) {
        setSubmissionId(-1);
        setViewLogs(false);
        setViewSummary(true);
        setPreviewLogId(-1);
      } else {
        setSubmissionId(submission_id);
        setViewLogs(false);
        setViewSummary(true);
        setPreviewLogId(-1);
      }
    }
  };

  const handleSubmissionsTabs = (activate_tab) => {
    if (activate_tab === "response_summary") {
      setViewLogs(false);
      setViewSummary(true);
      setPreviewLogId(-1);
    } else if (activate_tab === "logs") {
      setViewLogs(true);
      setViewSummary(false);
      setPreviewLogId(-1);
    }
  };

  const handleCopilotDesignTabs = (activate_tab) => {
    if (activate_tab === "Checkpoint") {
      setViewFinal(false);
      setViewCheckpoint(true);
    } else if (activate_tab === "Final") {
      setViewFinal(true);
      setViewCheckpoint(false);
    }
  }

  const handlePreviewLogs = (log_id) => {
    if (!!log_id) {
      if (previewLogId === log_id) {
        setPreviewLogId(-1);
      } else {
        setPreviewLogId(log_id);
      }
    }
  };

  return (
    <div styleName="submission-details-container">
      {showModal && <SubmissionModal show={showModal} handleClose={closeModalHandler} />}
      

      {role == "Copilot" && type == "Design" && !!mySubmissions && (
        <div styleName="submission-details-tabs-design-copilot">
          {viewCheckpoint && (
            <button styleName="design-copilot-active-tab" >Checkpoint ({mySubmissions.filter(
              (x) => _.includes(x['type'], 'Checkpoint')
            ).length})</button>
          )}
          {!viewCheckpoint && (
            <button 
              styleName="design-copilot-inactive-tab" 
              onClick={() =>
                handleCopilotDesignTabs("Checkpoint")
              }
            >Checkpoint ({mySubmissions.filter(
              (x) => _.includes(x['type'], 'Checkpoint')
            ).length})</button>
          )}
          
          {viewFinal && (
            <button styleName="design-copilot-active-tab" >Final ({mySubmissions.filter(
              (x) => _.includes(x['type'], 'Final')
            ).length})</button>
          )}
          {!viewFinal && (
            <button 
              styleName="design-copilot-inactive-tab" 
              onClick={() =>
                handleCopilotDesignTabs("Final")
              }
            >Final ({mySubmissions.filter(
              (x) => _.includes(x['type'],'Final')
            ).length})</button>
          )}
        </div>
      )}

      <div styleName="submission-details-table">
        {(type == "Development" || type == "Data" || type == "Quality Assurance") && (
          <div styleName="table-head">
            <div styleName="flex-1">#</div>
            <div styleName="flex-3">ID</div>
            {type !== "Quality Assurance" && <div styleName="flex-3">Review Date</div>}
            {type === "Quality Assurance" && <div styleName="flex-3">Submission Date</div>}
            {type !== "Quality Assurance" && <div styleName="flex-3">Review Score</div>}
            {type === "Quality Assurance" && (
              <div styleName="flex-3">Initial Score / Final Score</div>
            )}
            <div styleName="flex-1">Actions</div>
          </div>
        )}

        {type == "Design" && (
          <div styleName="table-head">
            <div styleName="flex-1">#</div>
            <div styleName="flex-3">ID</div>
            <div styleName="flex-1">Type</div>
            <div styleName="flex-2">Submission Date</div>
            <div styleName="flex-2">Submission Status</div>
            <div styleName="flex-2">Review Score</div>
            <div styleName="flex-1">Actions</div>
          </div>
        )}

        {!!mySubmissions &&
          type === "Design" && role !== "Copilot" &&
          mySubmissions.map((submission, index) => (
            <div styleName="row-expansion-wrapper" key={index}>
              <div styleName="table-row">
                <div styleName="flex-1">{submission.rank}</div>
                <div styleName="design-id-wrapper flex-3">
                  <button onClick={showModalHandler} styleName="modal-btn">
                    {submission.id}
                  </button>
                  <div styleName="design-short-id">{submission.short_id}</div>
                </div>
                <div styleName="flex-1">{submission.type}</div>
                <div styleName="submission-date-wrapper flex-2">
                  <span>{submission.submission_date}</span>
                  <span>{submission.submission_time}</span>
                </div>
                {submission.screening_status === "pass" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-pass">
                      {submission.screening_text}
                    </span>
                  </div>
                )}
                {submission.screening_status === "warning" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-warning">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "fail" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-fail">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "" && (
                  <div styleName="submission-screening flex-2">
                    <div styleName="status-notdefined">
                      Not yet performed
                    </div>
                  </div>
                )}
                <div styleName="flex-2">{submission.review_score}</div>
                <div styleName="actions-icons-wrapper flex-1">
                  <div styleName="actions-icons">
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                      <Download style={{ cursor: 'pointer' }}/>
                    </button>
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {submissionId === submission.short_id && (
                <div styleName="description-wrapper">
                  {submission.descriptions &&
                    submission.descriptions.map((description) => (
                      <div styleName="submission-description">
                        {description.status === "pass" && (
                          <div styleName="description-pass">
                            {description.message}
                          </div>
                        )}
                        {description.status === "bold" && (
                          <div styleName="description-bold">
                            {description.message}
                          </div>
                        )}
                        {description.status === "fail" && (
                          <div styleName="description-fail">
                            {description.message}
                          </div>
                        )}
                        {description.status === "warning" && (
                          <div styleName="description-warning">
                            {description.message}
                          </div>
                        )}
                        {description.status === "empty" && (
                          <div styleName="description-empty">
                            {description.message}
                          </div>
                        )}
                        {description.status === "normal" && (
                          <div styleName="description-normal">
                            {description.message}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

        {!!mySubmissions &&
          type === "Design" && role === "Copilot" && viewCheckpoint &&
          mySubmissions.filter(
            (x) => _.includes(x['type'], 'Checkpoint')
          ).map((submission, index) => (
            <div styleName="row-expansion-wrapper" key={index}>
              <div styleName="table-row">
                <div styleName="flex-1">{submission.rank}</div>
                <div styleName="design-id-wrapper flex-3">
                  <button onClick={showModalHandler} styleName="modal-btn">
                    {submission.id}
                  </button>
                  <div styleName="design-short-id">{submission.short_id}</div>
                </div>
                <div styleName="flex-1">{submission.type}</div>
                <div styleName="submission-date-wrapper flex-2">
                  <span>{submission.submission_date}</span>
                  <span>{submission.submission_time}</span>
                </div>
                {submission.screening_status === "pass" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-pass">
                      {submission.screening_text}
                    </span>
                  </div>
                )}
                {submission.screening_status === "warning" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-warning">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "fail" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-fail">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "" && (
                  <div styleName="submission-screening flex-2">
                    <div styleName="status-notdefined">
                      Not yet performed
                    </div>
                  </div>
                )}
                <div styleName="flex-2">{submission.review_score}</div>
                <div styleName="actions-icons-wrapper flex-1">
                  <div styleName="actions-icons">
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {submissionId === submission.short_id && (
                <div styleName="description-wrapper">
                  {submission.descriptions &&
                    submission.descriptions.map((description) => (
                      <div styleName="submission-description">
                        {description.status === "pass" && (
                          <div styleName="description-pass">
                            {description.message}
                          </div>
                        )}
                        {description.status === "bold" && (
                          <div styleName="description-bold">
                            {description.message}
                          </div>
                        )}
                        {description.status === "fail" && (
                          <div styleName="description-fail">
                            {description.message}
                          </div>
                        )}
                        {description.status === "warning" && (
                          <div styleName="description-warning">
                            {description.message}
                          </div>
                        )}
                        {description.status === "empty" && (
                          <div styleName="description-empty">
                            {description.message}
                          </div>
                        )}
                        {description.status === "normal" && (
                          <div styleName="description-normal">
                            {description.message}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

        {!!mySubmissions &&
          type === "Design" && role === "Copilot" && viewFinal &&
          mySubmissions.filter(
            (x) => _.includes(x['type'], 'Final')
          ).map((submission, index) => (
            <div styleName="row-expansion-wrapper" key={index}>
              <div styleName="table-row">
                <div styleName="flex-1">{submission.rank}</div>
                <div styleName="design-id-wrapper flex-3">
                  <button onClick={showModalHandler} styleName="modal-btn">
                    {submission.id}
                  </button>
                  <div styleName="design-short-id">{submission.short_id}</div>
                </div>
                <div styleName="flex-1">{submission.type}</div>
                <div styleName="submission-date-wrapper flex-2">
                  <span>{submission.submission_date}</span>
                  <span>{submission.submission_time}</span>
                </div>
                {submission.screening_status === "pass" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-pass">
                      {submission.screening_text}
                    </span>
                  </div>
                )}
                {submission.screening_status === "warning" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-warning">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "fail" && (
                  <div styleName="submission-screening flex-2">
                    <span styleName="status-fail">
                      {submission.screening_text}
                    </span>
                    <span styleName="status-warning-text">
                      {submission.screening_warning}
                    </span>
                  </div>
                )}
                {submission.screening_status === "" && (
                  <div styleName="submission-screening flex-2">
                    <div styleName="status-notdefined">
                      Not yet performed
                    </div>
                  </div>
                )}
                <div styleName="flex-2">{submission.review_score}</div>
                <div styleName="actions-icons-wrapper flex-1">
                  <div styleName="actions-icons">
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {submissionId === submission.short_id && (
                <div styleName="description-wrapper">
                  {submission.descriptions &&
                    submission.descriptions.map((description) => (
                      <div styleName="submission-description">
                        {description.status === "pass" && (
                          <div styleName="description-pass">
                            {description.message}
                          </div>
                        )}
                        {description.status === "bold" && (
                          <div styleName="description-bold">
                            {description.message}
                          </div>
                        )}
                        {description.status === "fail" && (
                          <div styleName="description-fail">
                            {description.message}
                          </div>
                        )}
                        {description.status === "warning" && (
                          <div styleName="description-warning">
                            {description.message}
                          </div>
                        )}
                        {description.status === "empty" && (
                          <div styleName="description-empty">
                            {description.message}
                          </div>
                        )}
                        {description.status === "normal" && (
                          <div styleName="description-normal">
                            {description.message}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

        {!!mySubmissions &&
          (type === "Development" || type === "Data" || type === "Quality Assurance") &&
          mySubmissions.map((submission, index) => (
            <div styleName="row-expansion-wrapper" key={index}>
              <div styleName="table-row">
                <div styleName="flex-1">{submission.rank}</div>
                <div styleName="design-id-wrapper flex-3">
                  <button onClick={showModalHandler} styleName="modal-btn">
                    {submission.id}
                  </button>
                  <div styleName="design-short-id">{submission.short_id}</div>
                </div>
                <div styleName="submission-date-wrapper flex-3">
                  <span>{submission.review_date}</span>
                  <span>{submission.review_time}</span>
                </div>
                <div styleName="flex-3">{submission.review_score}</div>
                <div styleName="actions-icons-wrapper flex-1">
                  <div styleName="actions-icons-dev">
                    <View styleName="view-button" />
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {submissionId === submission.short_id && (
                <div styleName="submission-details-wrapper">
                  <div styleName="submission-details-header">
                    SUBMISSION DETAILS
                  </div>
                  <div styleName="submission-details-tabs">
                    {viewSummary && (
                      <button styleName="active-tab">Response Summary</button>
                    )}
                    {!viewSummary && (
                      <button
                        onClick={() =>
                          handleSubmissionsTabs("response_summary")
                        }
                        styleName="inactive-tab"
                      >
                        Response Summary
                      </button>
                    )}
                    {viewLogs && <button styleName="active-tab">Logs</button>}
                    {!viewLogs && (
                      <button
                        onClick={() => handleSubmissionsTabs("logs")}
                        styleName="inactive-tab"
                      >
                        Logs
                      </button>
                    )}
                  </div>

                  {submissionId === submission.short_id && viewSummary && (
                    <div styleName="review-summary-table">
                      <div styleName="review-summary-header">
                        <div styleName="flex-3">Review Type</div>
                        <div styleName="flex-2">Reviewer</div>
                        {type === "Quality Assurance" && (
                          <div styleName="flex-2">Initial Score</div>
                        )}
                        {type !== "Quality Assurance" && <div styleName="flex-2">Score</div>}
                        {type !== "Data" && type !== "Quality Assurance" && (
                          <div styleName="flex-2">Appeal</div>
                        )}
                        {type !== "Quality Assurance" && (
                          <div styleName="status-header flex-1">Status</div>
                        )}
                        {type === "Quality Assurance" && (
                          <div styleName="status-header flex-1">
                            Final Score
                          </div>
                        )}
                      </div>

                      {!!submission.review_summary &&
                        submission.review_summary.review_summaries.map(
                          (review_summary) => (
                            <div styleName="review-summary">
                              <div styleName="flex-3">
                                {review_summary.review_type}
                              </div>
                              <div styleName="flex-2">
                                {review_summary.reviewer}
                              </div>
                              <div styleName="flex-2">
                                {review_summary.score}
                              </div>
                              {type !== "Data" && type !== "Quality Assurance" && (
                                <div styleName="flex-2">
                                  {review_summary.appeal}
                                </div>
                              )}
                              {type === "Quality Assurance" && (
                                <div styleName="na-status flex-1">
                                  {review_summary.final_score}
                                </div>
                              )}
                              {review_summary.status === "open" &&
                                type !== "Quality Assurance" && (
                                  <div styleName="open-status flex-1">
                                    {review_summary.status}
                                  </div>
                                )}
                              {review_summary.status === "closed" &&
                                type !== "Quality Assurance" && (
                                  <div styleName="closed-status flex-1">
                                    {review_summary.status}
                                  </div>
                                )}
                              {review_summary.status === "N/A" &&
                                type !== "Quality Assurance" && (
                                  <div styleName="na-status flex-1">
                                    {review_summary.status}
                                  </div>
                                )}
                            </div>
                          )
                        )}

                      <div styleName="review-summary-final">
                        <div styleName="flex-3">Final Score</div>
                        <div styleName="flex-2"></div>
                        <div styleName="flex-2">
                          {submission.review_summary.final_score.score}
                        </div>
                        {type !== "Data" && type !== "Quality Assurance" && (
                          <div styleName="flex-2">
                            {submission.review_summary.final_score.appeal}
                          </div>
                        )}

                        {type === "Quality Assurance" && (
                          <div styleName="na-status flex-1">
                            {submission.review_summary.final_score.final_score}
                          </div>
                        )}
                        {submission.review_summary.final_score.status ===
                          "open" &&
                          type !== "Quality Assurance" && (
                            <div styleName="open-status flex-1">
                              {submission.review_summary.final_score.status}
                            </div>
                          )}
                        {submission.review_summary.final_score.status ===
                          "closed" &&
                          type !== "Quality Assurance" && (
                            <div styleName="closed-status flex-1">
                              {submission.review_summary.final_score.status}
                            </div>
                          )}
                        {submission.review_summary.final_score.status ===
                          "N/A" &&
                          type !== "Quality Assurance" && (
                            <div styleName="flex-1">
                              {submission.review_summary.final_score.status}
                            </div>
                          )}
                      </div>
                    </div>
                  )}

                  {submissionId === submission.short_id && viewLogs && (
                    <div styleName="review-summary-table">
                      <div styleName="review-summary-header">
                        <div styleName="flex-3">Artifacts ID</div>
                        <div styleName="flex-1">Individual Test Case</div>
                        <div styleName="status-header flex-1">Actions</div>
                      </div>

                      {!!submission.logs &&
                        submission.logs.map((log) => (
                          <div styleName="review-logs">
                            <div styleName="logs-row">
                              <div styleName="flex-3">{log.artifacts_id}</div>
                              <div styleName="flex-1">
                                {log.individual_test_case}
                              </div>
                              {previewLogId === log.artifacts_id && (
                                <button
                                  onClick={() =>
                                    handlePreviewLogs(log.artifacts_id)
                                  }
                                  styleName="flex-1"
                                  style={{ cursor: 'pointer' }}
                                >
                                  Hide Preview
                                </button>
                              )}
                              {previewLogId !== log.artifacts_id && (
                                <button
                                  onClick={() =>
                                    handlePreviewLogs(log.artifacts_id)
                                  }
                                  styleName="flex-1"
                                  style={{ cursor: 'pointer' }}
                                >
                                  Preview
                                </button>
                              )}
                            </div>
                            {previewLogId === log.artifacts_id && (
                              <div styleName="log-feedback-wrapper">
                                <div styleName="feedback-title">Feedback</div>
                                {log.feedback.map((feedback) => (
                                  <div styleName="log-feedback">
                                    {feedback.link === "" && (
                                      <div styleName="feedback-message">
                                        {feedback.message}
                                      </div>
                                    )}
                                    {feedback.link !== "" && (
                                      <div styleName="feedback-link">
                                        <div styleName="feedback-msg-link">
                                          {feedback.message}
                                        </div>
                                        <div styleName="link">
                                          {feedback.link}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

        <div styleName="mobile-row-expansion">
          {!!mySubmissions && role !== "Copilot" &&
            type === "Design" &&
            mySubmissions.map((submission, index) => (
              <div styleName="mobile-row-expansion-wrapper" key={index}>
                <div styleName="mobile-table-row">
                  <div styleName="mobile-rank">#{submission.rank}</div>
                  <div styleName="submission-id-wrapper">
                    <div styleName="gray-divs">ID</div>
                    <div styleName="submission-ids">
                      <button onClick={showModalHandler} styleName="modal-btn">
                        {submission.id}
                      </button>
                      <div styleName="design-short-id">
                        {submission.short_id}
                      </div>
                    </div>
                  </div>
                  <div styleName="submission-other-details">
                    <div styleName="submission-type-wrapper">
                      <div styleName="gray-divs">Type</div>
                      <div>{submission.type}</div>
                    </div>
                    <div styleName="submission-date-wrapper">
                      <div styleName="gray-divs">Submission Date</div>
                      <div>
                        {submission.submission_date}{" "}
                        {submission.submission_time}
                      </div>
                    </div>
                    <div styleName="submission-status-wrapper">
                      <div>Screening Status</div>
                      {submission.screening_status === "" && (
                        <div styleName="status-notdefined">
                          Not yet performed
                        </div>
                      )}
                      {submission.screening_status === "pass" && (
                        <div>{submission.screening_text}</div>
                      )}
                      {submission.screening_status === "warning" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-warning-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                      {submission.screening_status === "fail" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-fail-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                    </div>

                    <div styleName="submission-score-wrapper">
                      <div styleName="gray-divs">Review Score</div>
                      <div>{submission.review_score}</div>
                    </div>
                  </div>
                  <div styleName="submission-button-wrapper">
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Hide Detail</div>
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Show Detail</div>
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                  </div>
                </div>

                {submissionId === submission.short_id && (
                  <div styleName="description-wrapper">
                    {submission.descriptions &&
                      submission.descriptions.map((description) => (
                        <div styleName="submission-description">
                          {description.status === "pass" && (
                            <div styleName="description-pass">
                              {description.message}
                            </div>
                          )}
                          {description.status === "bold" && (
                            <div styleName="description-bold">
                              {description.message}
                            </div>
                          )}
                          {description.status === "fail" && (
                            <div styleName="description-fail">
                              {description.message}
                            </div>
                          )}
                          {description.status === "warning" && (
                            <div styleName="description-warning">
                              {description.message}
                            </div>
                          )}
                          {description.status === "empty" && (
                            <div styleName="description-empty">
                              {description.message}
                            </div>
                          )}
                          {description.status === "normal" && (
                            <div styleName="description-normal">
                              {description.message}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}

          {!!mySubmissions &&
            type === "Design" && role === "Copilot" && viewCheckpoint &&
            mySubmissions.filter(
              (x) => _.includes(x['type'], 'Checkpoint')
            ).map((submission, index) => (
              <div styleName="mobile-row-expansion-wrapper" key={index}>
                <div styleName="mobile-table-row">
                  <div styleName="mobile-rank">#{submission.rank}</div>
                  <div styleName="submission-id-wrapper">
                    <div styleName="gray-divs">ID</div>
                    <div styleName="submission-ids">
                      <button onClick={showModalHandler} styleName="modal-btn">
                        {submission.id}
                      </button>
                      <div styleName="design-short-id">
                        {submission.short_id}
                      </div>
                    </div>
                  </div>
                  <div styleName="submission-other-details">
                    <div styleName="submission-type-wrapper">
                      <div styleName="gray-divs">Type</div>
                      <div>{submission.type}</div>
                    </div>
                    <div styleName="submission-date-wrapper">
                      <div styleName="gray-divs">Submission Date</div>
                      <div>
                        {submission.submission_date}{" "}
                        {submission.submission_time}
                      </div>
                    </div>
                    <div styleName="submission-status-wrapper">
                      <div>Screening Status</div>
                      {submission.screening_status === "" && (
                        <div styleName="status-notdefined">
                          Not yet performed
                        </div>
                      )}
                      {submission.screening_status === "pass" && (
                        <div>{submission.screening_text}</div>
                      )}
                      {submission.screening_status === "warning" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-warning-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                      {submission.screening_status === "fail" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-fail-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                    </div>

                    <div styleName="submission-score-wrapper">
                      <div styleName="gray-divs">Review Score</div>
                      <div>{submission.review_score}</div>
                    </div>
                  </div>
                  <div styleName="submission-button-wrapper">
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Hide Detail</div>
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Show Detail</div>
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                  </div>
                </div>

                {submissionId === submission.short_id && (
                  <div styleName="description-wrapper">
                    {submission.descriptions &&
                      submission.descriptions.map((description) => (
                        <div styleName="submission-description">
                          {description.status === "pass" && (
                            <div styleName="description-pass">
                              {description.message}
                            </div>
                          )}
                          {description.status === "bold" && (
                            <div styleName="description-bold">
                              {description.message}
                            </div>
                          )}
                          {description.status === "fail" && (
                            <div styleName="description-fail">
                              {description.message}
                            </div>
                          )}
                          {description.status === "warning" && (
                            <div styleName="description-warning">
                              {description.message}
                            </div>
                          )}
                          {description.status === "empty" && (
                            <div styleName="description-empty">
                              {description.message}
                            </div>
                          )}
                          {description.status === "normal" && (
                            <div styleName="description-normal">
                              {description.message}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}

          {!!mySubmissions &&
            type === "Design" && role === "Copilot" && viewFinal &&
            mySubmissions.filter(
              (x) => _.includes(x['type'], 'Final')
            ).map((submission, index) => (
              <div styleName="mobile-row-expansion-wrapper" key={index}>
                <div styleName="mobile-table-row">
                  <div styleName="mobile-rank">#{submission.rank}</div>
                  <div styleName="submission-id-wrapper">
                    <div styleName="gray-divs">ID</div>
                    <div styleName="submission-ids">
                      <button onClick={showModalHandler} styleName="modal-btn">
                        {submission.id}
                      </button>
                      <div styleName="design-short-id">
                        {submission.short_id}
                      </div>
                    </div>
                  </div>
                  <div styleName="submission-other-details">
                    <div styleName="submission-type-wrapper">
                      <div styleName="gray-divs">Type</div>
                      <div>{submission.type}</div>
                    </div>
                    <div styleName="submission-date-wrapper">
                      <div styleName="gray-divs">Submission Date</div>
                      <div>
                        {submission.submission_date}{" "}
                        {submission.submission_time}
                      </div>
                    </div>
                    <div styleName="submission-status-wrapper">
                      <div>Screening Status</div>
                      {submission.screening_status === "" && (
                        <div styleName="status-notdefined">
                          Not yet performed
                        </div>
                      )}
                      {submission.screening_status === "pass" && (
                        <div>{submission.screening_text}</div>
                      )}
                      {submission.screening_status === "warning" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-warning-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                      {submission.screening_status === "fail" && (
                        <div styleName="warning-fail-cases">
                          <div>{submission.screening_text}</div>
                          <span styleName="status-fail-text">
                            ({submission.screening_warning})
                          </span>
                        </div>
                      )}
                    </div>

                    <div styleName="submission-score-wrapper">
                      <div styleName="gray-divs">Review Score</div>
                      <div>{submission.review_score}</div>
                    </div>
                  </div>
                  <div styleName="submission-button-wrapper">
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Hide Detail</div>
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Show Detail</div>
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                    <button styleName="expansion-button"
                      onClick={() => downloadFile(submission.id)}>
                    <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                    </button>
                  </div>
                </div>

                {submissionId === submission.short_id && (
                  <div styleName="description-wrapper">
                    {submission.descriptions &&
                      submission.descriptions.map((description) => (
                        <div styleName="submission-description">
                          {description.status === "pass" && (
                            <div styleName="description-pass">
                              {description.message}
                            </div>
                          )}
                          {description.status === "bold" && (
                            <div styleName="description-bold">
                              {description.message}
                            </div>
                          )}
                          {description.status === "fail" && (
                            <div styleName="description-fail">
                              {description.message}
                            </div>
                          )}
                          {description.status === "warning" && (
                            <div styleName="description-warning">
                              {description.message}
                            </div>
                          )}
                          {description.status === "empty" && (
                            <div styleName="description-empty">
                              {description.message}
                            </div>
                          )}
                          {description.status === "normal" && (
                            <div styleName="description-normal">
                              {description.message}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}

          {!!mySubmissions &&
            (type === "Development" || type === "Data" || type === "Quality Assurance") &&
            mySubmissions.map((submission, index) => (
              <div styleName="mobile-row-expansion-wrapper" key={index}>
                <div styleName="mobile-table-row">
                  <div styleName="mobile-rank">#{submission.rank}</div>
                  <div styleName="submission-id-wrapper">
                    <div styleName="gray-divs">ID</div>
                    <div styleName="submission-ids">
                      <button onClick={showModalHandler} styleName="modal-btn">
                        {submission.id}
                      </button>
                      <div styleName="design-short-id">
                        {submission.short_id}
                      </div>
                    </div>
                  </div>
                  <div styleName="submission-other-details">
                    <div styleName="submission-date-wrapper">
                      <div styleName="gray-divs">Review Date</div>
                      <div>
                        {submission.review_date} {submission.review_time}
                      </div>
                    </div>

                    <div styleName="submission-score-wrapper">
                      {type !== "Quality Assurance" && (
                        <div styleName="gray-divs">Review Score</div>
                      )}
                      {type === "Quality Assurance" && (
                        <div styleName="gray-divs">
                          Initial Score / Final Score
                        </div>
                      )}
                      <div>{submission.review_score}</div>
                    </div>
                  </div>
                  <div styleName="submission-button-wrapper">
                    {submissionId === submission.short_id ? (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Hide Detail</div>
                        <ExpandArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    ) : (
                      <button
                        styleName="expansion-button"
                        onClick={() =>
                          submissionExpandHandler(submission.short_id)
                        }
                      >
                        <div styleName="expand-btn-text">Show Detail</div>
                        <DownArrow style={{ cursor: 'pointer' }}/>
                      </button>
                    )}
                    <div styleName="actions-icons-dev">
                      <View styleName="view-button" />
                      <button styleName="expansion-button"
                        onClick={() => downloadFile(submission.id)}>
                      <Download style={{ cursor: 'pointer', height: '25px', width: '25px' }}/>
                      </button>
                    </div>
                  </div>
                </div>

                {submissionId === submission.short_id && (
                  <div styleName="submission-details-wrapper">
                    <div styleName="submission-details-header">
                      SUBMISSION DETAILS
                    </div>
                    <div styleName="submission-details-tabs">
                      {viewSummary && (
                        <button styleName="active-tab">Response Summary</button>
                      )}
                      {!viewSummary && (
                        <button
                          onClick={() =>
                            handleSubmissionsTabs("response_summary")
                          }
                          styleName="inactive-tab"
                        >
                          Response Summary
                        </button>
                      )}
                      {viewLogs && <button styleName="active-tab">Logs</button>}
                      {!viewLogs && (
                        <button
                          onClick={() => handleSubmissionsTabs("logs")}
                          styleName="inactive-tab"
                        >
                          Logs
                        </button>
                      )}
                    </div>

                    {submissionId === submission.short_id && viewSummary && (
                      <div styleName="review-summary-table">
                        <div styleName="review-summary-header">
                          <div styleName="flex-3">Review Type</div>
                          <div styleName="flex-2">Reviewer</div>
                          {type === "Quality Assurance" && (
                            <div styleName="flex-2">Initial Score</div>
                          )}
                          {type !== "Quality Assurance" && <div styleName="flex-2">Score</div>}
                          {type !== "Data" && type !== "Quality Assurance" && (
                            <div styleName="flex-2">Appeal</div>
                          )}
                          {type !== "Quality Assurance" && (
                            <div styleName="status-header flex-1">Status</div>
                          )}
                          {type === "Quality Assurance" && (
                            <div styleName="status-header flex-1">
                              Final Score
                            </div>
                          )}
                        </div>

                        {!!submission.review_summary &&
                          submission.review_summary.review_summaries.map(
                            (review_summary) => (
                              <div styleName="review-summary">
                                <div styleName="flex-3">
                                  {review_summary.review_type}
                                </div>
                                <div styleName="flex-2">
                                  {review_summary.reviewer}
                                </div>
                                <div styleName="flex-2">
                                  {review_summary.score}
                                </div>
                                {type !== "Data" && type !== "Quality Assurance" && (
                                  <div styleName="flex-2">
                                    {review_summary.appeal}
                                  </div>
                                )}
                                {type === "Quality Assurance" && (
                                  <div styleName="na-status flex-1">
                                    {review_summary.final_score}
                                  </div>
                                )}
                                {review_summary.status === "open" &&
                                  type !== "Quality Assurance" && (
                                    <div styleName="open-status flex-1">
                                      {review_summary.status}
                                    </div>
                                  )}
                                {review_summary.status === "closed" &&
                                  type !== "Quality Assurance" && (
                                    <div styleName="closed-status flex-1">
                                      {review_summary.status}
                                    </div>
                                  )}
                                {review_summary.status === "N/A" &&
                                  type !== "Quality Assurance" && (
                                    <div styleName="na-status flex-1">
                                      {review_summary.status}
                                    </div>
                                  )}
                              </div>
                            )
                          )}

                        <div styleName="review-summary-final">
                          <div styleName="flex-3">Final Score</div>
                          <div styleName="flex-2"></div>
                          <div styleName="flex-2">
                            {submission.review_summary.final_score.score}
                          </div>
                          {type !== "Data" && type !== "Quality Assurance" && (
                            <div styleName="flex-2">
                              {submission.review_summary.final_score.appeal}
                            </div>
                          )}

                          {type === "Quality Assurance" && (
                            <div styleName="na-status flex-1">
                              {
                                submission.review_summary.final_score
                                  .final_score
                              }
                            </div>
                          )}
                          {submission.review_summary.final_score.status ===
                            "open" &&
                            type !== "Quality Assurance" && (
                              <div styleName="open-status flex-1">
                                {submission.review_summary.final_score.status}
                              </div>
                            )}
                          {submission.review_summary.final_score.status ===
                            "closed" &&
                            type !== "Quality Assurance" && (
                              <div styleName="closed-status flex-1">
                                {submission.review_summary.final_score.status}
                              </div>
                            )}
                          {submission.review_summary.final_score.status ===
                            "N/A" &&
                            type !== "Quality Assurance" && (
                              <div styleName="flex-1">
                                {submission.review_summary.final_score.status}
                              </div>
                            )}
                        </div>
                      </div>
                    )}

                    {submissionId === submission.short_id && viewLogs && (
                      <div styleName="review-summary-table">
                        <div styleName="review-summary-header">
                          <div styleName="flex-3">Artifacts ID</div>
                          <div styleName="flex-1">Individual Test Case</div>
                          <div styleName="status-header flex-1">Actions</div>
                        </div>

                        {!!submission.logs &&
                          submission.logs.map((log) => (
                            <div styleName="review-logs">
                              <div styleName="logs-row">
                                <div styleName="flex-3">{log.artifacts_id}</div>
                                <div styleName="flex-1">
                                  {log.individual_test_case}
                                </div>
                                {previewLogId === log.artifacts_id && (
                                  <button
                                    onClick={() =>
                                      handlePreviewLogs(log.artifacts_id)
                                    }
                                    styleName="flex-1"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Hide Preview
                                  </button>
                                )}
                                {previewLogId !== log.artifacts_id && (
                                  <button
                                    onClick={() =>
                                      handlePreviewLogs(log.artifacts_id)
                                    }
                                    styleName="flex-1"
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Preview
                                  </button>
                                )}
                              </div>
                              {previewLogId === log.artifacts_id && (
                                <div styleName="log-feedback-wrapper">
                                  <div styleName="feedback-title">Feedback</div>
                                  {log.feedback.map((feedback) => (
                                    <div styleName="log-feedback">
                                      {feedback.link === "" && (
                                        <div styleName="feedback-message">
                                          {feedback.message}
                                        </div>
                                      )}
                                      {feedback.link !== "" && (
                                        <div styleName="feedback-link">
                                          <div styleName="feedback-msg-link">
                                            {feedback.message}
                                          </div>
                                          <div styleName="link">
                                            {feedback.link}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* {(role !== "Copilot" && !submissionCompleted) && (
        <div styleName="add-submission-wrapper">
          <button styleName="submission-btn">ADD SUBMISSION</button>
        </div>
      )} */}
    </div>
  );
};

SubmissionDetails.propTypes = {
  challengeId : PT.string,
  type: PT.string,
  role: PT.string,
};

export default SubmissionDetails;
