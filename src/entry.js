import { errMessages as defaultErrMessages } from './defaults';
import validationRules from './rules';

export default function validator(inputs, rules, customMesssages = null) {
  if (!inputs || inputs.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object.');
  if (!rules || rules.constructor !== Object) throw new Error('input-validator-js: expected parameter 2 to be an object.');
  if (customMesssages != null
   && customMesssages.constructor !== Object) throw new Error('input-validator-js: expected parameter 1 to be an object');

  let errors = new Set;

  Object.keys(rules).forEach(field => {
    rules[field].split('|').forEach(segment => {
      // rule:value
      let [rule, val] = segment.split(':');
      let validationResult = null;
      let cb_params = [];

      if (!validationRules[rule]) throw new Error(`input-validator-js: unknown rule \`${rule}\` provided for field \`${field}\`. Please refer to the docs for more info.`);

      // :value
      if (val) {
        // :another_field
        // where :another_field is in inputs[another_field]
        if (inputs[val]) {
          validationResult = validationRules[rule]();
          cb_params.push(field, inputs[val]);
        } else if (val.includes(',')) {
          // :value1,value2,value3
          let vals =  val.split(',');
          validationResult = validationRules[rule](inputs[field], ...vals);
          cb_params.push(field, ...vals);
        } else {
          // :value1
          validationResult = validationRules[rule](inputs[field], val);
          cb_params.push(field, val);
        }
      } else {
        // no :value was defined
        validationResult = validationRules[rule](inputs[field]);
        cb_params.push(field);
      }

      if (validationResult == -1) {
        if (undefined == customMesssages
         || null == customMesssages
         || !customMesssages[field]
         || !customMesssages[field][rule]) {
          errors.add(
            defaultErrMessages[rule](...cb_params)
          );
        } else {
          errors.add(customMesssages[field][rule]);
        }
      }
    });
  });

  return Array.from(errors);
}