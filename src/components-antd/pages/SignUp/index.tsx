import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignup } from '@apis/useSignup';
import { SignupData } from '../../../types/signUp.types';
import { Button, Flex, Form, Typography } from 'antd';
import CheckboxControllerWrapper from '@shared-components-antd/controller-wrapper/checkbox-controller-wrapper copy';
import InputControllerWrapper from '@shared-components-antd/controller-wrapper/input-controller-wrapper';

interface IFormInput extends SignupData {
  confirmPassword: string;
  terms: boolean;
  name: string
  email: string
  password: string
  avatar: string
}

const Signup: React.FC = () => {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm<IFormInput>();
  const { mutate: signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      avatar: data.avatar,
    });
  };

  const password = watch('password', '');

  return (
    <Flex
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        width: '100%',
        padding: '20px',
        borderRadius: 2,
      }}
    >
      <Typography typeof="h4">
        Sign Up
      </Typography>
      <Form component="form" onSubmitCapture={handleSubmit(onSubmit)} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        width: '30%',
        padding: '20px',
        gap: '10px',
        borderRadius: 2,
      }}>
        <InputControllerWrapper
          controlId="name"
          controlName="name"
          control={control}
          controlValidationRules={{
            required: 'Name is required',
          }}
          label='Name'
          placeHolder='Name'
          error={!!errors?.name}
          errorMessage={errors?.name?.message}
        />
        <InputControllerWrapper
          controlId="email"
          controlName="email"
          control={control}
          controlValidationRules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          label='User Email'
          placeHolder='User Email'
          error={!!errors?.email}
          errorMessage={errors?.email?.message}
        />
        <InputControllerWrapper
          controlId="password"
          controlName="password"
          control={control}
          controlValidationRules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          label='Password'
          placeHolder='Password'
          error={!!errors?.password}
          errorMessage={errors?.password?.message}
        />
        <InputControllerWrapper
          controlName="confirmPassword"
          controlId="confirmPassword"
          control={control}
          controlValidationRules={{
            required: 'Confirm Password is required',
            validate: value => value === password || 'Passwords do not match',
          }}
          label='Confirm Password'
          placeHolder='Confirm Password'
          error={!!errors?.confirmPassword}
          errorMessage={errors?.confirmPassword?.message}
        />
        <InputControllerWrapper
          controlName="avatar"
          controlId="avatar"
          control={control}
          controlValidationRules={{
            required: 'Avatar URL is required',
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Enter a valid URL',
            },
          }}
          placeHolder='Avatar URL'
          label='Avatar URL'
          error={!!errors?.avatar}
          errorMessage={errors?.avatar?.message}
        />
        <CheckboxControllerWrapper
          controlName="terms"
          control={control}
          controlValidationRules={{
            required: 'You must accept the terms and conditions',
          }}
          placeHolder='I accept the terms and conditions'
          error={!!errors?.terms}
          errorMessage={errors?.terms?.message}
        />
        <Button
          style={{ marginTop: 3, marginBottom: 2, backgroundColor: 'grey', color: 'white' }}
          disabled={isPending}
          htmlType='submit'
        >
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Form>
    </Flex >
  );
};

export default Signup;
