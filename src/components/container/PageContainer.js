import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const PageContainer = ({ title, customStyle, description, children }) => (
  <div style={{ paddingTop: '24px', ...customStyle }}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

PageContainer.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string,
};

export default PageContainer;
