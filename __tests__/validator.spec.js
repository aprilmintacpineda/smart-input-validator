import validator from '../index';

describe('validator', () => {
  describe('input validation', () => {
    it('returns custom error message', () => {
      expect(validator({
        firstname: ''
      }, {
        firstname: 'required'
      }, {
        firstname: {
          required: 'First name cannot be empty.'
        }
      })).toEqual([ 'First name cannot be empty.' ]);
    });
  
    it('returns default message', () => {
      expect(validator({
        firstname: ''
      }, {
        firstname: 'required'
      })).toEqual([ 'firstname is required.' ]);
    });
  });

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
});