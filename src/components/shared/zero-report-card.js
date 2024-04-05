import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Typography } from '@mui/material';

const ZeroReportCard = ({ title, data, message }) => {
  return (
    <div className="nil-container">
      <div className="nil-table">
        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
          {title} : {data?.length}
        </Typography>

        <Divider sx={{ margin: '16px 0' }} />

        {data?.length > 0 ? (
          <div className="nil-table-wrapper">
            {data.map((item, i) => {
              return (
                <div key={i}>
                  <Typography sx={{ fontSize: '12px' }}>{item}</Typography>
                </div>
              );
            })}
          </div>
        ) : (
          <Typography>{message}</Typography>
        )}
      </div>
    </div>
  );
};

ZeroReportCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default ZeroReportCard;
