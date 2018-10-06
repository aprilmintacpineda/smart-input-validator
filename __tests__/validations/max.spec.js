import validator from '../../src/';

describe('Validations: max', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 15
        },
        {
          value1: 'max:10'
        },
        {
          value1: {
            max: 'Must less or 10.'
          }
        }
      )
    ).toEqual(['Must less or 10.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 1
        },
        {
          value1: 'max:10'
        },
        {
          value1: {
            max: 'Must less or 10.'
          }
        }
      )
    ).toEqual([]);

    expect(
      validator(
        {
          value1: 10
        },
        {
          value1: 'max:10'
        },
        {
          value1: {
            max: 'Must less or 10.'
          }
        }
      )
    ).toEqual([]);
  });
});
