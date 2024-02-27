import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'no one knows what to put here yet',
  },
];

const Dashboard = (props) => {
  const user = localStorage.getItem('user');

  useEffect(() => {
    const userObj = JSON.parse(user);
    const orbit = userObj.apps.find((item) => {
      return item.name === 'orbit';
    });

    const dataToSave = {
      nip: userObj.nikUser,
      role: orbit.roles[0].name,
    };

    localStorage.setItem('history', JSON.stringify(dataToSave));
  }, []);

  return (
    <PageContainer title="Dashboard" description="dashboard page">
      <Breadcrumb title="Dashboard" items={BCrumb} />

      <DashboardCard>
        <Typography>
          this is the first page user will see, will add something later on or removed
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUsers: (roles) => dispatch(fetchUsers(roles)),
//   };
// };

export default Dashboard;
