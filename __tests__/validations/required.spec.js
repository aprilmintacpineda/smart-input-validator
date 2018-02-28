import validator from '../../build/index';

describe('Validations: required', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: ''
      }, {
        value1: 'required'
      }, {
        value1: {
          required: 'Must be cde.'
        }
      })
    ).toEqual([ 'Must be cde.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: ''
      }, {
        value1: 'required'
      })
    ).toEqual([ 'value1 is required.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'abc'
      }, {
        value1: 'required'
      })
    ).toEqual([]);
  });
});