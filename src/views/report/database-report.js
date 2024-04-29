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
  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'));
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month') + 1);

  useEffect(() => {
    (async () => {
      await getAllDatabaseReport(selectedMonth);
      // await getAllDatabaseReport(
      //   dayjs(startDate).format('DD-MM-YYYY'),
      //   dayjs(endDate).format('DD-MM-YYYY'),
      // );
    })();
  }, [
    // endDate,
    // startDate,
    selectedMonth,
  ]);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <DetailedReportTable
          data={report.database}
          title="Detail laporan LED"
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
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
