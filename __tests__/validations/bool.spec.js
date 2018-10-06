import validator from '../../src/';

describe('Validations: bool', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: ''
        },
        {
          value1: 'bool'
        },
        {
          value1: {
            bool: 'Must be bool.'
          }
        }
      )
    ).toEqual(['Must be bool.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: false
        },
        {
          value1: 'bool'
        },
        {
          value1: {
            bool: 'Must be bool.'
          }
        }
      )
    ).toEqual([]);

    expect(
      validator(
        {
          value1: true
        },
        {
          value1: 'bool'
        },
        {
          value1: {
            bool: 'Must be bool.'
          }
        }
      )
    ).toEqual([]);
  });
});
