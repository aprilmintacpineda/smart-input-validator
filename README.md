# smart-input-validator

## Docs
- [Validation rules](https://github.com/aprilmintacpineda/smart-input-validator/wiki/List-of-Validation-Rules)
- [change logs](https://github.com/aprilmintacpineda/smart-input-validator/changelogs)

## Guide

#### Install

```
npm install --save smart-input-validator
```

#### usage

Validator takes 3 parameters. The third one is an optional parameter.

```js
validator(inputs, rules[, customErrorMessages])
```

- **inputs** is a key-value pair where the key is the field name and the value is the user input.
- **rules** is a key-value pair where the key is the field and the value will be the rules for the validation of that field. Each rules are separated by `|`. Don't add spaces before and after `,`, `:` and `|`.
- **customErrorMessages** is a multi-dimension key-value pair, the first dimension is the field and the second dimension is another key-value pair where the key is the rule and the value is the error message that will be returned.

The general format is as follows:

```js
let errors = validator(
  // parameter 1 is user inputs
  {
    input1: 'value1',
    input2: 'value2'
  },
  // parameter 2 is the rules for the inputs
  {
    input1: 'rule1|rule2|rule3|rule4:value1,value2,value3|rule5:value1'
  },
  // parameter 3 is the optional custom error messages for the validations
  {
    input1: {
      rule1: 'error!',
      rule2: 'error!',
      rule3: 'error!',
      rule4: 'error!'
    }
  }
);
```

###### Example codes

```js
import validator from 'smart-input-validator';

let errors = validator({
  email: 'invalid-email',
  firstname: '',
  password: 'do',
  confirm_password: 'will-not-match'
}, {
  email: 'required|email',
  firstname: 'required|allowedChars:alphabets,spaces',
  password: 'required|min:8',
  confirm_password: 'required|equals:password'
}, {
  email: {
    required: 'Please enter your email.',
    email: 'Your email is invalid.'
  },
  firstname: {
    required: 'Please enter your first name.',
    allowedChars: 'Your first name is invalid.'
  },
  password: {
    required: 'Please enter your password.',
    min: 'Your password is too short.'
  },
  confirm_password: {
    required: 'Please enter your password again.',
    equals: 'Passwords do not match.'
  }
});
```

The variable `errors` above will be an array of error messages like so:

```js
[
  'Your email is invalid.',
  'Please enter your first name.',
  'Your password is too short.',
  'Passwords do not match.'
]
```

You can also have validations with the same error messages and only one will show.

```js
import validator from 'smart-input-validator';

let errors = validator({
  name: 'a'
}, {
  name: 'required|allowedChars:alphabets,spaces|min:2',
}, {
  name: {
    required: 'Please enter your name.',
    allowedChars: 'Your name is invalid.',
    min: 'Your name is invalid.'
  }
});
```

The error will be like so:

```
[
  'Your name is invalid.'
]
```

## Discussions / Contributions

If you have a new feature request, feature enhancement request, bug report, clarification, or if you have something you want to point out about the docs, feel free to open an issue or send a PR.