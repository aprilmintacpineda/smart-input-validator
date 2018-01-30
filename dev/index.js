/**
 * You can use this file to test functionalities
 */

import validator from '../src';

let result = validator({
  name: 'test ing 123'
}, {
  name: `len:10|notRegex:/(^[a-zA-Z ]+$)/`
}, {
  name: {
    len: 'I want your name to be exactly 10 characters long!',
    notRegex: 'I want your name to contain only alphabets and spaces!'
  }
});

console.log(result);