import validator from '../../build/index';

describe('Validations: bool', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: ''
      }, {
        value1: 'bool'
      }, {
        value1: {
          bool: 'Must be bool.'
        }
      })
    ).toEqual([ 'Must be bool.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: ''
      }, {
        value1: 'bool'
      })
    ).toEqual([ 'value1 must be a boolean.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: false
      }, {
        value1: 'bool'
      })
    ).toEqual([]);

    expect(
      validator({
        value1: true
      }, {
        value1: 'bool'
      })
    ).toEqual([]);
  });
});