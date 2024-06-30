'use client';

import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginValidationSchema } from '@/app/shared/utils/validationSchema';
import { useRouter } from 'next/navigation';

import styles from './LoginForm.module.scss';
import Button from '@/app/components/Button/Button';
import { CircularProgress } from '@mui/material';

interface LoginFormValues {
  email: string;
  password: string;
}

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

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, validateForm, setTouched }) => (
          <Form
            className={styles.formField}
            onSubmit={async (e) => {
              e.preventDefault();
              const errors = await validateForm();
              setTouched({
                email: true,
                password: true,
              });

              if (Object.keys(errors).length > 0) {
                return;
              }

              handleSubmit(initialValues, {
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
