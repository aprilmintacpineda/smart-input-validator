/**
 * You can use this file to test functionalities
 */

import validator from '../src';

let result = validator({
  myNumber: 12435434.123
}, {
  myNumber: `required|allowedChars:decimals`
}, {
  myNumber: {
    required: 'Required!',
    allowedChars: 'The number has invalid characters.'
  }
});

console.log(result);