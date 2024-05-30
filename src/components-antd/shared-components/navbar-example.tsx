import { useTranslation } from 'react-i18next';
import useNavigateToTop from '@hooks/useNavigateToTop';
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '@redux/auth/auth.slice';
import { Button, Flex, Typography } from 'antd';


export default function ExampleNavBar() {
  // Example: To change the translations
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch()
  // Example: To go to a specific url using custom hook
  const { goto } = useNavigateToTop()
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogoutUser = () => {
    dispatch(logOutUser());
    goto('/login');
  };

  const changeLanguage = (language: 'en' | 'fr') => {
    i18n.changeLanguage(language);
  };

  return (
    <Flex style={{ position: 'fixed', top: 0, width: '100%', padding: '10px', left: '-10px', background: "black" }}>
      <Flex style={{ width: '100%', padding: '10px', }}>
        <Typography itemType="h6" style={{ flexGrow: 1, color: 'white' }}>
          {t('example_navbar')}
        </Typography>
        <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
        <Button color="inherit" onClick={() => changeLanguage('fr')}>FR</Button>
        {isLoggedIn ?
          <Button color="inherit" onClick={() => handleLogoutUser()}>Logout</Button>
          :
          <>
            <Button color="inherit" onClick={() => goto('/login')}>Login</Button>
            <Button
              color='inherit'
              onClick={() => goto('/signup')}
            >
              Signup
            </Button>
          </>
        }
      </Flex>
    </Flex>
  );
}
