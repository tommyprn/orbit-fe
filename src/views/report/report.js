import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { getAllHistory } from 'src/actions/userActions';

// component
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';

const BCrumb = [
  {
    title: 'All your report will be recorded here',
  },
];

const Report = (props) => {
  const { history, getAllHistory } = props;
  console.log(history);
  useEffect(() => {
    (async () => {
      await getAllHistory();
    })();
  }, []);

  return (
    <PageContainer title="Report" description="Report Page">
      <Breadcrumb title="Report" items={BCrumb} />

      <DashboardCard>
        <Typography>here lays the list for all of the report you've made</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    history: state.user.history.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllHistory: (id) => dispatch(getAllHistory('20240301023')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
