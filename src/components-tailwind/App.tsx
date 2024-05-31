import { useMemo, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import { themeAntD } from '@utils/Themes/themes';
import AppWrapper from '@shared-components/app-wrapper';
import ErrorBoundary from '@shared-components/error-boundry';
import StatusAlert from '@shared-components/toast';
import AuthProviderWrapper from '@shared-components/auth-provider';
import { privateRoute, publicRoute } from './routes';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // Theme switcher logic
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => mode === 'dark' ? themeAntD : themeAntD, [mode]);
  const Root = () => {
    return <AppWrapper />;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorBoundary />,
      children: [...publicRoute, ...privateRoute],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderWrapper>
        <ConfigProvider
          theme={theme}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
        <ReactQueryDevtools />
        <StatusAlert />
      </AuthProviderWrapper>
    </QueryClientProvider >
  );
};
export default App;
