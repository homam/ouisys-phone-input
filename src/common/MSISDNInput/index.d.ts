import * as React from "react";
import "./MSISDNInput.scss";
interface IProps {
    maxLength: number;
    msisdn?: string;
    countryCode: string;
    placeholder: string;
    onChange: (msisdn: string) => void;
}
export default class MsisdnComponent extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
