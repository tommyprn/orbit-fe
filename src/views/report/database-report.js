import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import secureLocalStorage from 'react-secure-storage';
import { connect } from 'react-redux';
import { getAllDatabaseReport, getAllActionPlanReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import DetailedReportTable from 'src/components/table/detailed-report-table';
// import ActionPlanReportTable from 'src/components/table/action-plan-report-table';

import './report.css';

const DatabaseReport = (props) => {
  const { report, getAllDatabaseReport, getAllActionPlanReport } = props;
  const user = JSON.parse(secureLocalStorage.getItem('user'));
  const role = JSON.parse(secureLocalStorage.getItem('selectedRoleName'));

  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'));

  useEffect(() => {
    (async () => {
      const userSent = {
        role: role,
        division: user.divisiUser,
        branchCode: user.kodeCabangKcuUser,
      };
      await getAllDatabaseReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
        userSent,
      );
      await getAllActionPlanReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
        userSent,
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
    getAllDatabaseReport: (start, end, user) => dispatch(getAllDatabaseReport(start, end, user)),
    getAllActionPlanReport: (start, end, user) =>
      dispatch(getAllActionPlanReport(start, end, user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseReport);
