import React, { useState, useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticatedUser, setLoadingAuthRdx } from '../../redux/auth/auth.slice';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

interface AuthProviderWrapperProps {
  children: ReactNode;
}
const AuthProviderWrapper: React.FC<AuthProviderWrapperProps> = ({ children }) => {
  const { ready } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(setLoadingAuthRdx({ loading: true }));
    // some auth logic
    dispatch(setAuthenticatedUser());
    setLoading(false);
  }, [dispatch]);

  if (loading || !ready) {
    return <Spin />;
  }

  return <>{children}</>;
};

export default AuthProviderWrapper;
