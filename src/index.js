import { errMessages as defaultErrMessages } from './defaults';
import validationRules from './rules';

export default function validator(inputs, rules, customMesssages = null) {
  if (!inputs || inputs.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object.');
  if (!rules || rules.constructor !== Object) throw new Error('input-validator-js: expected parameter 2 to be an object.');
  if (customMesssages && customMesssages.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object');

  const errors = new Set;
  const options = rules._$options
    ? { ...rules._$options }
    : null;
  let newRules = { ...rules };
  delete newRules._$options;

  Object.keys(newRules).forEach(field => {
    const targetField = field.replace(/\_$/, '');
    const segments = rules[targetField].split('|');

    for (let a = 0; a <= segments.length - 1; a++) {
      const segment = segments[a];

      // rule:value
      const [rule, val] = segment.split(':');
      let validationResult = null;
      let cb_params = [];

      if (typeof validationRules[rule] == 'undefined') throw new Error(`input-validator-js: unknown rule \`${rule}\` provided for field \`${field}\`. Please refer to the docs for more info.`);
      if (typeof inputs[targetField] == 'undefined') throw new Error(`input-validator-js: unknown field ${field} in inputs.`);

      // :value
      if (val) {
        if (val.includes(',')) {
          // :value1,value2,value3
          const vals =  val.split(',');
          validationResult = validationRules[rule](inputs[targetField], ...vals);
          cb_params.push(field, ...vals);
        } else if (inputs[val]) {
          // :another_field
          // where :another_field is in inputs[another_field]
          validationResult = validationRules[rule](inputs[targetField], inputs[val]);
          cb_params.push(field, inputs[val]);
        } else {
          // :value1
          validationResult = validationRules[rule](inputs[targetField], val);
          cb_params.push(field, val);
        }
      } else {
        // no :value was defined
        validationResult = validationRules[rule](inputs[targetField]);
        cb_params.push(field);
      }

      if (validationResult == -1) {
        if (customMesssages && customMesssages[targetField]
          && !customMesssages[targetField][rule]
          && customMesssages[targetField]._$all) {
            errors.add(customMesssages[targetField]._$all);
        } else if (customMesssages && customMesssages[targetField]
          && customMesssages[targetField][rule]) {
          errors.add(customMesssages[targetField][rule]);
        } else {
          errors.add(
            defaultErrMessages[rule](...cb_params)
          );
        }

        if (options && options.stopAtFirstError) break;
      }
    }
  });

  return Array.from(errors);
}