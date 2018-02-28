import validator from '../../build/index';

describe('Validations: max', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'max:10'
      }, {
        value1: {
          max: 'Must less or 10.'
        }
      })
    ).toEqual([ 'Must less or 10.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'max:10'
      })
    ).toEqual([ 'value1 must be less than or equal to 10.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 1
      }, {
        value1: 'max:10'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 10
      }, {
        value1: 'max:10'
      })
    ).toEqual([]);
  });
});