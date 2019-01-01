import * as React from "react";
import BasicInput from "react-phone-number-input/basic-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { parsePhoneNumber } from "libphonenumber-js";
import config from "./config";
const { countryCode, commonPrefix, maxLength } = config;
import { ReactComponent as Checkmark } from "./checkmark.svg";
import { ReactComponent as Errormark } from "./errormark.svg";
import "./PhoneInput.scss";
import "./checkmark.scss";

const country = process.env.country;

interface IProps {
  maxLength: number;
  msisdn?: string;
  placeholder: string;
  onChange: (msisdn: string) => void;
  showCountryCode: boolean;
  showFlag: boolean;
  showMobileIcon: boolean;
  showError: boolean;
}

function parseMSISDN(msisdn: string) {
  try {
    const parsedPhoneNumber = parsePhoneNumber(msisdn, country.toUpperCase());
    const nationalNumber = parsedPhoneNumber.formatNational();
    const internationalNumber = parsedPhoneNumber.formatInternational();
    const bupperNumber = getBupperNimber(nationalNumber);
    const isValid = isValidPhoneNumber(msisdn, country.toUpperCase());
    const internationalPrefix =
      parsedPhoneNumber.metadata.countries[country.toUpperCase()][0];
    return {
      nationalNumber,
      internationalNumber,
      bupperNumber,
      isValid,
      internationalPrefix
    };
  } catch (ex) {
    console.warn(ex);
    return {
      nationalNumber: "",
      internationalNumber: "",
      bupperNumber: "",
      isValid: false
    };
  }
}

function getBupperNimber(nationalNumber) {
  if (!nationalNumber || nationalNumber.length == 0) {
    return nationalNumber;
  } else {
    const match = nationalNumber.match(/\d+/gm);
    if (!match) {
      return nationalNumber;
    } else {
      return match.join("");
    }
  }
}

export default class MsisdnComponent extends React.Component<IProps> {
  inputElement = null;
  state = {
    isValid: false,
    showError: false
  };
  focusOnInputElement(ev) {
    const inputElement = this.inputElement;
    setTimeout(() => {
      if (!!inputElement) {
        inputElement.focus();
      }
    }, 10);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.showError != prevProps.showError) {
      this.setState({ showError: this.props.showError });
    }
  }
  render() {
    const focusOnInputElement = this.focusOnInputElement.bind(this);
    const showCountryCode =
      typeof this.props.showCountryCode == "boolean"
        ? this.props.showCountryCode
        : false;
    const showFlag =
      typeof this.props.showFlag == "boolean" ? this.props.showFlag : true;
    const showMobileIcon =
      typeof this.props.showMobileIcon == "boolean"
        ? this.props.showMobileIcon
        : true;
    return (
      <div className="phone-input">
        {showMobileIcon ? (
          <div
            className="phone"
            onMouseDown={focusOnInputElement}
            onTouchStart={focusOnInputElement}
          />
        ) : null}
        {showFlag ? (
          <div
            className="flag"
            onMouseDown={focusOnInputElement}
            onTouchStart={focusOnInputElement}
            style={{
              backgroundImage: `url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/${country}.svg')`
            }}
          />
        ) : null}
        {showCountryCode ? (
          <div className="country-code" onMouseDown={focusOnInputElement}>
            ({countryCode})
          </div>
        ) : null}
        <BasicInput
          ref={el => {
            this.inputElement = el;
          }}
          placeholder="Enter phone number"
          displayInitialValueAsLocalNumber
          country={country.toUpperCase()}
          className="text-input"
          value={this.props.msisdn}
          onChange={msisdn => {
            this.setState({ showError: false });
            const redo = msisdn => {
              const {
                nationalNumber,
                internationalNumber,
                bupperNumber,
                isValid,
                internationalPrefix
              } = parseMSISDN(msisdn);
              if (
                !isValid &&
                !!nationalNumber &&
                nationalNumber.indexOf(internationalPrefix) == 0
              ) {
                redo("+" + msisdn);
              } else {
                this.props.onChange({
                  msisdn,
                  isValid,
                  nationalNumber,
                  internationalNumber,
                  bupperNumber
                });
                this.setState({ isValid });
              }
            };

            redo(msisdn);
          }}
        />
        <div className="checkmark">
          {this.state.showError ? (
            <Errormark />
          ) : this.state.isValid ? (
            <Checkmark />
          ) : null}
        </div>
        {/*<DigitOnlyInput
          inputRef={el => {
            this.inputElement = el;
          }}
          value={this.props.msisdn}
          onChange={msisdn => this.props.onChange(msisdn)}
          className="text-input"
          type="tel"
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
        />*/}
      </div>
    );
  }
}
