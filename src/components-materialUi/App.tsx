import { useMemo, useState } from 'react';
import { ColorModeContext } from '@utils/GlobalContexts/themeContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { darkTheme, lightTheme } from '@utils/Themes/themes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppWrapper from '@shared-components/app-wrapper';
import ErrorBoundary from '@shared-components/error-boundry';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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

  const theme = useMemo(() => createTheme(mode === 'dark' ? darkTheme : lightTheme), [mode]);

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
