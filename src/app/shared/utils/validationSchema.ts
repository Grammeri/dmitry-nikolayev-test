import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Invalid email address'
    )
    .matches(
      /^[A-Za-z0-9._%+-@]+$/,
      'Email must contain only Latin letters and digits'
    )
    .required('Email is required'),
  password: Yup.string()
    .test(
      'no-cyrillic',
      'Password must contain only Latin letters and digits',
      (value: string | undefined) =>
        value ? /^[A-Za-z0-9]*$/.test(value) : false
    )
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .required('Password is required'),
});
