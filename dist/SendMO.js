"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SendMO;

var React = _interopRequireWildcard(require("react"));

var _HOC = require("ouisys-clients/dist/clients/assrock-mo/HOC");

var _SendMO = require("./SendMO.svg");

require("./SendMO.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function SendMO(_ref) {
  var keywordAndShortcode = _ref.keywordAndShortcode,
      nationalNumber = _ref.nationalNumber,
      backToStart = _ref.backToStart;
  return React.createElement("div", {
    className: "SendMO"
  }, "To confirm your number (", nationalNumber, "), send", React.createElement("div", {
    className: "keyword"
  }, keywordAndShortcode.keyword), "to", React.createElement("div", {
    className: "shortcode"
  }, keywordAndShortcode.shortcode), "by SMS. Or", " ", React.createElement(_HOC.MOLink, {
    className: "button",
    keywordAndShortcode: keywordAndShortcode
  }, React.createElement("div", null, React.createElement(_SendMO.ReactComponent, {
    className: "icon"
  }), React.createElement("div", null, "Click Here!"))), React.createElement("div", {
    className: "change-your-mobile-number"
  }, "Is ", nationalNumber, " not your mobile number?\xA0", React.createElement("a", {
    href: "javascript:void 6",
    onClick: function onClick() {
      return backToStart();
    }
  }, "Click here"), " ", "to change it."));
}