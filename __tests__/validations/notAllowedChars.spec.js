import validator from '../../build/index';

describe('Validations: notAllowedChars', () => {
  describe('alphabets', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'notAllowedChars:alphabets'
        }, {
          value1: {
            notAllowedChars: 'Must not have alphabets.'
          }
        })
      ).toEqual([ 'Must not have alphabets.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'notAllowedChars:alphabets'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: '123123'
        }, {
          value1: 'notAllowedChars:alphabets'
        })
      ).toEqual([]);
    });
  });
  describe('spaces', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: 'abc abc'
        }, {
          value1: 'notAllowedChars:spaces'
        }, {
          value1: {
            notAllowedChars: 'Must not have spaces.'
          }
        })
      ).toEqual([ 'Must not have spaces.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: 'abc abc'
        }, {
          value1: 'notAllowedChars:spaces'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 'abcabc'
        }, {
          value1: 'notAllowedChars:spaces'
        })
      ).toEqual([]);
    });
  });
  describe('numbers', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: '123123'
        }, {
          value1: 'notAllowedChars:numbers'
        }, {
          value1: {
            notAllowedChars: 'Must not have numbers.'
          }
        })
      ).toEqual([ 'Must not have numbers.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: '123123'
        }, {
          value1: 'notAllowedChars:numbers'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'notAllowedChars:numbers'
        })
      ).toEqual([]);
    });
  });
  describe('decimals', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: 123.123
        }, {
          value1: 'notAllowedChars:decimals'
        }, {
          value1: {
            notAllowedChars: 'Must not be a decimal.'
          }
        })
      ).toEqual([ 'Must not be a decimal.' ]);


      expect(
        validator({
          value1: 123
        }, {
          value1: 'notAllowedChars:decimals'
        }, {
          value1: {
            notAllowedChars: 'Must not be a decimal.'
          }
        })
      ).toEqual([ 'Must not be a decimal.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: 123.123
        }, {
          value1: 'notAllowedChars:decimals'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);

      expect(
        validator({
          value1: 123
        }, {
          value1: 'notAllowedChars:decimals'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'notAllowedChars:decimals'
        })
      ).toEqual([]);

      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'notAllowedChars:numbers,decimals'
        })
      ).toEqual([]);
    });
  });
});