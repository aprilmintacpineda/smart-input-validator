import validator from '../src/';

describe('validator', () => {
  describe('developer friendly errors', () => {
    it('throws error when param 1 is missing', () => {
      expect(() => validator()).toThrow();
    });

    it('throws error when param 1 is not an object', () => {
      expect(() => validator('string')).toThrow();
    });

    it('throws error when param 2 is missing', () => {
      expect(() => validator({})).toThrow();
    });

    it('throws error when param 2 is not an object', () => {
      expect(() => validator({}, 'string')).toThrow();
    });

    it('throws error when param 3 is missing', () => {
      expect(() => validator({}, {})).toThrow();
    });

    it('throws error when param 3 is not an object', () => {
      expect(() => validator({}, {}, 'string')).toThrow();
    });
  });

  describe('_$all', () => {
    it('uses _$all if the error message was not found', () => {
      expect(
        validator(
          {
            value1: ''
          },
          {
            value1: 'required'
          },
          {
            value1: {
              _$all: 'value1 should not be empty!!'
            }
          }
        )
      ).toEqual(['value1 should not be empty!!']);

      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'minLen:3; allowedChars:decimals'
          },
          {
            value1: {
              minLen: 'Min length of 3.',
              _$all: 'value1 is invalid.'
            }
          }
        )
      ).toEqual(['Min length of 3.', 'value1 is invalid.']);

      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'minLen:3; allowedChars:decimals'
          },
          {
            value1: {
              minLen: 'Min length of 3.',
              allowedChars: 'Must be decimals.',
              _$all: 'value1 is invalid.'
            }
          }
        )
      ).toEqual(['Min length of 3.', 'Must be decimals.']);
    });
  });

  describe('_$options', () => {
    it('stopsAtFirstError', () => {
      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'betweenLen:3,6; minLen:5'
          },
          {
            value1: {
              betweenLen: 'Must be of length 3 to 6.',
              minLen: 'Must be of length of at least 5.'
            }
          }
        )
      ).toEqual([
        'Must be of length 3 to 6.',
        'Must be of length of at least 5.'
      ]);

      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'betweenLen:3,6; minLen:5',
            _$options: {
              stopAtFirstError: true
            }
          },
          {
            value1: {
              betweenLen: 'Must be of length 3 to 6.',
              minLen: 'Must be of length of at least 5.'
            }
          }
        )
      ).toEqual(['Must be of length 3 to 6.']);
    });
  });

  describe('rules', () => {
    it('should ignore empty rules', () => {
      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'betweenLen:3,6; minLen:5'
          },
          {
            value1: {
              betweenLen: 'Must be of length 3 to 6.',
              minLen: 'Must be of length of at least 5.'
            }
          }
        )
      ).toEqual([
        'Must be of length 3 to 6.',
        'Must be of length of at least 5.'
      ]);
    });

    it('does not return repeating error messages', () => {
      expect(
        validator(
          {
            value1: 'ab'
          },
          {
            value1: 'minLen:5; allowedChars:decimals'
          },
          {
            value1: {
              allowedChars: 'Invalid.',
              minLen: 'Invalid.'
            }
          }
        )
      ).toEqual(['Invalid.']);
    });
  });
});
