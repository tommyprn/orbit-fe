import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, styled } from '@mui/material';
import { ReactComponent as LogoBMI } from 'src/assets/images/logos/BMI.svg';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    minHeight: '110px',
    height: customizer.TopbarHeight,
    width: 'auto',
    overflow: 'hidden',
    display: 'block',
  }));

  return (
    <LinkStyled to="/">
      <LogoBMI height={customizer.TopbarHeight} />
      {customizer.isCollapse ? null : <Typography variant="h2">Orbit</Typography>}
    </LinkStyled>
  );
};

export default Logo;
