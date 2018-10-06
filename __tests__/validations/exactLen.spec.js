import validator from '../../src/';

describe('Validations: exactLen', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 'length'
        },
        {
          value1: 'exactLen:2'
        },
        {
          value1: {
            exactLen: 'Must be of length 2.'
          }
        }
      )
    ).toEqual(['Must be of length 2.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'cde'
        },
        {
          value1: 'exactLen:3'
        },
        {
          value1: {
            exactLen: 'Must be of length 2.'
          }
        }
      )
    ).toEqual([]);
  });
});
