'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errMessages = {
  // length related validation messages,
  min: function min(field, len) {
    return field + ' must be at least ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  max: function max(field, len) {
    return field + ' must be at least ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  between: function between(field, min, max) {
    return field + ' must be at least ' + min + ' to ' + max + ' characters long.';
  },
  len: function len(field, _len) {
    return field + ' must be ' + _len + ' character' + (_len > 1 ? 's' : '') + ' long.';
  },
  // value related validation messages
  required: function required(fieldName) {
    return fieldName + ' is required.';
  },
  equals: function equals(field, subject) {
    return field + ' does not match with ' + subject + '.';
  },
  email: function email() {
    return 'Invalid email.';
  },
  allowedChars: function allowedChars(field) {
    return field + ' has invalid characters.';
  },
  regex: function regex(field) {
    return field + ' has invalid characters.';
  },
  notRegex: function notRegex(field) {
    return field + ' has invalid characters.';
  }
};
exports.errMessages = errMessages;