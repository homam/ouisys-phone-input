import React from "react";
import ReactDOM from "react-dom";
import HOC, {
  initialState,
  match,
  MOLink,
  mockMSISDNEntrySuccessState
} from "ouisys-clients/dist/clients/assrock-mo/HOC";
import * as RDS from "ouisys-clients/dist/common-types/RemoteDataState";
import MSISDNEntry from "./MSISDNEntry.tsx";
import mkTracker from "ouisys-clients/dist/pacman/record";
import SendMO from "./SendMO.tsx";

import "./styles.scss";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "test" //TODO: replace Unknown with your page's name
);

const visitor = {
  rockmanId: "47376ee0fcdc11e8af4d539a15930a23",
  impressionNumber: 1,
  country: "my",
  page: "iphone-xs",
  xaid: "BDMB",
  cid: 5,
  offer: 1419
};

class MyRoot extends React.PureComponent {
  state = {
    nationalNumber: "###",
    msisdn: null
  };
  render() {
    return (
      <div>
        {match({
          msisdnEntry: rds => {
            const Entry = (
              <MSISDNEntry
                msisdn={this.state.msisdn}
                currentState={rds}
                onSubmit={({ bupperNumber, nationalNumber, msisdn }) => {
                  this.setState({ nationalNumber, msisdn });
                  this.props.actions.submitMSISDN(window, null, bupperNumber);
                }}
              />
            );
            return RDS.match({
              nothingYet: () => Entry,
              loading: () => Entry,
              success: keywordAndShortcode => (
                <SendMO
                  nationalNumber={this.state.nationalNumber}
                  keywordAndShortcode={keywordAndShortcode}
                  backToStart={this.props.actions.backToStart}
                />
              ),
              failure: error => Entry
            })(rds);
          }
        })(this.props.currentState)}
        {/*<a href="tel:*556%23">Check balance</a>*/}
      </div>
    );
  }
}

const Root = HOC(tracker, MyRoot)(initialState);

function App() {
  return (
    <div className="App">
      <Root />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
