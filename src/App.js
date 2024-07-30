import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import RTL from './layouts/full/shared/customizer/RTL';
import Router from './routes/Router';
import ScrollToTop from './components/shared/ScrollToTop';
import axiosServices from './utils/axios';
import secureLocalStorage from 'react-secure-storage';

function App() {
  const user = JSON.parse(secureLocalStorage.getItem('user'));
  const theme = ThemeSettings();
  const routing = useRoutes(Router);
  const customizer = useSelector((state) => state.customizer);

  const navigateTo = (url) => {
    window.location.href = url;
  };

  const checkSessionExpiry = async () => {
    const accessToken = localStorage.getItem('tokenLogin');
    const menu = secureLocalStorage.getItem('menuItem');

    if (
      !accessToken ||
      accessToken === '' ||
      accessToken === null ||
      !menu ||
      menu === '' ||
      menu === null
    ) {
      alert('Anda Tidak Memiliki Akses');
      secureLocalStorage.removeItem('accessToken');
      localStorage.removeItem('tokenLogin');
      navigateTo(`https://10.55.54.152/maps-login`);
      return;
    }

    const apiUrl = `https://10.55.54.161:30090/api/v1/auth/session-login`;

    const requestData = {
      nikLogin: user.nikUser,
      jwtTokenLogin: accessToken,
    };

    try {
      const response = await axiosServices.post(apiUrl, requestData);

      if (!response.data.responseCode || response.data.responseCode !== '00') {
        alert('Sesi Anda Telah Habis');
        secureLocalStorage.removeItem('accessToken');
        localStorage.removeItem('tokenLogin');
        navigateTo(`https://10.55.54.152/maps-login`);
      }
    } catch (error) {
      alert('Sesi Anda Telah Habis');
      secureLocalStorage.removeItem('accessToken');
      localStorage.removeItem('tokenLogin');
      navigateTo(`https://10.55.54.152/maps-login`);
    }
  };

  useEffect(() => {
    if (process.env.REACT_APP_DEPLOY_STATE === 'true') {
      checkSessionExpiry();
    }
  }, []);

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
