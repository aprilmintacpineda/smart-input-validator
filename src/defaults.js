export const errMessages = {
  required: fieldName => `${fieldName} is required.`,
  equals: (field, subject) => `${field} does not match with ${subject}.`,
  min: (field, len) => `${field} must be at least ${len} character${len > 1? 's' : ''} long.`,
  max: (field, len) => `${field} must be at least ${len} character${len > 1? 's' : ''} long.`,
  between: (field, min, max) => `${field} must be at least ${min} to ${max} characters long.`,
  email: () => `Invalid email.`,
  allowedChars: field => `${field} has invalid characters.`
};