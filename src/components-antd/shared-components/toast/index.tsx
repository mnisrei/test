import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { deleteToast } from '../../../redux/toast.slice';
import { notification } from 'antd';

const StatusAlert: React.FC = () => {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toasts.toasts);
  const [api, contextHolder] = notification.useNotification({
    duration: toasts[0]?.ttl || 5000,
    placement: 'bottomRight'
  });

  useEffect(() => {
    const handleClose = () => {
      if (toasts.length > 0) {
        dispatch(deleteToast(toasts[0].id));
      }
    };

    if (toasts.length > 0) {
      api[toasts[0]?.type || 'info']({
        message: "Notification",
        description: toasts[0]?.message
      })
      const timerId = setTimeout(() => {
        handleClose();
      }, toasts[0].ttl || 5000);

      return () => clearTimeout(timerId);
    }
  }, [dispatch, toasts]);

  if (toasts.length === 0 || !toasts[0]?.message) {
    return null;
  }

  return (
    <>
      {contextHolder}
    </>
  );
};

export default StatusAlert;
