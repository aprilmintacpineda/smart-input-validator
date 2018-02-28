import validator from '../../build/index';

describe('Validations: maxLen', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'maxLen:3'
      }, {
        value1: {
          maxLen: 'Max length of 3.'
        }
      })
    ).toEqual([ 'Max length of 3.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'maxLen:3'
      })
    ).toEqual([ 'value1 must be less than 3 characters long.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'cde'
      }, {
        value1: 'maxLen:3'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 'c'
      }, {
        value1: 'maxLen:3'
      })
    ).toEqual([]);
  });
});