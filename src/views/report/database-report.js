import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllDatabaseReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import DetailedReportTable from 'src/components/table/detailed-report-table';

import './report.css';

const DatabaseReport = (props) => {
  const { report, getAllDatabaseReport } = props;

  useEffect(() => {
    (async () => {
      await getAllDatabaseReport();
    })();
  }, []);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <DetailedReportTable data={report.database} title="Detail laporan LED" />
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    report: state.report,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDatabaseReport: () => dispatch(getAllDatabaseReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseReport);
