import validator from '../../build/index';

describe('Validations: exactly', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'exactly:10'
      }, {
        value1: {
          exactly: 'Must be 10.'
        }
      })
    ).toEqual([ 'Must be 10.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'exactly:10'
      })
    ).toEqual([ 'value1 must be equal to 10.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 11
      }, {
        value1: 'exactly:11'
      })
    ).toEqual([]);
  });
});