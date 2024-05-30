import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import useNavigateToTop from '@hooks/useNavigateToTop';
import { RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '@redux/auth/auth.slice';


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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('example_navbar')}
                    </Typography>
                    <Button color="inherit" onClick={() => changeLanguage('en')}>EN</Button>
                    <Button color="inherit" onClick={() => changeLanguage('fr')}>FR</Button>
                    {isLoggedIn?
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
