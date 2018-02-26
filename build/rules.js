'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
  /**
   * length related valitations
   */
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

  /**
   * value related validations
   */
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
      var regex = new RegExp('' + regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags);
      if (!regex.test(valueToValidate)) return -1;
    }
  },
  regex: function regex(valueToValidate, regexString) {
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (valueToValidate) {
      var regex = new RegExp('' + regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags);
      if (regex.test(valueToValidate)) return -1;
    }
  },
  equals: function equals(valueToValidate, b) {
    if (valueToValidate && b && valueToValidate != b) return -1;
  },
  email: function email(valueToValidate) {
    if (valueToValidate && valueToValidate.length) {
      var regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (valueToValidate.length > 254 || !regex.test(valueToValidate)) return -1;

      var _valueToValidate$spli = valueToValidate.split('@'),
          _valueToValidate$spli2 = _slicedToArray(_valueToValidate$spli, 2),
          address = _valueToValidate$spli2[0],
          domain = _valueToValidate$spli2[1];

      var _domain$split = domain.split('.'),
          _domain$split2 = _slicedToArray(_domain$split, 2),
          provider = _domain$split2[0],
          ext = _domain$split2[1];

      if (address.length > 64 || provider.length > 63 || ext.length > 63) return -1;
    }
  },
  in: function _in() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var value = args.shift();

    if (value.length && !args.includes(value)) return -1;
  },
  allowedChars: function allowedChars() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var value = args.shift();
    var regex = '';

    if (args.includes('alphabets')) regex += 'A-Za-z';
    if (args.includes('spaces')) regex += ' ';

    // :numbers
    if (args.includes('numbers') && !args.includes('decimals')) regex += '0-9';
    // :decimals,numbers || :decimals
    if (args.includes('decimals') && !args.includes('numbers') || args.includes('decimals') && args.includes('numbers')) regex += '0-9\.';

    regex = new RegExp('[^' + regex + ']+', 'igm');

    if (regex.test(value)) return -1;
  },

  required: function required(value) {
    var valueToValidate = value.toString();
    if (!valueToValidate || !valueToValidate.length || !valueToValidate.trim().length) return -1;
  },
  bool: function bool(value) {
    if (typeof value != 'boolean') return -1;
  }
};