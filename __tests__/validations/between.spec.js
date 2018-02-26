import validator from '../../src/index';

describe('Validations: between', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'between:10,12'
      }, {
        value1: {
          between: 'Must be at least 10.'
        }
      })
    ).toEqual([ 'Must be at least 10.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'between:10,12'
      })
    ).toEqual([ 'value1 must be greater than or equal to 10 and less than or equal to 12.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 11
      }, {
        value1: 'between:10,12'
      })
    ).toEqual([]);
  });
});