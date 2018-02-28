import validator from '../../build/index';

describe('Validations: betweenLen', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'betweenLen:2,3'
      }, {
        value1: {
          betweenLen: 'Must be 2 to 3.'
        }
      })
    ).toEqual([ 'Must be 2 to 3.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'length'
      }, {
        value1: 'betweenLen:2,3'
      })
    ).toEqual([ 'value1 must be 2 to 3 characters long.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'aa'
      }, {
        value1: 'betweenLen:2,3'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 'aaa'
      }, {
        value1: 'betweenLen:2,3'
      })
    ).toEqual([]);
  });
});