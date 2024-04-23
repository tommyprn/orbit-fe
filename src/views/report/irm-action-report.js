import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllIrmActionReport } from 'src/actions/reportActions';

// component
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import IrmActionTable from 'src/components/table/irm-action-table';

import './report.css';

const IrmActionReport = (props) => {
  const { report, getAllIrmActionReport } = props;

  useEffect(() => {
    (async () => {
      await getAllIrmActionReport();
    })();
  }, []);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <IrmActionTable data={report} title="IRM Action" />
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    report: state.report.irmHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllIrmActionReport: () => dispatch(getAllIrmActionReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IrmActionReport);
