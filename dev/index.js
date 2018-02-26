/**
 * You can use this file to test functionalities
 */

import validator from '../src';

const errors = validator({
  value1: 'val',
  value2: 'val',
}, {
  value1: 'allowedChars:numbers|betweenLen:8,18|minLen:8',
  value2: 'allowedChars:numbers|betweenLen:8,18|minLen:8'
}, {
  value1: {
    allowedChars: 'allowedChars error message for value1.',
    _$all: 'default custom error message for value1.'
  },
  value2: {
    betweenLen: 'betweenLen error message for value2.',
    _$all: 'default custom error message for value2.'
  }
});

console.log(errors);