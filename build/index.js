'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  var options = rules._$options ? _extends({}, rules._$options) : null;
  var newRules = _extends({}, rules);
  delete newRules._$options;

  Object.keys(newRules).forEach(function (field) {
    var targetField = field.replace(/\_$/, '');
    var segments = rules[targetField].split('|');

    for (var a = 0; a <= segments.length - 1; a++) {
      var segment = segments[a];

      if (!segment) continue;

      // rule:value

      var _segment$split = segment.split(':'),
          _segment$split2 = _slicedToArray(_segment$split, 2),
          rule = _segment$split2[0],
          val = _segment$split2[1];

      var validationResult = null;
      var cb_params = [];

      if (typeof _rules2.default[rule] == 'undefined') throw new Error('input-validator-js: unknown rule `' + rule + '` provided for field `' + field + '`. Please refer to the docs for more info.');
      if (typeof inputs[targetField] == 'undefined') throw new Error('input-validator-js: unknown field ' + field + ' in inputs.');

      // :value
      if (val) {
        if (val.includes(',')) {
          // :value1,value2,value3
          var vals = val.split(',');
          validationResult = _rules2.default[rule].apply(_rules2.default, [inputs[targetField]].concat(_toConsumableArray(vals)));
          cb_params.push.apply(cb_params, [field].concat(_toConsumableArray(vals)));
        } else if (inputs[val]) {
          // :another_field
          // where :another_field is in inputs[another_field]
          validationResult = _rules2.default[rule](inputs[targetField], inputs[val]);
          cb_params.push(field, inputs[val]);
        } else {
          // :value1
          validationResult = _rules2.default[rule](inputs[targetField], val);
          cb_params.push(field, val);
        }
      } else {
        // no :value was defined
        validationResult = _rules2.default[rule](inputs[targetField]);
        cb_params.push(field);
      }

      if (validationResult == -1) {
        if (customMesssages && customMesssages[targetField] && !customMesssages[targetField][rule] && customMesssages[targetField]._$all) {
          errors.add(customMesssages[targetField]._$all);
        } else if (customMesssages && customMesssages[targetField] && customMesssages[targetField][rule]) {
          errors.add(customMesssages[targetField][rule]);
        } else {
          errors.add(_defaults.errMessages[rule].apply(_defaults.errMessages, cb_params));
        }

        if (options && options.stopAtFirstError) break;
      }
    }
  });

  return Array.from(errors);
}