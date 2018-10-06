import validator from '../../src/';

describe('Validations: allowedChars', () => {
  describe('alphabets', () => {
    it('works with custom error message', () => {
      expect(
        validator(
          {
            value1: '!@#'
          },
          {
            value1: 'allowedChars:alphabets'
          },
          {
            value1: {
              allowedChars: 'Must be alphabets.'
            }
          }
        )
      ).toEqual(['Must be alphabets.']);
    });
    it('Should not return an error', () => {
      expect(
        validator(
          {
            value1: 'abc'
          },
          {
            value1: 'allowedChars:alphabets'
          },
          {
            value1: {
              allowedChars: 'Must be spaces.'
            }
          }
        )
      ).toEqual([]);
    });
  });
  describe('spaces', () => {
    it('works with custom error message', () => {
      expect(
        validator(
          {
            value1: '!@#'
          },
          {
            value1: 'allowedChars:spaces'
          },
          {
            value1: {
              allowedChars: 'Must be spaces.'
            }
          }
        )
      ).toEqual(['Must be spaces.']);
    });
    it('Should not return an error', () => {
      expect(
        validator(
          {
            value1: '   '
          },
          {
            value1: 'allowedChars:spaces'
          },
          {
            value1: {
              allowedChars: 'Must be spaces.'
            }
          }
        )
      ).toEqual([]);
    });
  });
  describe('numbers', () => {
    it('works with custom error message', () => {
      expect(
        validator(
          {
            value1: '!@#'
          },
          {
            value1: 'allowedChars:numbers'
          },
          {
            value1: {
              allowedChars: 'Must be numbers.'
            }
          }
        )
      ).toEqual(['Must be numbers.']);
    });
    it('Should not return an error', () => {
      expect(
        validator(
          {
            value1: 1203
          },
          {
            value1: 'allowedChars:numbers'
          },
          {
            value1: {
              allowedChars: 'Must be numbers.'
            }
          }
        )
      ).toEqual([]);
    });
  });
  describe('decimals', () => {
    it('works with custom error message', () => {
      expect(
        validator(
          {
            value1: '!@#'
          },
          {
            value1: 'allowedChars:decimals'
          },
          {
            value1: {
              allowedChars: 'Must be decimals.'
            }
          }
        )
      ).toEqual(['Must be decimals.']);
    });
    it('Should not return an error', () => {
      expect(
        validator(
          {
            value1: 123
          },
          {
            value1: 'allowedChars:decimals'
          },
          {
            value1: {
              allowedChars: 'Must be decimals.'
            }
          }
        )
      ).toEqual([]);

      expect(
        validator(
          {
            value1: 123.213
          },
          {
            value1: 'allowedChars:decimals'
          },
          {
            value1: {
              allowedChars: 'Must be decimals.'
            }
          }
        )
      ).toEqual([]);

      expect(
        validator(
          {
            value1: 123.213
          },
          {
            value1: 'allowedChars:numbers,decimals'
          },
          {
            value1: {
              allowedChars: 'Must be decimals.'
            }
          }
        )
      ).toEqual([]);
    });
  });
});
