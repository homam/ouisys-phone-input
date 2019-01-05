"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getConfig", {
  enumerable: true,
  get: function get() {
    return _config.default;
  }
});
exports.default = void 0;

var _PhoneInput = _interopRequireDefault(require("./PhoneInput"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _PhoneInput.default;
exports.default = _default;