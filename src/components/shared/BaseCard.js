import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, Divider, CardHeader, CardContent } from '@mui/material';
import './BaseCard.css';

const BaseCard = ({ title, children, CustomHeader }) => {
  const customizer = useSelector((state) => state.customizer);
  return (
    <Card
      sx={{ padding: 0 }}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {CustomHeader ? CustomHeader : <CardHeader title={title} />}

      <Divider />

      <CardContent>{children}</CardContent>
    </Card>
  );
};

BaseCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default BaseCard;
