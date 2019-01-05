"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var RDS = _interopRequireWildcard(require("ouisys-clients/dist/common-types/RemoteDataState"));

var _PhoneInput = _interopRequireWildcard(require("./common/PhoneInput"));

require("./MSISDNEntry.scss");

var _Loading = require("./Loading.svg");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var COUNTRY = process.env.REACT_APP_COUNTRY || process.env.country || "xx";
var okAudio = new Audio(process.env.PUBLIC_URL + "/checkmark.m4a" // "https://sounds.pond5.com/quiz-correct-sound-effect-049974748_prev.m4a"
);

var _getConfig = (0, _PhoneInput.getConfig)(COUNTRY),
    commonPrefix = _getConfig.commonPrefix;

var MSISDNEntry =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MSISDNEntry, _React$PureComponent);

  function MSISDNEntry() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MSISDNEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MSISDNEntry)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      msisdn: _this.props.msisdn || commonPrefix,
      nationalNumber: "",
      internationalNumber: "",
      bupperNumber: "",
      isValid: false
    });

    return _this;
  }

  _createClass(MSISDNEntry, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "MSISDNEntry"
      }, _react.default.createElement("div", {
        className: "info"
      }, "Enter your mobile number to start:"), _react.default.createElement(_PhoneInput.default, {
        countryCode: COUNTRY,
        placeholder: "Phone number",
        msisdn: this.state.msisdn,
        onChange: function onChange(_ref) {
          var msisdn = _ref.msisdn,
              isValid = _ref.isValid,
              nationalNumber = _ref.nationalNumber,
              internationalNumber = _ref.internationalNumber,
              bupperNumber = _ref.bupperNumber;

          if (isValid) {
            okAudio.play().catch(console.warn);

            _this2.props.onSubmit({
              bupperNumber: bupperNumber,
              nationalNumber: nationalNumber,
              internationalNumber: internationalNumber,
              msisdn: msisdn
            });
          }

          _this2.setState({
            msisdn: msisdn,
            isValid: isValid,
            nationalNumber: nationalNumber,
            internationalNumber: internationalNumber,
            bupperNumber: bupperNumber
          });
        },
        showError: RDS.IsFailure(this.props.currentState)
      }), _react.default.createElement("button", {
        className: "button msisdn-submit-button",
        disabled: !this.state.isValid
      }, RDS.IsLoading(this.props.currentState) ? _react.default.createElement(_Loading.ReactComponent, {
        className: "loading-icon"
      }) : "GO!"), RDS.IsFailure(this.props.currentState) ? _react.default.createElement("div", {
        className: "errors"
      }, "It seems you have entered an incorrect mobile number. Please double check your number and try again.") : null);
    }
  }]);

  return MSISDNEntry;
}(_react.default.PureComponent);

exports.default = MSISDNEntry;