function getCharSetsForRegex (args) {
  let regex = '';
  if (args.includes('alphabets')) regex += 'A-Za-z';
  if (args.includes('spaces')) regex += ' ';

  if (
    (args.includes('decimals') && args.includes('numbers')) ||
    (args.includes('decimals') && !args.includes('numbers'))
  ) {
    // :decimals,numbers || :decimals
    regex += '0-9\\.';
  } else if (args.includes('numbers')) {
    // :numbers
    regex += '0-9';
  }

  return regex;
}

function addNewErrorMessageOrIgnore (errors, message) {
  if (!errors.includes(message)) errors.push(message);
}

const validationRules = {
  /**
   * length related valitations
   */
  minLen (valueToValidate, len) {
    if (valueToValidate && valueToValidate.length < len) return -1;
  },
  maxLen (valueToValidate, len = 1) {
    if (valueToValidate && valueToValidate.length > len) return -1;
  },
  betweenLen (valueToValidate, min, max) {
    if (
      valueToValidate &&
      (valueToValidate.length > max || valueToValidate.length < min)
    )
      return -1;
  },
  exactLen (valueToValidate, len) {
    if (valueToValidate && valueToValidate.length != len) return -1;
  },
  /**
   * value related validations
   */
  min (valueToValidate, min) {
    if (valueToValidate && parseFloat(valueToValidate) < min) return -1;
  },
  max (valueToValidate, max) {
    if (valueToValidate && parseFloat(valueToValidate) > max) return -1;
  },
  between (valueToValidate, min, max) {
    if (valueToValidate) {
      const newVal = parseFloat(valueToValidate);
      return newVal > max || newVal < min ? -1 : 1;
    }
  },
  exactly: (valueToValidate, val) => {
    if (valueToValidate && parseFloat(valueToValidate) != val) return -1;
  },
  notRegex: (valueToValidate, regexString, flags = '') => {
    if (valueToValidate) {
      if (
        !new RegExp(
          regexString.replace(/^\/+/, '').replace(/\/+$/, ''),
          flags
        ).test(valueToValidate)
      )
        return -1;
    }
  },
  regex: (valueToValidate, regexString, flags = '') => {
    if (valueToValidate) {
      if (
        new RegExp(
          regexString.replace(/^\/+/, '').replace(/\/+$/, ''),
          flags
        ).test(valueToValidate)
      )
        return -1;
    }
  },
  equals: (valueToValidate, b) => {
    if (valueToValidate && b && valueToValidate != b) return -1;
  },
  email: valueToValidate => {
    if (valueToValidate && valueToValidate.length) {
      const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (valueToValidate.length > 254 || !regex.test(valueToValidate))
        return -1;

      const addressSplit = valueToValidate.split('@');
      const address = addressSplit[0];
      const domain = addressSplit[1];
      const domainSplit = domain.split('.');
      const provider = domainSplit[0];
      const ext = domainSplit[0];

      if (address.length > 64 || provider.length > 63 || ext.length > 63)
        return -1;
    }
  },
  in (...args) {
    if (args[0].length && !args.slice(1).includes(args[0])) return -1;
  },
  allowedChars (...args) {
    if (
      new RegExp('[^' + getCharSetsForRegex(args.slice(1)) + ']+', 'gim').test(
        args[0]
      )
    )
      return -1;
  },
  notAllowedChars (...args) {
    if (
      new RegExp('[' + getCharSetsForRegex(args.slice(1)) + ']+', 'gim').test(
        args[0]
      )
    )
      return -1;
  },
  required: value => {
    const valueToValidate = value.toString();
    if (
      !valueToValidate ||
      !valueToValidate.length ||
      !valueToValidate.trim().length
    )
      return -1;
  },
  bool: value => {
    if (typeof value != 'boolean') return -1;
  }
};

export default (inputs, rules, errMessages) => {
  if (!inputs || inputs.constructor !== Object)
    throw new Error(
      'input-validator-js: expected parameter 1 to be an object.'
    );
  if (!rules || rules.constructor !== Object)
    throw new Error(
      'input-validator-js: expected parameter 2 to be an object.'
    );
  if (!errMessages || errMessages.constructor !== Object)
    throw new Error('input-validator-js: expected parameter 3 to be an object');

  const errors = [];
  const keys = Object.keys(rules);

  for (let a = 0; a < keys.length; a++) {
    if (keys[a] === '_$options') continue;

    const targetField = keys[a].replace(/\_$/, '');
    const segments = rules[targetField].split('; ');

    for (let b = 0; b <= segments.length - 1; b++) {
      if (!segments[b]) continue;

      // rule:value
      const segment = segments[b].split(':');
      const rule = segment[0];
      const val = segment[1];
      let validationResult = null;
      let cb_params = [];

      if (validationRules[rule] === undefined)
        throw new Error(
          'input-validator-js: unknown rule `' +
            rule +
            '` provided for field `' +
            keys[a] +
            '`. Please refer to the docs for more info.'
        );
      if (inputs[targetField] === undefined)
        throw new Error(
          'input-validator-js: unknown field ' + keys[a] + ' in inputs.'
        );

      // :value
      if (val) {
        if (val.includes(',')) {
          // :value1,value2,value3
          const vals = val.split(',');
          validationResult = validationRules[rule](
            inputs[targetField],
            ...vals
          );
          cb_params.push(keys[a], ...vals);
        } else if (inputs[val]) {
          // :another_field
          // where :another_field is in inputs[another_field]
          validationResult = validationRules[rule](
            inputs[targetField],
            inputs[val]
          );
          cb_params.push(keys[a], inputs[val]);
        } else {
          // :value1
          validationResult = validationRules[rule](inputs[targetField], val);
          cb_params.push(keys[a], val);
        }
      } else {
        // no :value was defined
        validationResult = validationRules[rule](inputs[targetField]);
        cb_params.push(keys[a]);
      }

      if (validationResult === -1) {
        if (
          errMessages &&
          errMessages[targetField] &&
          !errMessages[targetField][rule] &&
          errMessages[targetField]._$all
        ) {
          addNewErrorMessageOrIgnore(errors, errMessages[targetField]._$all);
        } else {
          addNewErrorMessageOrIgnore(errors, errMessages[targetField][rule]);
        }

        if (rules._$options && rules._$options.stopAtFirstError) break;
      }
    }
  }

  return errors;
};
