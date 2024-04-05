import React, { useEffect, useState, useRef } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import { Card, Button, TextField, Autocomplete, Typography } from '@mui/material';
import {
  getAllReport,
  getAllZeroReport,
  getAllActualLossReport,
  getAllPotentialLossReport,
} from 'src/actions/reportActions';
import { BarChart } from '@mui/x-charts/BarChart';
import { IconDownload } from '@tabler/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { connect, useSelector } from 'react-redux';
import { officeOpt, periodOpt, month } from '../../utils/get-dropdown-data';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ZeroReportCard from 'src/components/shared/zero-report-card';
import ReportFilterTable from 'src/components/table/report-filter-table';
import PotentialLossTable from 'src/components/table/potential-loss-table';

import './report.css';

const BCrumb = [
  {
    title: 'All your report will be recorded here',
  },
];

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

const Report = (props) => {
  const {
    report,
    getAllReport,
    getAllZeroReport,
    getAllActualLossReport,
    getAllPotentialLossReport,
  } = props;
  const tableRef = useRef(null);
  const customizer = useSelector((state) => state.customizer);

  const [office, setOffice] = useState('');
  const [period, setPeriod] = useState('');
  const [keyword, setKeyword] = useState('');
  const [zeroReport, setZeroReport] = useState({});
  const [actualMonth, setActualMonth] = useState({ label: '', value: dayjs().month() + 1 });
  const [potentialMonth, setPotentialMonth] = useState({ label: '', value: dayjs().month() + 1 });

  useEffect(() => {
    (async () => {
      await getAllReport();
      await getAllZeroReport(dayjs().month(), keyword);
      await getAllActualLossReport(actualMonth.value);
      await getAllPotentialLossReport(potentialMonth.value);
    })();
  }, [keyword, actualMonth, potentialMonth]);

  useEffect(() => {
    if (!_.isEmpty(report.zeroReport)) {
      const dataToSave = {
        reported: [...report?.zeroReport?.cabangMelapor, ...report?.zeroReport?.unitKerjaMelapor],
        unreported: [
          ...report?.zeroReport?.cabangTidakMelapor,
          ...report?.zeroReport?.unitKerjaTidakMelapor,
        ],
      };
      setZeroReport(dataToSave);
    }
  }, [report]);

  const onSearch = (values) => {
    setKeyword(values);
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `laporan-LED-${month[dayjs().month() - 1].toLowerCase()}-${dayjs().year()}`,
    sheet: 'LED',
  });

  const dynamicHeader = [
    'Kategori Jenis Kejadian',
    'Frekuensi',
    'Nominal',
    'Frekuensi',
    'Nominal',
    'Frekuensi',
    'Nominal',
    'Frekuensi',
    'Nominal',
  ];

  console.log(report);

  return (
    <PageContainer title="Report" description="Report Page">
      <Breadcrumb title="Report" items={BCrumb} />

      {report?.reported && report?.unreported ? null : (
        <Card className="first-section" elevation={customizer.isCardShadow ? 9 : 0}>
          <SearchBar onSubmit={onSearch} />
          <div className="first-section-content">
            <ZeroReportCard
              data={zeroReport.reported}
              title="Sudah melapor"
              message="Belum ada KCU / unit kerja yang membuat laporan"
            />

            <ZeroReportCard
              data={zeroReport.unreported}
              title="Belum melapor"
              message="Seluruh KCU & unit kerja sudah mengumpulkan laporan"
            />
          </div>
        </Card>
      )}

      <DashboardCard>
        <>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            LED berdasarkan kantor
          </Typography>

          <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Autocomplete
                sx={{ width: '200px' }}
                options={officeOpt}
                onChange={(event, newValue) => {
                  setOffice(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Kantor" />}
              />

              <Autocomplete
                sx={{ width: '200px' }}
                options={periodOpt}
                onChange={(event, newValue) => {
                  setPeriod(newValue);
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Periode" />}
              />
            </div>
            <Button onClick={onDownload} startIcon={<IconDownload size={18} />}>
              Unduh Laporan
            </Button>
          </div>

          <ReportFilterTable header={dynamicHeader} data={report?.report} tableRef={tableRef} />
        </>

        <div style={{ marginTop: '24px' }}>
          <BarChart
            series={[
              { data: [35, 44, 24, 34], stack: 'total' },
              { data: [51, 6, 49, 30], stack: 'total' },
              { data: [15, 25, 30, 50], stack: 'total' },
              { data: [60, 50, 15, 25], stack: 'total' },
            ]}
            height={290}
            xAxis={[
              {
                data: ['TW1', 'TW2', 'TW3', 'TW4'],
                scaleType: 'band',
              },
            ]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          />
        </div>
      </DashboardCard>

      <DashboardCard>
        <PotentialLossTable
          data={report.potentialLossReport}
          title="Top 5 kejadian berdasarkan potensi kerugian"
          header={potentialHeader}
          setValue={setPotentialMonth}
          fileName={`top-potensi-kerugian-${month[
            dayjs().month() - 1
          ].toLowerCase()}-${dayjs().year()}.csv`}
        />
      </DashboardCard>

      <DashboardCard>
        <PotentialLossTable
          data={report.actualLossReport}
          title="Top 5 kejadian berdasarkan nominal kerugian aktual"
          header={actualHeader}
          setValue={setActualMonth}
          fileName={`top-kerugian-aktual-${month[
            dayjs().month() - 1
          ].toLowerCase()}-${dayjs().year()}.csv`}
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
    getAllReport: () => dispatch(getAllReport()),
    getAllZeroReport: (month, keyword) => dispatch(getAllZeroReport(month, keyword)),
    getAllActualLossReport: (month) => dispatch(getAllActualLossReport(month)),
    getAllPotentialLossReport: (month) => dispatch(getAllPotentialLossReport(month)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
