import validator from '../../build/index';

describe('Validations: exactLen', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'exactLen:2'
      }, {
        value1: {
          exactLen: 'Must be of length 2.'
        }
      })
    ).toEqual([ 'Must be of length 2.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'exactLen:2'
      })
    ).toEqual([ 'value1 must be 2 characters long.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'cde'
      }, {
        value1: 'exactLen:3'
      })
    ).toEqual([]);
  });
});