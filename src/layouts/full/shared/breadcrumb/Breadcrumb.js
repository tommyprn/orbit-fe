import React from 'react';
import { Grid, Typography, Breadcrumbs, Link } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { IconCircle } from '@tabler/icons';

const Breadcrumb = ({ subtitle, items, title, children }) => (
  <Grid
    container
    sx={{
      backgroundColor: 'rgb(85,26,139,0.2)',
      borderRadius: (theme) => theme.shape.borderRadius / 4,
      p: '30px 25px 20px',
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography color="textSecondary" variant="h6" fontWeight={400} mt={0.8} mb={0}>
        {subtitle}
      </Typography>
      <Breadcrumbs
        separator={
          <IconCircle size="5" fill="textSecondary" fillOpacity="0.6" style={{ margin: '0 5px' }} />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link underline="none" color="inherit" component={NavLink} to={item.to}>
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ''}
      </Breadcrumbs>
    </Grid>
  </Grid>
);

export default Breadcrumb;
