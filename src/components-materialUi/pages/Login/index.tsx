import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLogin } from '@apis/useLogin';
import InputControllerWrapper from '@shared-components-mui/controller-wrapper/input-controller-wrapper';

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { mutate: login } = useLogin();

  const onSubmit = (data: IFormInput) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        width: '50%',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <InputControllerWrapper
          label='Email'
          placeHolder='Email'
          control={control}
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
          control={control}
          controlId='password'
          controlName='password'
          controlValidationRules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            }
          }}
          error={!!errors?.password}
          errorMessage={errors?.password?.message || ''}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: 'grey', color: 'white' }}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
