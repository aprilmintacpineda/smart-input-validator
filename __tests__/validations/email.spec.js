import validator from '../../src/';

describe('Validations: email', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 'test'
        },
        {
          value1: 'email'
        },
        {
          value1: {
            email: 'Must be email.'
          }
        }
      )
    ).toEqual(['Must be email.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'test@test.com'
        },
        {
          value1: 'email'
        },
        {
          value1: {
            email: 'Must be email.'
          }
        }
      )
    ).toEqual([]);
  });
});
