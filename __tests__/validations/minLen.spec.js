import validator from '../../src/index';

describe('Validations: minLen', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'minLen:8'
      }, {
        value1: {
          minLen: 'Min length of 8.'
        }
      })
    ).toEqual([ 'Min length of 8.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'minLen:8'
      })
    ).toEqual([ 'value1 must be at least 8 characters long.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'abcde'
      }, {
        value1: 'minLen:3'
      })
    ).toEqual([]);


    expect(
      validator({
        value1: 'abc'
      }, {
        value1: 'minLen:3'
      })
    ).toEqual([]);
  });
});