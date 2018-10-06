import validator from '../../src/';

describe('Validations: betweenLen', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 'length'
        },
        {
          value1: 'betweenLen:2,3'
        },
        {
          value1: {
            betweenLen: 'Must be 2 to 3.'
          }
        }
      )
    ).toEqual(['Must be 2 to 3.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'aa'
        },
        {
          value1: 'betweenLen:2,3'
        },
        {
          value1: {
            betweenLen: 'Must be 2 to 3.'
          }
        }
      )
    ).toEqual([]);

    expect(
      validator(
        {
          value1: 'aaa'
        },
        {
          value1: 'betweenLen:2,3'
        },
        {
          value1: {
            betweenLen: 'Must be 2 to 3.'
          }
        }
      )
    ).toEqual([]);
  });
});
