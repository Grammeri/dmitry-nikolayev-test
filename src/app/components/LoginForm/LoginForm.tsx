'use client';

import { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
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
    {
      setSubmitting,
      validateForm,
      setTouched,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      validateForm: () => Promise<any>;
      setTouched: (fields: { [field: string]: boolean }) => void;
    }
  ) => {
    setLoading(true);

    // Trim the values before validation
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
    router.push('/main');
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    handleChange: any
  ) => {
    e.target.value = e.target.value.trim();
    handleChange(e);
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.trim();
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, validateForm, setTouched, values, handleChange }) => (
          <Form
            className={styles.formField}
            onSubmit={async (e) => {
              e.preventDefault();

              // Trim the values before validation
              values.email = values.email.trim();
              values.password = values.password.trim();

              const errors = await validateForm();
              setTouched({
                email: true,
                password: true,
              });

              if (Object.keys(errors).length > 0) {
                return;
              }

              handleSubmit(values as LoginFormValues, {
                setSubmitting: () => {},
                validateForm,
                setTouched,
              });
            }}
          >
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
