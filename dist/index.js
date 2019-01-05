"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _HOC = _interopRequireWildcard(require("ouisys-clients/dist/clients/assrock-mo/HOC"));

var RDS = _interopRequireWildcard(require("ouisys-clients/dist/common-types/RemoteDataState"));

var _MSISDNEntry = _interopRequireDefault(require("./MSISDNEntry"));

var _record = _interopRequireDefault(require("ouisys-clients/dist/pacman/record"));

var _SendMO = _interopRequireDefault(require("./SendMO"));

require("./styles.scss");

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

var tracker = (0, _record.default)(typeof window != "undefined" ? window : null, "xx", "test" //TODO: replace Unknown with your page's name
);
var visitor = {
  rockmanId: "47376ee0fcdc11e8af4d539a15930a23",
  impressionNumber: 1,
  country: "my",
  page: "iphone-xs",
  xaid: "BDMB",
  cid: 5,
  offer: 1419
};

var MyRoot =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MyRoot, _React$PureComponent);

  function MyRoot() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MyRoot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MyRoot)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      nationalNumber: "###",
      msisdn: null
    });

    return _this;
  }

  _createClass(MyRoot, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, (0, _HOC.match)({
        msisdnEntry: function msisdnEntry(rds) {
          var Entry = _react.default.createElement(_MSISDNEntry.default, {
            msisdn: _this2.state.msisdn,
            currentState: rds,
            onSubmit: function onSubmit(_ref) {
              var bupperNumber = _ref.bupperNumber,
                  nationalNumber = _ref.nationalNumber,
                  msisdn = _ref.msisdn;

              _this2.setState({
                nationalNumber: nationalNumber,
                msisdn: msisdn
              });

              _this2.props.actions.submitMSISDN(window, null, bupperNumber);
            }
          });

          return RDS.match({
            nothingYet: function nothingYet() {
              return Entry;
            },
            loading: function loading() {
              return Entry;
            },
            success: function success(keywordAndShortcode) {
              return _react.default.createElement(_SendMO.default, {
                nationalNumber: _this2.state.nationalNumber,
                keywordAndShortcode: keywordAndShortcode,
                backToStart: _this2.props.actions.backToStart
              });
            },
            failure: function failure(error) {
              return Entry;
            }
          })(rds);
        }
      })(this.props.currentState));
    }
  }]);

  return MyRoot;
}(_react.default.PureComponent);

var Root = (0, _HOC.default)(tracker, MyRoot)(_HOC.initialState);

function App() {
  return _react.default.createElement("div", {
    className: "App"
  }, _react.default.createElement(Root, null));
}

var rootElement = document.getElementById("root");

_reactDom.default.render(_react.default.createElement(App, null), rootElement);