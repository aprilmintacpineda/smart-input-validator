export const errMessages = {
  // length related validation messages,
  min: (field, len) => `${field} must be at least ${len} character${len > 1? 's' : ''} long.`,
  max: (field, len) => `${field} must be at least ${len} character${len > 1? 's' : ''} long.`,
  between: (field, min, max) => `${field} must be at least ${min} to ${max} characters long.`,
  len: (field, len) => `${field} must be ${len} character${len > 1? 's' : ''} long.`,
  // value related validation messages
  required: fieldName => `${fieldName} is required.`,
  equals: (field, subject) => `${field} does not match with ${subject}.`,
  email: () => `Invalid email.`,
  allowedChars: field => `${field} has invalid characters.`,
  regex: field => `${field} has invalid characters.`,
  notRegex: field => `${field} has invalid characters.`
};