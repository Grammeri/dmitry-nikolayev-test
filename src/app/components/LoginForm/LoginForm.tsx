'use client';

import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginValidationSchema } from '@/app/shared/utils/validationSchema';

import styles from './LoginForm.module.scss';
import Button from '@/app/components/Button/Button';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const initialValues: LoginFormValues = { email: '', password: '' };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Redirect to home page
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="formField">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              disabled={loading}
              className={styles.input}
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
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles['error-message']}
            />

            <Button onClick={() => {}} disabled={isSubmitting || loading}>
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
