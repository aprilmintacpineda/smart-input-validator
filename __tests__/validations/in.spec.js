import validator from '../../src/index';

describe('Validations: in', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'test'
      }, {
        value1: 'in:testtt,teeeest,tesssst'
      }, {
        value1: {
          in: 'Must be in.'
        }
      })
    ).toEqual([ 'Must be in.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'test'
      }, {
        value1: 'in:testtt,teeeest,tesssst'
      })
    ).toEqual([ 'value1 is not a valid value.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'testtt'
      }, {
        value1: 'in:testtt,teeeest,tesssst'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 'teeeest'
      }, {
        value1: 'in:testtt,teeeest,tesssst'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: 'tesssst'
      }, {
        value1: 'in:testtt,teeeest,tesssst'
      })
    ).toEqual([]);
  });
});