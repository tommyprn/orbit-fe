import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import RTL from './layouts/full/shared/customizer/RTL';
import Router from './routes/Router';
import ScrollToTop from './components/shared/ScrollToTop';
import axiosServices from './utils/axios';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  const navigateTo = (url) => {
    window.location.href = url;
  };

  const checkSessionExpiry = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const menu = localStorage.getItem('menuItem');

    if (
      !accessToken ||
      accessToken === '' ||
      accessToken === null ||
      !menu ||
      menu === '' ||
      menu === null
    ) {
      // navigate to login when no token/ menu item found
      navigateTo('http://10.55.54.152/maps-login');
      return;
    }

    const apiUrl = 'http://10.80.244.168:12987/maps/v1/auth/session-expiry';
    const headers = {
      Authorization: `${accessToken}`,
    };

    try {
      const response = await axiosServices.get(apiUrl, { headers });

      if (!response.data || response.data !== 'active') {
        navigateTo('http://10.55.54.152/maps-login');
      }
    } catch (error) {
      console.error(error);
      navigateTo('http://10.55.54.152/maps-login');
    }
  };

  // checkSessionExpiry();

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <ScrollToTop>{routing}</ScrollToTop>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
