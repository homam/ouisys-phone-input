import React from "react";
import "./MSISDNEntry.scss";
export interface IProps {
    msisdn: string | null;
    currentState: any;
    onSubmit: any;
}
export default class MSISDNEntry extends React.PureComponent<IProps> {
    state: {
        msisdn: any;
        nationalNumber: string;
        internationalNumber: string;
        bupperNumber: string;
        isValid: boolean;
    };
    render(): JSX.Element;
}
