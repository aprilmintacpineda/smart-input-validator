import validator from '../../src/';

describe('Validations: required', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: ''
        },
        {
          value1: 'required'
        },
        {
          value1: {
            required: 'Must be cde.'
          }
        }
      )
    ).toEqual(['Must be cde.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'abc'
        },
        {
          value1: 'required'
        },
        {
          value1: {
            required: 'Must be cde.'
          }
        }
      )
    ).toEqual([]);
  });
});
