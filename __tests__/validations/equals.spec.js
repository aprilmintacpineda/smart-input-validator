import validator from '../../src/';

describe('Validations: equals', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 'abc'
        },
        {
          value1: 'equals:cde'
        },
        {
          value1: {
            equals: 'Must be cde.'
          }
        }
      )
    ).toEqual(['Must be cde.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'cde'
        },
        {
          value1: 'equals:cde'
        },
        {
          value1: {
            equals: 'Must be cde.'
          }
        }
      )
    ).toEqual([]);
  });
});
