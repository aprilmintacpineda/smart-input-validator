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

export default {
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
    if (valueToValidate
     && (valueToValidate.length > max
      || valueToValidate.length < min)) return -1;
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
      return newVal > max || newVal < min? -1 : 1;
    }
  },
  exactly: (valueToValidate, val) => {
    if (valueToValidate && parseFloat(valueToValidate) != val) return -1;
  },
  notRegex: (valueToValidate, regexString, flags = '') => {
    if (valueToValidate) {
      const regex = new RegExp(`${regexString.replace(/^\/+/, '').replace(/\/+$/, '')}`, flags);
      if (!regex.test(valueToValidate)) return -1;
    }
  },
  regex: (valueToValidate, regexString, flags = '') => {
    if (valueToValidate) {
      const regex = new RegExp(`${regexString.replace(/^\/+/, '').replace(/\/+$/, '')}`, flags);
      if (regex.test(valueToValidate)) return -1;
    }
  },
  equals: (valueToValidate, b) => {
    if (valueToValidate && b && valueToValidate != b) return -1;
  },
  email: valueToValidate => {
    if (valueToValidate && valueToValidate.length) {
      const regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (valueToValidate.length > 254
      || !regex.test(valueToValidate)) return -1;

      const [address, domain] = valueToValidate.split('@');
      const [provider, ext] = domain.split('.');

      if (address.length > 64
      || provider.length > 63
      || ext.length > 63) return -1;
    }
  },
  in (...args) {
    if (args[0].length && !args.slice(1).includes(args[0])) return -1;
  },
  allowedChars (...args) {
    if (new RegExp(`[^${getCharSetsForRegex(args.slice(1))}]+`, 'igm').test(args[0])) return -1;
  },
  notAllowedChars (...args) {
    if (new RegExp(`[${getCharSetsForRegex(args.slice(1))}]+`, 'igm').test(args[0])) return -1;
  },
  required: value => {
    const valueToValidate = value.toString();
    if (!valueToValidate || !valueToValidate.length || !valueToValidate.trim().length) return -1;
  },
  bool: value => {
    if (typeof value != 'boolean') return -1;
  }
};