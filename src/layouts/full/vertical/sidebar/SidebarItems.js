import React from 'react';
import { useLocation } from 'react-router';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';

import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import NavCollapse from './NavCollapse';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));

  const Menuitems = JSON.parse(secureLocalStorage?.getItem('menuItem'));
  // const Menuitems = secureLocalStorage?.getItem('menuItem');

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
                  menu={item}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  pathWithoutLastPart={pathWithoutLastPart}
                  level={1}
                  key={index}
                  onClick={() => dispatch(toggleMobileSidebar())}
                />
              );

              // {/********If Sub No Menu**********/}
            } else {
              return (
                <NavItem
                  item={item}
                  key={index}
                  pathDirect={pathDirect}
                  hideMenu={hideMenu}
                  onClick={() => dispatch(toggleMobileSidebar())}
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
    </Box>
  );
};
export default SidebarItems;
