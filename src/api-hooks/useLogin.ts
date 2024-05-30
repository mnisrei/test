import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoginData } from '../types/login.types';
import { useDispatch } from 'react-redux';
import { addToast } from '@redux/toast.slice';
import { setAuthenticatedUser } from '@redux/auth/auth.slice';
import useNavigateToTop from '@hooks/useNavigateToTop';

const loginFunction = async (data: LoginData) => {
  try {
    const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', data);
    return response.data;
  } catch (err) {
    throw Error;
  }
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const { goToUrl } = useNavigateToTop();
  return useMutation({
    mutationFn: loginFunction,
    onSuccess: async () => {
      dispatch(setAuthenticatedUser());
      dispatch(
        addToast({
          id: new Date().getTime(),
          type: 'success',
          message: 'User is Logged-in successfully',
        }),
      );
      goToUrl({ path: '/' });
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
