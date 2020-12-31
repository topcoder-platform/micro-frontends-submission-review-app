import React, { useRef, useEffect } from "react";
import Zip from "../../assets/images/zip.svg";
import Close from "../../assets/images/cancel.svg";
import "./styles.module.scss";



const SubmissionModal = ({ handleClose, show }) => {

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
        /**
         * Close if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose()
            }
        }
  
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }
  
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div styleName={showHideClassName}>
      <div styleName="modal-main" ref={wrapperRef}>
        <header styleName="submission-modal-header">
          <div styleName="modal-header-1">
            <div styleName="submission-zip-wrapper">
              <Zip styleName="zip-svg" />
              <div styleName="submission-zip-text">Submission.zip</div>
            </div>
            <button onClick={handleClose} styleName="close-btn">
              <Close styleName="cancel-svg" />
            </button>
          </div>
          <div styleName="modal-header-2">
            <button styleName="unzip-file-btn">Unzip File</button>
            <div styleName="unzip-text">
              Unzip and then open the files on local.
            </div>
          </div>
        </header>

        <div styleName="submission-modal-body">
          {/* This is just for demonstration purpose */}
          {/* Body of this div will be replaced by original contents of div */}
          <p style={{ color: "#aa476a" }}>{"<!DOCTYPE html>"}</p>
          <p style={{ color: "#aa476a" }}>{"<html>"}</p>
          <p style={{ color: "#aa476a", marginLeft: "25px" }}>{"<head>"}</p>
          <p style={{ color: "#aa476a", marginLeft: "50px" }}>
            {"    <title>"}
          </p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {"     Contents of Submission Zip"}
          </p>
          <p style={{ color: "#aa476a", marginLeft: "50px" }}>
            {"    </title>"}
          </p>
          <p style={{ color: "#aa476a", marginLeft: "25px" }}>{"  </head>"}</p>
          <p style={{ color: "#aa476a", marginLeft: "25px" }}>{"  <body>"}</p>
          <p style={{ color: "#aa476a", marginLeft: "50px" }}>{"    <p>"}</p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {"     This are some contents of zip"}
          </p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {"     Need to be replaced with original contents of zip"}
          </p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {"     This is just for the demonstration"}
          </p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {
              "     These texts are hard coded, designed only for Submission Modal Demonstration"
            }
          </p>
          <p style={{ color: "##999999", marginLeft: "85px" }}>
            {"     This are some contents of zip"}
          </p>
          <p style={{ color: "#aa476a", marginLeft: "50px" }}>{"    </p>"}</p>
          <p style={{ color: "#aa476a", marginLeft: "2px" }}>{"  </body>"}</p>
          <p style={{ color: "#aa476a" }}>{"</html>"}</p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default SubmissionModal;
