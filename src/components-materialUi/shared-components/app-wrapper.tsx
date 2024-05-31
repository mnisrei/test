import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import ExampleNavBar from './navbar-example';
import useGetResponsiveness from '@hooks/useGetResponsiveness';
import { styled } from '@mui/material/styles';

//  Example of styled components
export const AppMainWrapperDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});

function AppWrapper() {
  const { isMobile } = useGetResponsiveness()

  return (
    <Suspense fallback={<CircularProgress />}>
      <AppMainWrapperDiv>
        <ExampleNavBar />
        <Container
          style={{
            padding: '0px',
            minWidth: '100%',
            minHeight: '100%',
            marginTop: isMobile ? '56px' : '64px',
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',

          }}
        >
          <Outlet />
        </Container>
      </AppMainWrapperDiv>
    </Suspense>
  );
}

export default AppWrapper;
