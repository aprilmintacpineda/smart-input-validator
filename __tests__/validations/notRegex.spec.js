import validator from '../../build/index';

describe('Validations: notRegex', () => {
  it('works with custom error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'notRegex:/[a-z]/'
      }, {
        value1: {
          notRegex: 'Must be alphabets.'
        }
      })
    ).toEqual([ 'Must be alphabets.' ]);
  });
  it('works with default error message', () => {
    expect(
      validator({
        value1: 15
      }, {
        value1: 'notRegex:/[a-z]/'
      })
    ).toEqual([ 'value1 has invalid characters.' ]);
  });
  it('Should not return an error', () => {
    expect(
      validator({
        value1: 'abcde'
      }, {
        value1: 'notRegex:/[a-z]/'
      })
    ).toEqual([]);
  });
});