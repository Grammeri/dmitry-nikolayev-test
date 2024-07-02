'use client';

import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { loginValidationSchema } from '@/app/shared/utils/validationSchema';
import { useRouter } from 'next/navigation';

import styles from './LoginForm.module.scss';
import Button from '@/app/components/Button/Button';
import { CircularProgress } from '@mui/material';
import { LoginFormValues } from '@/app/interfaces/products';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initialValues: LoginFormValues = { email: '', password: '' };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, validateForm, setTouched }: FormikHelpers<LoginFormValues>
  ) => {
    setLoading(true);

    values.email = values.email.trim();
    values.password = values.password.trim();

    const errors = await validateForm();
    setTouched({
      email: true,
      password: true,
    });

    if (Object.keys(errors).length > 0) {
      setSubmitting(false);
      setLoading(false);
      return;
    }
    setSubmitting(true);
    router.push('/main');
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    e.target.value = e.target.value.trim();
    handleChange(e);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleSubmit }) => (
          <Form className={styles.formField} onSubmit={handleSubmit}>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              disabled={loading}
              className={styles.input}
              autoComplete="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleEmailChange(e, handleChange)
              }
              onBlur={handleEmailBlur}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles['error-message']}
            />

            <Field
              type="password"
              name="password"
              placeholder="Password"
              disabled={loading}
              className={styles.input}
              autoComplete="current-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.trim();
                handleChange(e);
              }}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles['error-message']}
            />
            <Button
              type="submit"
              disabled={isSubmitting || loading}
              className={styles.submitButton}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
