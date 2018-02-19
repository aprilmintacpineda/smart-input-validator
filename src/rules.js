export default {
  /**
   * length related valitations
   */
  min: (val, len) => {
    if (val && val.length < len) return -1;
  },
  max: (val, len) => {
    if (val && val.length > len) return -1;
  },
  between: (val, min, max) => {
    if (val
     && (val.length > max
      || val.length < min)) return -1;
  },
  len: (val, len) => {
    if (val && val.length != len) return -1;
  },
  /**
   * value related validations
   */
  notRegex: (val, regexString, flags = '') => {
    if (val) {
      let regex = new RegExp(`${regexString.replace(/^\/+/, '').replace(/\/+$/, '')}`, flags);
      if (!regex.test(val)) return -1;
    }
  },
  regex: (val, regexString, flags = '') => {
    if (val) {
      let regex = new RegExp(`${regexString.replace(/^\/+/, '').replace(/\/+$/, '')}`, flags);
      if (regex.test(val)) return -1;
    }
  },
  equals: (val, b) => {
    if (val && b && val != b) return -1;
  },
  email: val => {
    if (val && val.length) {
      let regex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      if (val.length > 254
      || !regex.test(val)) return -1;

      let [address, domain] = val.split('@');
      let [provider, ext] = domain.split('.');

      if (address.length > 64
      || provider.length > 63
      || ext.length > 63) return -1;
    }
  },
  in: (...args) => {
    let value = args.shift();

    if (value.length && !args.includes(value)) return -1;
  },
  allowedChars(...args) {
    let value = args.shift();
    let regex = '';

    if (args.includes('alphabets')) regex += 'A-Za-z';
    if (args.includes('spaces')) regex += ' ';
    
    // :numbers
    if (args.includes('numbers') && !args.includes('decimals')) regex += '0-9';
    // :decimals,numbers && :decimals
    if ((args.includes('decimals') && !args.includes('numbers'))
     || (args.includes('decimals') && args.includes('numbers'))) regex += '0-9\.';

    regex = new RegExp(`[^${regex}]+`, 'igm');

    if (regex.test(value)) return -1;
  },
  required: value => {
    let val = value.toString();
    if (!val || !val.length || !val.trim().length) return -1;
  }
};