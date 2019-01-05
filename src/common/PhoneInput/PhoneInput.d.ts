import * as React from "react";
import "./PhoneInput.scss";
import "./checkmark.scss";
declare module "libphonenumber-js" {
    interface PhoneNumber {
        metadata: any;
    }
}
declare type IPropsChange = {
    msisdn: string;
    isValid: boolean;
    nationalNumber: string;
    internationalNumber: string;
    bupperNumber: string;
};
interface IProps {
    countryCode: string;
    msisdn?: string;
    placeholder: string;
    onChange: (args: IPropsChange) => void;
    showCountryCode?: boolean;
    showFlag?: boolean;
    showMobileIcon?: boolean;
    showError: boolean;
}
export default class MsisdnComponent extends React.Component<IProps> {
    inputElement: null;
    state: {
        isValid: boolean;
        showError: boolean;
    };
    focusOnInputElement(ev: any): void;
    componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void;
    render(): JSX.Element;
}
export {};
