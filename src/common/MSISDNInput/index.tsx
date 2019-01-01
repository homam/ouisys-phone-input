import * as React from "react";
import DigitOnlyInput from "../DigitOnlyInput/index";
import "./MSISDNInput.scss";

interface IProps {
  maxLength: number;
  msisdn?: string;
  countryCode: string;
  placeholder: string;
  onChange: (msisdn: string) => void;
}

export default class MsisdnComponent extends React.Component<IProps> {
  render() {
    return (
      <div className="App">
        <div className="msisdn-wrapper">
          <div className="country-code country-code-qa">
            ({this.props.countryCode})
          </div>
          <DigitOnlyInput
            value={this.props.msisdn}
            onChange={msisdn => this.props.onChange(msisdn)}
            className="msisdn-input"
            type="tel"
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
          />
        </div>
      </div>
    );
  }
}
