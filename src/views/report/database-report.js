import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { getAllDatabaseReport, getAllActionPlanReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import DetailedReportTable from 'src/components/table/detailed-report-table';
import ActionPlanReportTable from 'src/components/table/action-plan-report-table';

import './report.css';

const DatabaseReport = (props) => {
  const { report, getAllDatabaseReport, getAllActionPlanReport } = props;

  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'));

  useEffect(() => {
    (async () => {
      await getAllDatabaseReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
      );
      await getAllActionPlanReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
      );
    })();
  }, [endDate, startDate]);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <div>
          <DetailedReportTable
            data={report.database?.general}
            title="Database LED"
            endDate={endDate}
            startDate={startDate}
            actionPlan={report.database?.actionPlan}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
          />

          {/* <ActionPlanReportTable data={report.database?.actionPlan} /> */}
        </div>
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
    getAllDatabaseReport: (start, end) => dispatch(getAllDatabaseReport(start, end)),
    getAllActionPlanReport: (start, end) => dispatch(getAllActionPlanReport(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseReport);
