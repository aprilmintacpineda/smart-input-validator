'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = validator;

var _defaults = require('./defaults');

var _rules = require('./rules');

var _rules2 = _interopRequireDefault(_rules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function validator(inputs, rules) {
  var customMesssages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!inputs || inputs.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object.');
  if (!rules || rules.constructor !== Object) throw new Error('input-validator-js: expected parameter 2 to be an object.');
  if (customMesssages && customMesssages.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object');

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

      if (typeof _rules2.default[rule] == 'undefined') throw new Error('input-validator-js: unknown rule `' + rule + '` provided for field `' + field + '`. Please refer to the docs for more info.');
      if (typeof inputs[field] == 'undefined') throw new Error('input-validator-js: unknown field ' + field + ' in inputs.');

      // :value
      if (val) {
        if (val.includes(',')) {
          // :value1,value2,value3
          var vals = val.split(',');
          validationResult = _rules2.default[rule].apply(_rules2.default, [inputs[field]].concat(_toConsumableArray(vals)));
          cb_params.push.apply(cb_params, [field].concat(_toConsumableArray(vals)));
        } else if (inputs[val]) {
          // :another_field
          // where :another_field is in inputs[another_field]
          validationResult = _rules2.default[rule](inputs[field], inputs[val]);
          cb_params.push(field, inputs[val]);
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