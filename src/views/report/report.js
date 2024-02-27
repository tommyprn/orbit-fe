import React from 'react';
import { Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'All your report will be recorded here',
  },
];

const Report = () => {
  return (
    <PageContainer title="Report" description="Report Page">
      <Breadcrumb title="Report" items={BCrumb} />

      <DashboardCard>
        <Typography>here lays the list for all of the report you've made</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Report;
