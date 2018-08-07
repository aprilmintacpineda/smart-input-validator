export const errMessages = {
  // length related validation messages,
  minLen: (field, len) => `${field} must be at least ${len} character${len > 1? 's' : ''} long.`,
  maxLen: (field, len) => `${field} must be less than ${len} character${len > 1? 's' : ''} long.`,
  betweenLen: (field, min, max) => `${field} must be ${min} to ${max} characters long.`,
  exactLen: (field, len) => `${field} must be ${len} character${len > 1? 's' : ''} long.`,
  // value related validation messages
  min: (field, len) => `${field} must be equal to or greater than ${len}.`,
  max: (field, len) => `${field} must be less than or equal to ${len}.`,
  between: (field, min, max) => `${field} must be greater than or equal to ${min} and less than or equal to ${max}.`,
  exactly: (field, len) => `${field} must be equal to ${len}.`,
  required: fieldName => `${fieldName} is required.`,
  equals: (field, subject) => `${field} does not match with ${subject}.`,
  email: () => 'Invalid email.',
  allowedChars: field => `${field} has invalid characters.`,
  notAllowedChars: field => `${field} has invalid characters.`,
  regex: field => `${field} has invalid characters.`,
  notRegex: field => `${field} has invalid characters.`,
  bool: field => `${field} must be a boolean.`,
  in: field => `${field} is not a valid value.`
};