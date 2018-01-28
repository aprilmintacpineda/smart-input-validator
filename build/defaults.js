'use strict';

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