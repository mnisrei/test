import { Typography } from 'antd';
import React from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

interface ErrorMessageProps {
  errors: FieldErrors<FieldValues>;
  name: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors, name }) => {
  const error = errors[name];
  const { Text } = Typography
  return error ? (
    <Text type='danger'>
      {error.message?.toString()}
    </Text>
  ) : null;
};

export default ErrorMessage;
