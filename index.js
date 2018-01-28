/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = validator;

var _defaults = __webpack_require__(1);

var _rules = __webpack_require__(2);

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function validator(inputs, rules) {
  var customMesssages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!inputs || inputs.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object.');
  if (!rules || rules.constructor !== Object) throw new Error('input-validator-js: expected parameter 2 to be an object.');
  if (customMesssages != null && customMesssages.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object');

  var errors = new Set();

  Object.keys(rules).forEach(function (field) {
    rules[field].split('|').forEach(function (segment) {
      // rule:value
      var _segment$split = segment.split(':'),
          _segment$split2 = _slicedToArray(_segment$split, 2),
          rule = _segment$split2[0],
          val = _segment$split2[1];

      var validationResult = null;
      var cb_params = [];

      if (!_rules2.default[rule]) throw new Error('input-validator-js: unknown rule `' + rule + '` provided for field `' + field + '`. Please refer to the docs for more info.');

      // :value
      if (val) {
        // :another_field
        // where :another_field is in inputs[another_field]
        if (inputs[val]) {
          validationResult = _rules2.default[rule]();
          cb_params.push(field, inputs[val]);
        } else if (val.includes(',')) {
          // :value1,value2,value3
          var vals = val.split(',');
          validationResult = _rules2.default[rule].apply(_rules2.default, [inputs[field]].concat(_toConsumableArray(vals)));
          cb_params.push.apply(cb_params, [field].concat(_toConsumableArray(vals)));
        } else {
          // :value1
          validationResult = _rules2.default[rule](inputs[field], val);
          cb_params.push(field, val);
        }
      } else {
        // no :value was defined
        validationResult = _rules2.default[rule](inputs[field]);
        cb_params.push(field);
      }

      if (validationResult == -1) {
        if (undefined == customMesssages || null == customMesssages || !customMesssages[field] || !customMesssages[field][rule]) {
          errors.add(_defaults.errMessages[rule].apply(_defaults.errMessages, cb_params));
        } else {
          errors.add(customMesssages[field][rule]);
        }
      }
    });
  });

  return Array.from(errors);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var errMessages = exports.errMessages = {
  required: function required(fieldName) {
    return fieldName + ' is required.';
  },
  equals: function equals(field, subject) {
    return field + ' does not match with ' + subject + '.';
  },
  min: function min(field, len) {
    return field + ' must be at least ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  max: function max(field, len) {
    return field + ' must be at least ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  between: function between(field, min, max) {
    return field + ' must be at least ' + min + ' to ' + max + ' characters long.';
  },
  email: function email() {
    return 'Invalid email.';
  },
  allowedChars: function allowedChars(field) {
    return field + ' has invalid characters.';
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
  required: function required(value) {
    if (!value || !value.length || !value.trim().length) return -1;
  },
  equals: function equals(val, b) {
    if (val.length && b.length && val != b) return -1;
  },
  min: function min(val, len) {
    if (val.length && val.length < len) return -1;
  },
  max: function max(val, len) {
    if (val.length && val.length > len) return -1;
  },
  between: function between(val, min, max) {
    if (val.length && (val.length > max || val.length < min)) return -1;
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
    if (args.includes('numbers')) regex += '0-9';

    regex = new RegExp('[^' + regex + ']+', 'igm');

    if (regex.test(value)) return -1;
  }
};

/***/ })
/******/ ]);