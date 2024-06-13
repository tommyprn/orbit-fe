import React from 'react';
import { useLocation } from 'react-router';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Box, List, useMediaQuery, Button, ButtonGroup, Typography } from '@mui/material';
import secureLocalStorage from 'react-secure-storage';

import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import NavCollapse from './NavCollapse';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));

  const Menuitems =
    process.env.REACT_APP_DEPLOY_STATE === 'true'
      ? secureLocalStorage?.getItem('menuItem')
      : JSON.parse(secureLocalStorage?.getItem('menuItem'));

  const onClick = (role) => {
    secureLocalStorage.setItem('selectedRoleName', JSON.stringify(role));
  };

  return (
    <Box sx={{ px: 3 }}>
      {Menuitems ? (
        <List sx={{ pt: 0 }} className="sidebarNav">
          {Menuitems.map((item, index) => {
            // {/********SubHeader**********/}
            if (item.subheader) {
              return <NavGroup item={item} hideMenu={hideMenu} key={index} />;

              // {/********If Sub Menu**********/}
              /* eslint no-else-return: "off" */
            } else if (item.children) {
              return (
                <NavCollapse
                  key={index}
                  menu={item}
                  level={1}
                  onClick={() => dispatch(toggleMobileSidebar())}
                  hideMenu={hideMenu}
                  pathDirect={pathDirect}
                  pathWithoutLastPart={pathWithoutLastPart}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={index}
                  onClick={() => dispatch(toggleMobileSidebar())}
                  hideMenu={hideMenu}
                  pathDirect={pathDirect}
                />
              );
            }
          })}
        </List>
      ) : !customizer.isCollapse ? (
        <p style={{ color: 'black', wordSpacing: '5px' }}>
          <em>
            <strong style={{ color: '#551a8b', fontSize: '18px' }}>Role </strong>
          </em>
          tidak terdeteksi,
          <br />
          mohon laklukan koneksi ulang
        </p>
      ) : null}

      {process.env.REACT_APP_DEPLOY_STATE === 'false' ? (
        <>
          <ButtonGroup sx={{ width: '100%' }} variant="outlined" orientation="vertical">
            <Button onClick={() => onClick('Inputer')}>Inputer</Button>
            <Button onClick={() => onClick('Approver')}>Approver</Button>
            <Button onClick={() => onClick('Admin')}>Admin</Button>
            <Button onClick={() => onClick('Validator')}>Validator</Button>
            <Button onClick={() => onClick('IRMApproval')}>IRM Approval</Button>
            <Button onClick={() => onClick('ValidatorFraud')}>Fraud</Button>
          </ButtonGroup>
          <Typography sx={{ color: 'black', marginTop: '8px' }}>
            role: <strong>{role}</strong>
          </Typography>
        </>
      ) : null}
    </Box>
  );
};
export default SidebarItems;
