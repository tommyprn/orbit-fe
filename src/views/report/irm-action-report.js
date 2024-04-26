import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getAllIrmActionReport } from 'src/actions/reportActions';

// component
import DashboardCard from '../../components/shared/DashboardCard';
import PageContainer from 'src/components/container/PageContainer';
import IrmActionTable from 'src/components/table/irm-action-table';

import './report.css';

const IrmActionReport = (props) => {
  const { report, getAllIrmActionReport } = props;
  const [endDate, setEndDate] = useState(dayjs());
  const [startDate, setStartDate] = useState(dayjs().subtract(5, 'day'));

  useEffect(() => {
    (async () => {
      await getAllIrmActionReport(
        dayjs(startDate).format('DD-MM-YYYY'),
        dayjs(endDate).format('DD-MM-YYYY'),
      );
    })();
  }, [endDate, startDate]);

  return (
    <PageContainer title="Database Report" description="Database Report Page">
      <DashboardCard>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Typography variant="h4">Laporan History IRM</Typography>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '16px' }}>dari</Typography>

            <DatePicker
              id="startDate"
              value={dayjs(startDate)}
              format=" DD - MMM - YYYY"
              onChange={(value) => {
                setStartDate(dayjs(value));
              }}
            />
            <Typography sx={{ fontSize: '16px' }}>s/d</Typography>
            <DatePicker
              id="endDate"
              value={dayjs(endDate)}
              format=" DD - MMM - YYYY"
              onChange={(value) => {
                setEndDate(dayjs(value));
              }}
            />
          </div>
          <IrmActionTable data={report} title="IRM Action" />
        </div>
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
    getAllIrmActionReport: (start, end) => dispatch(getAllIrmActionReport(start, end)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IrmActionReport);
