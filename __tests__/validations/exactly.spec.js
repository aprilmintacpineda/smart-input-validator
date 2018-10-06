import validator from '../../src/';

describe('Validations: exactly', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 15
        },
        {
          value1: 'exactly:10'
        },
        {
          value1: {
            exactly: 'Must be 10.'
          }
        }
      )
    ).toEqual(['Must be 10.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 11
        },
        {
          value1: 'exactly:11'
        },
        {
          value1: {
            exactly: 'Must be 11.'
          }
        }
      )
    ).toEqual([]);
  });
});
