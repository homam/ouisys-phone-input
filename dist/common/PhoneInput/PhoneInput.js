"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _basicInput = _interopRequireDefault(require("react-phone-number-input/basic-input"));

var _reactPhoneNumberInput = require("react-phone-number-input");

var _libphonenumberJs = require("libphonenumber-js");

var _config = _interopRequireDefault(require("./config"));

var _checkmark = require("./checkmark.svg");

var _errormark = require("./errormark.svg");

require("./PhoneInput.scss");

require("./checkmark.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

function parseMSISDN(country, msisdn) {
  try {
    var parsedPhoneNumber = (0, _libphonenumberJs.parsePhoneNumber)(msisdn, country.toUpperCase());

    var _nationalNumber = parsedPhoneNumber.formatNational();

    var _internationalNumber = parsedPhoneNumber.formatInternational();

    var _bupperNumber = getBupperNumber(_nationalNumber);

    var _isValid = (0, _reactPhoneNumberInput.isValidPhoneNumber)(msisdn, country.toUpperCase());

    var internationalPrefix = parsedPhoneNumber.metadata.countries[country.toUpperCase()][0];
    return {
      nationalNumber: _nationalNumber,
      internationalNumber: _internationalNumber,
      bupperNumber: _bupperNumber,
      isValid: _isValid,
      internationalPrefix: internationalPrefix
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

function getBupperNumber(nationalNumber) {
  if (!nationalNumber || nationalNumber.length == 0) {
    return nationalNumber;
  } else {
    var match = nationalNumber.match(/\d+/gm);

    if (!match) {
      return nationalNumber;
    } else {
      return match.join("");
    }
  }
}

var MsisdnComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MsisdnComponent, _React$Component);

  function MsisdnComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MsisdnComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MsisdnComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputElement", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      isValid: false,
      showError: false
    });

    return _this;
  }

  _createClass(MsisdnComponent, [{
    key: "focusOnInputElement",
    value: function focusOnInputElement(ev) {
      var inputElement = this.inputElement;
      setTimeout(function () {
        if (inputElement != null) {
          inputElement.focus();
        }
      }, 20);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.showError != prevProps.showError) {
        this.setState({
          showError: this.props.showError
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var country = this.props.countryCode;

      var _getConfig = (0, _config.default)(country),
          countryCode = _getConfig.countryCode,
          commonPrefix = _getConfig.commonPrefix,
          maxLength = _getConfig.maxLength;

      var focusOnInputElement = this.focusOnInputElement.bind(this);
      var showCountryCode = typeof this.props.showCountryCode == "boolean" ? this.props.showCountryCode : false;
      var showFlag = typeof this.props.showFlag == "boolean" ? this.props.showFlag : true;
      var showMobileIcon = typeof this.props.showMobileIcon == "boolean" ? this.props.showMobileIcon : true;
      return React.createElement("div", {
        className: "phone-input"
      }, showMobileIcon ? React.createElement("div", {
        className: "phone",
        onMouseDown: focusOnInputElement,
        onTouchStart: focusOnInputElement
      }) : null, showFlag ? React.createElement("div", {
        className: "flag",
        onMouseDown: focusOnInputElement,
        onTouchStart: focusOnInputElement,
        style: {
          backgroundImage: "url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.2.1/flags/4x3/".concat(country, ".svg')")
        }
      }) : null, showCountryCode ? React.createElement("div", {
        className: "country-code",
        onMouseDown: focusOnInputElement
      }, "(", countryCode, ")") : null, React.createElement(_basicInput.default, {
        ref: function ref(el) {
          _this2.inputElement = el;
        },
        placeholder: "Enter phone number",
        displayInitialValueAsLocalNumber: true,
        country: country.toUpperCase(),
        className: "text-input",
        value: this.props.msisdn,
        onChange: function onChange(msisdn) {
          _this2.setState({
            showError: false
          });

          var redo = function redo(msisdn) {
            var _parseMSISDN = parseMSISDN(country, msisdn),
                nationalNumber = _parseMSISDN.nationalNumber,
                internationalNumber = _parseMSISDN.internationalNumber,
                bupperNumber = _parseMSISDN.bupperNumber,
                isValid = _parseMSISDN.isValid,
                internationalPrefix = _parseMSISDN.internationalPrefix;

            if (!isValid && !!nationalNumber && nationalNumber.indexOf(internationalPrefix) == 0) {
              redo("+" + msisdn);
            } else {
              _this2.props.onChange({
                msisdn: msisdn,
                isValid: isValid,
                nationalNumber: nationalNumber,
                internationalNumber: internationalNumber,
                bupperNumber: bupperNumber
              });

              _this2.setState({
                isValid: isValid
              });
            }
          };

          redo(msisdn);
        }
      }), React.createElement("div", {
        className: "checkmark"
      }, this.state.showError ? React.createElement(_errormark.ReactComponent, null) : this.state.isValid ? React.createElement(_checkmark.ReactComponent, null) : null));
    }
  }]);

  return MsisdnComponent;
}(React.Component);

exports.default = MsisdnComponent;