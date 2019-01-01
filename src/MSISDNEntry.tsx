import React from "react";
import * as RDS from "ouisys-clients/dist/common-types/RemoteDataState";
import PhoneInput, { commonPrefix } from "./common/PhoneInput";
import "./MSISDNEntry.scss";
import { ReactComponent as LoadingIcon } from "./Loading.svg";

const okAudio = new Audio(
  process.env.PUBLIC_URL + "/checkmark.m4a"
  // "https://sounds.pond5.com/quiz-correct-sound-effect-049974748_prev.m4a"
);
export interface IProps {
  msisdn: string | null;
  currentState: any
  onSubmit: any
}
export default class MSISDNEntry extends React.PureComponent<IProps> {
  state = {
    msisdn: this.props.msisdn || commonPrefix,
    nationalNumber: "",
    internationalNumber: "",
    bupperNumber: "",
    isValid: false
  };
  render() {
    return (
      <div className="MSISDNEntry">
        <div className="info">Enter your mobile number to start:</div>
        <PhoneInput
          placeholder="Phone number"
          msisdn={this.state.msisdn}
          onChange={({
            msisdn,
            isValid,
            nationalNumber,
            internationalNumber,
            bupperNumber
          }) => {
            if (isValid) {
              okAudio.play().catch(console.warn);
              this.props.onSubmit({
                bupperNumber,
                nationalNumber,
                internationalNumber,
                msisdn
              });
            }
            this.setState({
              msisdn,
              isValid,
              nationalNumber,
              internationalNumber,
              bupperNumber
            });
          }}
          showError={RDS.IsFailure(this.props.currentState)}
        />
        <button
          className="button msisdn-submit-button"
          disabled={!this.state.isValid}
        >
          {RDS.IsLoading(this.props.currentState) ? (
            <LoadingIcon className="loading-icon" />
          ) : (
            "GO!"
          )}
        </button>
        {RDS.IsFailure(this.props.currentState) ? (
          <div className="errors">
            It seems you have entered an incorrect mobile number. Please double
            check your number and try again.
          </div>
        ) : null}
      </div>
    );
  }
}
