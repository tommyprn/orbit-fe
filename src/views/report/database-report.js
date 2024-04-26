import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getAllDatabaseReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import DetailedReportTable from 'src/components/table/detailed-report-table';

import './report.css';

const DatabaseReport = (props) => {
  const { report, getAllDatabaseReport } = props;
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month') + 1);

  useEffect(() => {
    (async () => {
      await getAllDatabaseReport(selectedMonth);
    })();
  }, [selectedMonth]);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <DetailedReportTable
          data={report.database}
          title="Detail laporan LED"
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
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
    getAllDatabaseReport: (month) => dispatch(getAllDatabaseReport(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseReport);
