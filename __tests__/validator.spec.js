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
});