import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Flex } from "antd";
import { AppMainWrapperDiv } from '../../styles/app-wrapper.styles';
import ExampleNavBar from './navbar-example';
import CircularCustomLoader from './loaders/circular-custom-loader';
import useGetResponsiveness from '../hook/useGetResponsiveness';

function AppWrapper() {
  const { isMobile } = useGetResponsiveness()
  return (
    <Suspense fallback={<CircularCustomLoader />}>
      <AppMainWrapperDiv>
        <ExampleNavBar />
        <Flex
          style={{
            padding: '0px',
            minWidth: '100%',
            minHeight: '100%',
            flexGrow: 1,
            gap: '20px',
            height: '100%',
            marginTop: isMobile ? '56px' : '64px',
          }}
        >
          <Outlet />
        </Flex>
      </AppMainWrapperDiv>
    </Suspense >
  );
}

export default AppWrapper;
