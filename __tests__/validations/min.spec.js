import validator from '../../src/index';

describe('Validations: min', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 1
      }, {
        value1: 'min:10'
      }, {
        value1: {
          min: 'Must be at least 10.'
        }
      })
    ).toEqual([ 'Must be at least 10.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 1
      }, {
        value1: 'min:10'
      })
    ).toEqual([ 'value1 must be equal to or greater than 10.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 5
      }, {
        value1: 'min:1'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 1
      }, {
        value1: 'min:1'
      })
    ).toEqual([]);
  });
});