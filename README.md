# Docs
- [change logs](https://github.com/aprilmintacpineda/smart-input-validator/tree/master/changelogs)

# Guide

## Install

```
npm i -s smart-input-validator
```

## usage

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

#### Example codes

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

# List of validation rules

## General Format

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

#### Length related validations

- `input1: 'exactLen:255'` -- a field whose exact string length is 255.
- `input1: 'minLen:8'` -- a field whose minimum string length is 8.
- `input1: 'maxLen:255'` -- a field whose maximum string length is 255.
- `input1: 'betweenLen:8,18'` -- a field whose maximum string length is 18 and minimum string length is 8.

#### Value related validations

- `input1: 'min:8'` -- a numeric field whose minimum value is 8.
- `input1: 'max:255'` -- a numeric field whose maximum value is 255.
- `input1: 'between:8,18'` -- a numeric field whose value should be 8 to 18.
- `input1: 'exactly:255'` -- a numeric field whose value should be exactly 255.
- `input1: 'required'` -- a field that should not be an empty __string__.
- `input1: 'email'` -- a field that should be a valid email.
- `input1: 'allowedChars:alphabets,spaces,numbers,decimals'` -- a field that is restricted only to a particular set of characters. Accepted values are **alphabets,spaces,numbers,decimals**. Note that if you specify **decimals** you don't need to specify **numbers**.
- `input1: 'notAllowedChars:alphabets,spaces,numbers,decimals'` -- Similar to allowedChars, except you specify the character set that you don't allow.
- `input1: 'in:choice 1,choice 2,choice 3,...n'` -- a field that is restricted only to the available choices.

#### Equality related validations

- `input1: 'equals:another_field'` -- a field that is equal to another field. `another_field` could be a field in the `fields` parameter or an actual value.
- `input1: 'regex:/([a-zA-Z])/'` -- a field that has specific characters allowed. Note that **regex** is affirmative. That means error occurs if `value.test(regex) == true`.
- `input1: 'notRegex:/([a-zA-Z])/'` -- a field that has specific characters allowed. Note that **notRegex** is negative. That means error occurs if `value.test(regex) == false`.
- `input1: 'bool'` -- a field that should be a boolean.

# Handling validations with similar error messages with `$_all`

## What it does

`_$all` is a `string` that basically acts as the default error that you can provide. If a field has an error and you did not provide a custom error message for that field, __but__ the `_$all` was provided on that field, then it will use it.

## Use case

- If you want two or more validation rules to have the same error messages.

## Usage

You provide `_$all` in the `custom error messages` parameter.

```js
import validator from 'smart-input-validator';

const errors = validator({
  value1: 'val',
  value2: 'val',
}, {
  value1: 'allowedChars:numbers|betweenLen:8,18|minLen:8',
  value2: 'allowedChars:numbers|betweenLen:8,18|minLen:8'
}, {
  value1: {
    allowedChars: 'allowedChars error message for value1.'
  },
  value2: {
    betweenLen: 'betweenLen error message for value2.'
  }
});

console.log(errors);
```

The codes above will output.

```js
[ 'allowedChars error message for value1.',
  'value1 must be 8 to 18 characters long.',
  'value1 must be at least 8 characters long.',
  'value2 has invalid characters.',
  'betweenLen error message for value2.',
  'value2 must be at least 8 characters long.' ]
```

Built-in default error message was given as errors. But if you provide `_$all`:

```js
import validator from 'smart-input-validator';

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
```

The codes above will now output:

```js
[ 'allowedChars error message for value1.',
  'default custom error message for value1.',
  'default custom error message for value2.',
  'betweenLen error message for value2.' ]
```

Now the `_$all` was used as default error message.

# Validation options

## What it does

`_$options` is an object that can be added to the second parameter, which is the validation rules. It basically tells the validator how to behave.

## Usage

```js
import validator from 'smart-input-validator';

const errors = validator({
  value1: 'val',
  value2: 'val',
}, {
  value1: 'allowedChars:numbers|betweenLen:8,18|minLen:8',
  value2: 'allowedChars:numbers|betweenLen:8,18|minLen:8'
}, {
  value1: {
    allowedChars: 'allowedChars error message for value1.'
  },
  value2: {
    betweenLen: 'betweenLen error message for value2.'
  }
});

console.log(errors);
```

The codes above will output:

```js

[ 'allowedChars error message for value1.',
  'value1 must be 8 to 18 characters long.',
  'value1 must be at least 8 characters long.',
  'value2 has invalid characters.',
  'betweenLen error message for value2.',
  'value2 must be at least 8 characters long.' ]
```

This is the default behavior. If you provide `_$options` you can change the way it behaves. `_$options` can be provided like so:

```
import validator from 'smart-input-validator';

const errors = validator({
  value1: 'val',
  value2: 'val',
}, {
  value1: 'allowedChars:numbers|betweenLen:8,18|minLen:8',
  value2: 'allowedChars:numbers|betweenLen:8,18|minLen:8',
  _$options: {
    stopAtFirstError: true
  }
}, {
  value1: {
    allowedChars: 'allowedChars error message for value1.'
  },
  value2: {
    betweenLen: 'betweenLen error message for value2.'
  }
});

console.log(errors);
```

The codes above will ouput:

```
[ 'allowedChars error message for value1.',
  'value2 has invalid characters.' ]
```

## Options

- `_$options.stopAtFirstError` -- __not required__ -- tells the validator to stop at the very first error occurrence, so if an error was encountered on the very first occurrence, the validation will stop there and move to validated the next field.

## Discussions / Contributions

If you have a new feature request, feature enhancement request, bug report, clarification, or if you have something you want to point out about the docs, feel free to open an issue or send a PR.

## License

MIT