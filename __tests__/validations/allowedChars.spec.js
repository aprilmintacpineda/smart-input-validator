import validator from '../../build/index';

describe('Validations: allowedChars', () => {
  describe('alphabets', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:alphabets'
        }, {
          value1: {
            allowedChars: 'Must be alphabets.'
          }
        })
      ).toEqual([ 'Must be alphabets.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:alphabets'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 'abc'
        }, {
          value1: 'allowedChars:alphabets'
        })
      ).toEqual([]);
    });
  });
  describe('spaces', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:spaces'
        }, {
          value1: {
            allowedChars: 'Must be spaces.'
          }
        })
      ).toEqual([ 'Must be spaces.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:spaces'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: '   '
        }, {
          value1: 'allowedChars:spaces'
        })
      ).toEqual([]);
    });
  });
  describe('numbers', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:numbers'
        }, {
          value1: {
            allowedChars: 'Must be numbers.'
          }
        })
      ).toEqual([ 'Must be numbers.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:numbers'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 1203
        }, {
          value1: 'allowedChars:numbers'
        })
      ).toEqual([]);
    });
  });
  describe('decimals', () => {
    it('works with custom error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:decimals'
        }, {
          value1: {
            allowedChars: 'Must be decimals.'
          }
        })
      ).toEqual([ 'Must be decimals.' ]);
    });
    it('works with default error message', () => {
      expect(
        validator({
          value1: '!@#'
        }, {
          value1: 'allowedChars:decimals'
        })
      ).toEqual([ 'value1 has invalid characters.' ]);
    });
    it('Should not return an error', () => {
      expect(
        validator({
          value1: 123
        }, {
          value1: 'allowedChars:decimals'
        })
      ).toEqual([]);

      expect(
        validator({
          value1: 123.213
        }, {
          value1: 'allowedChars:decimals'
        })
      ).toEqual([]);

      expect(
        validator({
          value1: 123.213
        }, {
          value1: 'allowedChars:numbers,decimals'
        })
      ).toEqual([]);
    });
  });
});