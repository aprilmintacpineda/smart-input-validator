"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getCharSetsForRegex(args) {
  var regex = '';
  if (args.includes('alphabets')) regex += 'A-Za-z';
  if (args.includes('spaces')) regex += ' ';

  if (args.includes('decimals') && args.includes('numbers') || args.includes('decimals') && !args.includes('numbers')) {
    regex += '0-9\\.';
  } else if (args.includes('numbers')) {
    regex += '0-9';
  }

  return regex;
}

function addNewErrorMessageOrIgnore(errors, message) {
  if (!errors.includes(message)) errors.push(message);
}

var validationRules = {
  minLen: function minLen(valueToValidate, len) {
    if (valueToValidate && valueToValidate.length < len) return -1;
  },
  maxLen: function maxLen(valueToValidate) {
    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    if (valueToValidate && valueToValidate.length > len) return -1;
  },
  betweenLen: function betweenLen(valueToValidate, min, max) {
    if (valueToValidate && (valueToValidate.length > max || valueToValidate.length < min)) return -1;
  },
  exactLen: function exactLen(valueToValidate, len) {
    if (valueToValidate && valueToValidate.length != len) return -1;
  },
  min: function min(valueToValidate, _min) {
    if (valueToValidate && parseFloat(valueToValidate) < _min) return -1;
  },
  max: function max(valueToValidate, _max) {
    if (valueToValidate && parseFloat(valueToValidate) > _max) return -1;
  },
  between: function between(valueToValidate, min, max) {
    if (valueToValidate) {
      var newVal = parseFloat(valueToValidate);
      return newVal > max || newVal < min ? -1 : 1;
    }
  },
  exactly: function exactly(valueToValidate, val) {
    if (valueToValidate && parseFloat(valueToValidate) != val) return -1;
  },
  notRegex: function notRegex(valueToValidate, regexString) {
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (valueToValidate) {
      if (!new RegExp(regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags).test(valueToValidate)) return -1;
    }
  },
  regex: function regex(valueToValidate, regexString) {
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (valueToValidate) {
      if (new RegExp(regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags).test(valueToValidate)) return -1;
    }
  },
  equals: function equals(valueToValidate, b) {
    if (valueToValidate && b && valueToValidate != b) return -1;
  },
  email: function email(valueToValidate) {
    if (valueToValidate && valueToValidate.length) {
      var regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      if (valueToValidate.length > 254 || !regex.test(valueToValidate)) return -1;
      var addressSplit = valueToValidate.split('@');
      var address = addressSplit[0];
      var domain = addressSplit[1];
      var domainSplit = domain.split('.');
      var provider = domainSplit[0];
      var ext = domainSplit[0];
      if (address.length > 64 || provider.length > 63 || ext.length > 63) return -1;
    }
  },
  in: function _in() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args[0].length && !args.slice(1).includes(args[0])) return -1;
  },
  allowedChars: function allowedChars() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (new RegExp('[^' + getCharSetsForRegex(args.slice(1)) + ']+', 'gim').test(args[0])) return -1;
  },
  notAllowedChars: function notAllowedChars() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    if (new RegExp('[' + getCharSetsForRegex(args.slice(1)) + ']+', 'gim').test(args[0])) return -1;
  },
  required: function required(value) {
    var valueToValidate = value.toString();
    if (!valueToValidate || !valueToValidate.length || !valueToValidate.trim().length) return -1;
  },
  bool: function bool(value) {
    if (typeof value != 'boolean') return -1;
  }
};

var _default = function _default(inputs, rules, errMessages) {
  if (!inputs || inputs.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object.');
  if (!rules || rules.constructor !== Object) throw new Error('input-validator-js: expected parameter 2 to be an object.');
  if (!errMessages || errMessages.constructor !== Object) throw new Error('input-validator-js: expected parameter 3 to be an object');
  var errors = [];
  var keys = Object.keys(rules);

  for (var a = 0; a < keys.length; a++) {
    if (keys[a] === '_$options') continue;
    var targetField = keys[a].replace(/\_$/, '');
    var segments = rules[targetField].split('; ');

    for (var b = 0; b <= segments.length - 1; b++) {
      if (!segments[b]) continue;
      var segment = segments[b].split(':');
      var rule = segment[0];
      var val = segment[1];
      var validationResult = null;
      var cb_params = [];
      if (validationRules[rule] === undefined) throw new Error('input-validator-js: unknown rule `' + rule + '` provided for field `' + keys[a] + '`. Please refer to the docs for more info.');
      if (inputs[targetField] === undefined) throw new Error('input-validator-js: unknown field ' + keys[a] + ' in inputs.');

      if (val) {
        if (val.includes(',')) {
          var vals = val.split(',');
          validationResult = validationRules[rule].apply(validationRules, [inputs[targetField]].concat(_toConsumableArray(vals)));
          cb_params.push.apply(cb_params, [keys[a]].concat(_toConsumableArray(vals)));
        } else if (inputs[val]) {
          validationResult = validationRules[rule](inputs[targetField], inputs[val]);
          cb_params.push(keys[a], inputs[val]);
        } else {
          validationResult = validationRules[rule](inputs[targetField], val);
          cb_params.push(keys[a], val);
        }
      } else {
        validationResult = validationRules[rule](inputs[targetField]);
        cb_params.push(keys[a]);
      }

      if (validationResult === -1) {
        if (errMessages && errMessages[targetField] && !errMessages[targetField][rule] && errMessages[targetField]._$all) {
          addNewErrorMessageOrIgnore(errors, errMessages[targetField]._$all);
        } else {
          addNewErrorMessageOrIgnore(errors, errMessages[targetField][rule]);
        }

        if (rules._$options && rules._$options.stopAtFirstError) break;
      }
    }
  }

  return errors;
};

exports.default = _default;