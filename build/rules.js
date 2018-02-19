'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
  /**
   * length related valitations
   */
  min: function min(val, len) {
    if (val && val.length < len) return -1;
  },
  max: function max(val, len) {
    if (val && val.length > len) return -1;
  },
  between: function between(val, min, max) {
    if (val && (val.length > max || val.length < min)) return -1;
  },
  len: function len(val, _len) {
    if (val && val.length != _len) return -1;
  },
  /**
   * value related validations
   */
  notRegex: function notRegex(val, regexString) {
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (val) {
      var regex = new RegExp('' + regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags);
      if (!regex.test(val)) return -1;
    }
  },
  regex: function regex(val, regexString) {
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (val) {
      var regex = new RegExp('' + regexString.replace(/^\/+/, '').replace(/\/+$/, ''), flags);
      if (regex.test(val)) return -1;
    }
  },
  equals: function equals(val, b) {
    if (val && b && val != b) return -1;
  },
  email: function email(val) {
    if (val && val.length) {
      var regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (val.length > 254 || !regex.test(val)) return -1;

      var _val$split = val.split('@'),
          _val$split2 = _slicedToArray(_val$split, 2),
          address = _val$split2[0],
          domain = _val$split2[1];

      var _domain$split = domain.split('.'),
          _domain$split2 = _slicedToArray(_domain$split, 2),
          provider = _domain$split2[0],
          ext = _domain$split2[1];

      if (address.length > 64 || provider.length > 63 || ext.length > 63) return -1;
    }
  },
  in: function _in() {
    for (var _len2 = arguments.length, args = Array(_len2), _key = 0; _key < _len2; _key++) {
      args[_key] = arguments[_key];
    }

    var value = args.shift();

    if (value.length && !args.includes(value)) return -1;
  },
  allowedChars: function allowedChars() {
    for (var _len3 = arguments.length, args = Array(_len3), _key2 = 0; _key2 < _len3; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var value = args.shift();
    var regex = '';

    if (args.includes('alphabets')) regex += 'A-Za-z';
    if (args.includes('spaces')) regex += ' ';

    // :numbers
    if (args.includes('numbers') && !args.includes('decimals')) regex += '0-9';
    // :decimals,numbers && :decimals
    if (args.includes('decimals') && !args.includes('numbers') || args.includes('decimals') && args.includes('numbers')) regex += '0-9\.';

    regex = new RegExp('[^' + regex + ']+', 'igm');

    if (regex.test(value)) return -1;
  },

  required: function required(value) {
    var val = value.toString();
    if (!val || !val.length || !val.trim().length) return -1;
  }
};