import * as React from "react";
import HOC, {
  initialState,
  match,
  MOLink,
  mockMSISDNEntrySuccessState
} from "ouisys-clients/dist/clients/assrock-mo/HOC";
import { ReactComponent as SMSIcon } from "./SendMO.svg";
import "./SendMO.scss";

export default function SendMO({
  keywordAndShortcode,
  nationalNumber,
  backToStart
}) {
  return (
    <div className="SendMO">
      To confirm your number ({nationalNumber}), send
      <div className="keyword">{keywordAndShortcode.keyword}</div>
      to
      <div className="shortcode">{keywordAndShortcode.shortcode}</div>
      by SMS. Or{" "}
      <MOLink className="button" keywordAndShortcode={keywordAndShortcode}>
        <SMSIcon className="icon" />
        <div>Click Here!</div>
      </MOLink>
      <div className="change-your-mobile-number">
        Is {nationalNumber} not your mobile number?&nbsp;
        <a href="javascript:void 6" onClick={() => backToStart()}>
          Click here
        </a>{" "}
        to change it.
      </div>
    </div>
  );
}
