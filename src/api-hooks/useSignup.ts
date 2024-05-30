import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SignupData, SignupResponse } from '../types/signUp.types';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import useNavigateToTop from '@hooks/useNavigateToTop';

type Input = SignupData;

const signup = async (data: Input): Promise<SignupResponse> => {
  const response = await axios.post('https://api.escuelajs.co/api/v1/users/', data);
  return response.data;
};

export const useSignup = () => {
  const dispatch = useDispatch();
  const { goToUrl } = useNavigateToTop();
  return useMutation({
    mutationFn: signup,
    onSuccess: async () => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'User is created successfully',
        }),
      );
      goToUrl({ path: '/login' });
    },
    onError: async () => {
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'error',
          message: 'Something went Wrong!',
        }),
      );
    },
  });
};
