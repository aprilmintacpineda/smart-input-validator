import validator from '../../src/';

describe('Validations: in', () => {
  it('works with custom error message', () => {
    expect(
      validator(
        {
          value1: 'test'
        },
        {
          value1: 'in:testtt,teeeest,tesssst'
        },
        {
          value1: {
            in: 'Must be in.'
          }
        }
      )
    ).toEqual(['Must be in.']);
  });
  it('Should not return an error', () => {
    expect(
      validator(
        {
          value1: 'testtt'
        },
        {
          value1: 'in:testtt,teeeest,tesssst'
        },
        {
          value1: {
            in: 'Must be in.'
          }
        }
      )
    ).toEqual([]);

    expect(
      validator(
        {
          value1: 'teeeest'
        },
        {
          value1: 'in:testtt,teeeest,tesssst'
        },
        {
          value1: {
            in: 'Must be in.'
          }
        }
      )
    ).toEqual([]);

    expect(
      validator(
        {
          value1: 'tesssst'
        },
        {
          value1: 'in:testtt,teeeest,tesssst'
        },
        {
          value1: {
            in: 'Must be in.'
          }
        }
      )
    ).toEqual([]);
  });
});
