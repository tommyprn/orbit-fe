import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { month } from '../../utils/get-dropdown-data';
import { connect } from 'react-redux';
import { getAllActualLossReport, getAllPotentialLossReport } from 'src/actions/reportActions';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import TopIssueTable from 'src/components/table/top-issue-table';

import './report.css';

const TopIssueReport = (props) => {
  const { report, getAllActualLossReport, getAllPotentialLossReport } = props;

  const [actualMonth, setActualMonth] = useState({ label: '', value: dayjs().month() + 1 });
  const [potentialMonth, setPotentialMonth] = useState({ label: '', value: dayjs().month() + 1 });

  useEffect(() => {
    (async () => {
      await getAllActualLossReport(actualMonth.value);
      await getAllPotentialLossReport(potentialMonth.value);
    })();
  }, [actualMonth, potentialMonth]);

  const potentialHeader = [
    'No',
    'Region',
    'Nama Kantor',
    'Tanggal Kejadian',
    'Tanggal Pelaporan',
    'Detail Aktivitas',
    'Potensi Kerugian',
    'Recovery',
    'Status',
  ];

  const actualHeader = [
    'No',
    'Region',
    'Nama Kantor',
    'Tanggal Kejadian',
    'Tanggal Pelaporan',
    'Detail Aktivitas',
    'Realisasi Kerugian',
    'Recovery',
    'Status',
  ];

  return (
    <PageContainer title="top issue" description="top issue Page">
      <DashboardCard>
        <TopIssueTable
          data={report.potentialLoss}
          title="Top 5 kejadian berdasarkan potensi kerugian"
          header={potentialHeader}
          setValue={setPotentialMonth}
          fileName={`top-potensi-kerugian-${month[
            dayjs().month() - 1
          ].label.toLowerCase()}-${dayjs().year()}.csv`}
        />
      </DashboardCard>

      <DashboardCard>
        <TopIssueTable
          data={report.actualLoss}
          title="Top 5 kejadian berdasarkan nominal kerugian aktual"
          header={actualHeader}
          setValue={setActualMonth}
          fileName={`top-kerugian-aktual-${month[
            dayjs().month() - 1
          ].label.toLowerCase()}-${dayjs().year()}.csv`}
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
    getAllActualLossReport: (month) => dispatch(getAllActualLossReport(month)),
    getAllPotentialLossReport: (month) => dispatch(getAllPotentialLossReport(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopIssueReport);
