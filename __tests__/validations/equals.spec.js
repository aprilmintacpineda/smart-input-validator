import validator from '../../build/index';

describe('Validations: equals', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 'abc'
      }, {
        value1: 'equals:cde'
      }, {
        value1: {
          equals: 'Must be cde.'
        }
      })
    ).toEqual([ 'Must be cde.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 'abc'
      }, {
        value1: 'equals:cde'
      })
    ).toEqual([ 'value1 does not match with cde.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'cde'
      }, {
        value1: 'equals:cde'
      })
    ).toEqual([]);
  });
});