import validator from '../../src/';

describe('Validations: regex', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 15
        },
        {
          value1: 'regex:/[0-9]/'
        },
        {
          value1: {
            regex: 'Must not be a number.'
          }
        }
      )
    ).toEqual(['Must not be a number.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'abc'
        },
        {
          value1: 'regex:/[0-9]/'
        },
        {
          value1: {
            regex: 'Must not be a number.'
          }
        }
      )
    ).toEqual([]);
  });
});
