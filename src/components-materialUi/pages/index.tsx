import { lazy, useMemo, useState } from 'react';
import { ColorModeContext } from '../../utils/GlobalContexts/themeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../../utils/Themes/themes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppWrapper from '../shared-components/app-wrapper';
import ErrorBoundary from '../shared-components/error-boundry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import StatusAlert from '../shared-components/toast';
import AuthProviderWrapper from '../../components-materialUi/shared-components/auth-provider';
import ProtectedRoute from '../../routes/private-routes';
import PrivatePage from './private';
import LoginPage from './Login';
import Signup from './SignUp';

// Example: To use lazy loading giving by react itself
const HomeLazyLoaded = lazy(() => import('../../components-materialUi/pages/Home'));

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

  const theme = useMemo(() => createTheme(mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const publicRoute = [
    {
      path: '/',
      element: <HomeLazyLoaded />,
      id: 'home',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/login',
      element: <LoginPage />,
      id: 'login',
      errorElement: <ErrorBoundary />,
    },
    {
      path: '/signup',
      element: <Signup />,
      id: 'signup',
      errorElement: <ErrorBoundary />,
    },
  ];

  const privateRoute = [
    {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <PrivatePage />
        </ProtectedRoute>
      ),
      id: 'PrivatePage',
      errorElement: <ErrorBoundary />,
    },
  ];

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
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme>
              <RouterProvider router={router} />
            </CssBaseline>
          </ThemeProvider>
        </ColorModeContext.Provider>
        <ReactQueryDevtools />
        <StatusAlert />
      </AuthProviderWrapper>
    </QueryClientProvider>
  );
};
export default App;
