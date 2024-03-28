import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material';
import LogoBMI from 'src/assets/images/logos/logo.jpeg';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    minHeight: '80px',
    height: customizer.TopbarHeight,
    width: 'auto',
    overflow: 'hidden',
    display: 'block',
    marginBottom: '16px',
    marginTop: '16px',
  }));

  return (
    <LinkStyled to="/">
      <img style={{ height: customizer.TopbarHeight }} alt="logo" src={LogoBMI} />
    </LinkStyled>
  );
};

export default Logo;
