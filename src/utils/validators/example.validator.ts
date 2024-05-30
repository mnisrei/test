import * as yup from 'yup';
export type YupValidatorErrorType = yup.ValidationError;

// Example: The use case of the validator schema
export const validationSchema = yup.object().shape({
  example: yup.string(),
});

// Example: The use case of the invoking validations
// validationSchema.validate(value)