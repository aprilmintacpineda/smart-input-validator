import validator from '../../src/';

describe('Validations: between', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 15
        },
        {
          value1: 'between:10,12'
        },
        {
          value1: {
            between: 'Must be at least 10.'
          }
        }
      )
    ).toEqual(['Must be at least 10.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 11
        },
        {
          value1: 'between:10,12'
        },
        {
          value1: {
            between: 'Must be between 10 to 12.'
          }
        }
      )
    ).toEqual([]);
  });
});
