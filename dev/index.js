/**
 * You can use this file to test functionalities
 */

import validator from '../src';

let result = validator({
  password: 'test password'
}, {
  password: `required|equals:repassword|min:8`
}, {
  password: {
    required: 'Please enter your desired password.',
    equals: 'Passwords do not match.',
    min: 'Password must be at least 8 characters long.'
  }
});

console.log(result);