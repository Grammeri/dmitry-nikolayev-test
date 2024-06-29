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
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/main');
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

            <Button type="submit" disabled={isSubmitting || loading}>
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
