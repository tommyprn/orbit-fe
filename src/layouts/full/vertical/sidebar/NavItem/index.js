import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconPoint, IconReport, IconHistory, IconChartHistogram } from '@tabler/icons';

// mui imports
import {
  List,
  Chip,
  styled,
  useTheme,
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

const NavItem = ({ item, level, pathDirect, onClick, hideMenu }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const customizer = useSelector((state) => state.customizer);
  const iconConvert = {
    IconPoint: IconPoint,
    IconReport: IconReport,
    IconHistory: IconHistory,
    IconChartHistogram: IconChartHistogram,
  };
  const Icon = iconConvert[item.icon];
  const itemIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;

  // style
  const ListItemStyled = styled(ListItem)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: `${customizer.borderRadius}px`,
    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    color:
      level > 1 && pathDirect === item.href
        ? `rgb(85,26,139) !important`
        : theme.palette.text.secondary,
    paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    '&:hover': {
      backgroundColor: 'rgb(85,26,139,0.7)',
      color: level > 1 ? 'rgb(85,26,139)' : 'white',
    },
    '&.Mui-selected': {
      backgroundColor: 'rgb(85,26,139)',
      color: 'white',
      '&:hover': {
        backgroundColor: 'rgb(85,26,139,0.7)',
        color: 'white',
      },
    },
  }));

  return (
    <List component="li" disablePadding key={item.id}>
      <ListItemStyled
        button
        component={item.external ? 'a' : NavLink}
        to={item.href}
        href={item.external ? item.href : ''}
        disabled={item.disabled}
        selected={pathDirect === item.href}
        target={item.external ? '_blank' : ''}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>
          {hideMenu ? '' : <>{t(`${item.title}`)}</>}
          <br />
          {item.subtitle ? (
            <Typography variant="caption">{hideMenu ? '' : item.subtitle}</Typography>
          ) : (
            ''
          )}
        </ListItemText>

        {!item.chip || hideMenu ? null : (
          <Chip
            color={item.chipColor}
            variant={item.variant ? item.variant : 'filled'}
            size="small"
            label={item.chip}
          />
        )}
      </ListItemStyled>
    </List>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
  pathDirect: PropTypes.any,
  hideMenu: PropTypes.any,
  onClick: PropTypes.func,
};

export default NavItem;
