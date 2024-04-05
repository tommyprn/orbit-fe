import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// import './pageContainer.css';

const PageContainer = ({ title, customStyle, description, children }) => (
  <div className="container" style={{ paddingTop: '24px', ...customStyle }}>
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
