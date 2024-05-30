import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ErrorMessage from '../../shared-components/ErrorMessage';
import { useSignup } from '@apis/useSignup';
import { SignupData } from '../../../types/signUp.types';
import InputControllerWrapper from '@shared-components-mui/controller-wrapper/input-controller-wrapper';
import CheckboxControllerWrapper from '@shared-components-mui/controller-wrapper/checkbox-controller-wrapper copy';

interface IFormInput extends SignupData {
  confirmPassword: string;
  terms: boolean;
}

const Signup: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'black',
        width: '30%',
        padding: 3,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, backgroundColor: 'grey', color: 'white' }}
          disabled={isPending}
        >
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
