import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IconBoxMultiple, IconHistory, IconReport, IconPoint } from '@tabler/icons';

// mui imports
import { ListItemIcon, ListItem, Collapse, styled, ListItemText, useTheme } from '@mui/material';

// custom imports
import NavItem from '../NavItem';

// plugins
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

// FC Component For Dropdown Menu
const NavCollapse = ({ menu, level, pathWithoutLastPart, pathDirect, onClick, hideMenu }) => {
  const customizer = useSelector((state) => state.customizer);
  const theme = useTheme();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const iconConvert = {
    IconPoint: IconPoint,
    IconReport: IconReport,
    IconHistory: IconHistory,
    IconBoxMultiple: IconBoxMultiple,
  };
  const Icon = iconConvert?.[menu?.icon];
  const menuIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  // style
  const ListItemStyled = styled(ListItem)(() => ({
    marginBottom: '2px',
    padding: '8px 10px',
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: 'rgb(85,26,139,0.7)',
      color: 'white',
    },
    color:
      open && level < 2
        ? 'rgb(85,26,139)'
        : `inherit` && level > 1 && open
        ? 'rgb(85,26,139)'
        : theme.palette.text.secondary,
    borderRadius: `${customizer.borderRadius}px`,
  }));

  // menu collapse for sub-levels
  React.useEffect(() => {
    menu.children.forEach((item) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  // If Menu has Children
  const submenus = menu.children?.map((item, index) => {
    if (item.children) {
      return (
        <NavCollapse
          key={index}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
        />
      );
    } else {
      return (
        <NavItem
          key={index}
          item={item}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
          onClick={onClick}
        />
      );
    }
  });

  // handler
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        button
        component="li"
        onClick={handleClick}
        selected={pathWithoutLastPart === menu.href}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit">{hideMenu ? '' : <>{t(`${menu.title}`)}</>}</ListItemText>
        {!open ? <IconChevronDown size="1rem" /> : <IconChevronUp size="1rem" />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {submenus}
      </Collapse>
    </React.Fragment>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  pathWithoutLastPart: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};

export default NavCollapse;
