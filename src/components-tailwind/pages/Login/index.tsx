import React from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '@apis/useLogin';
import { Button, Flex, Form, Typography } from 'antd';
import InputControllerWrapper from '@shared-components/controller-wrapper/input-controller-wrapper';

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<IFormInput>();
  const { mutate: login } = useLogin();

  const onSubmit = (data: IFormInput) => {
    console.log(data, "data");

    login({
      email: data.email,
      password: data.password,
    });
  };

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
      <Typography typeof="h4" >
        Login
      </Typography>
      <Form onFinish={handleSubmit(onSubmit)} style={{
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
          label='Email'
          placeHolder='Email'
          formContext={control}
          controlId='email'
          controlName='email'
          controlValidationRules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          }}
          error={!!errors?.email}
          errorMessage={errors?.email?.message || ''}
        />
        <InputControllerWrapper
          label='Password'
          placeHolder='Password'
          formContext={control}
          controlId='password'
          controlName='password'
          controlValidationRules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          error={!!errors?.password}
          errorMessage={errors?.password?.message || ''}
        />
        <Button htmlType='submit' style={{ marginTop: 3, marginBottom: 2, backgroundColor: 'grey', color: 'white' }}>
          Login
        </Button>
      </Form>
    </Flex >
  );
};

export default Login;
