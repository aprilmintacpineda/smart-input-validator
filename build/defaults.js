'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errMessages = exports.errMessages = {
  // length related validation messages,
  minLen: function minLen(field, len) {
    return field + ' must be at least ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  maxLen: function maxLen(field, len) {
    return field + ' must be less than ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  betweenLen: function betweenLen(field, min, max) {
    return field + ' must be ' + min + ' to ' + max + ' characters long.';
  },
  exactLen: function exactLen(field, len) {
    return field + ' must be ' + len + ' character' + (len > 1 ? 's' : '') + ' long.';
  },
  // value related validation messages
  min: function min(field, len) {
    return field + ' must be equal to or greater than ' + len + '.';
  },
  max: function max(field, len) {
    return field + ' must be less than or equal to ' + len + '.';
  },
  between: function between(field, min, max) {
    return field + ' must be greater than or equal to ' + min + ' and less than or equal to ' + max + '.';
  },
  exactly: function exactly(field, len) {
    return field + ' must be equal to ' + len + '.';
  },
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
  },
  bool: function bool(field) {
    return field + ' must be a boolean.';
  },
  in: function _in(field) {
    return field + ' is not a valid value.';
  }
};