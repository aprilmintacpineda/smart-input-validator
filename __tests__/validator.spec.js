import validator from '../src/index';

describe('validator', () => {
  describe('developer friendly errors', () => {
    it('throws error when param 1 is missing', () => {
      expect(() =>
        validator()
      ).toThrow();
    });

    it('throws error when param 1 is not an object', () => {
      expect(() =>
        validator('string')
      ).toThrow();
    });

    it('throws error when param 2 is missing', () => {
      expect(() =>
        validator({})
      ).toThrow();
    });

    it('throws error when param 2 is not an object', () => {
      expect(() =>
        validator({}, 'string')
      ).toThrow();
    });

    it('throws error when param 3 is not an object', () => {
      expect(() =>
        validator({}, {}, 'string')
      ).toThrow();
    });
  });

  describe('_$all', () => {
    it('uses _$all if the error message was not found', () => {
      expect(
        validator({
          value1: ''
        }, {
          value1: 'required'
        }, {
          value1: {
            _$all: 'value1 should not be empty!!'
          }
        })
      ).toEqual([ 'value1 should not be empty!!' ]);
    });
  });

  describe('_$options', () => {
    it('stopsAtFirstError', () => {
      expect(
        validator({
          value1: 'ab'
        }, {
          value1: 'betweenLen:3,6|minLen:5'
        })
      ).toEqual([
        'value1 must be 3 to 6 characters long.',
        'value1 must be at least 5 characters long.'
      ]);


      expect(
        validator({
          value1: 'ab'
        }, {
          value1: 'betweenLen:3,6|minLen:5',
          _$options: {
            stopAtFirstError: true
          }
        })
      ).toEqual([
        'value1 must be 3 to 6 characters long.'
      ]);
    });
  });
});