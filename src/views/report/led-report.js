import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { IconDownload } from '@tabler/icons';
import { getAllLedReport } from 'src/actions/reportActions';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { chartValue, periodTranslate } from 'src/utils/use-chart-utils';
import { officeOpt, periodOpt, month } from '../../utils/get-dropdown-data';
import { Button, TextField, Autocomplete, Typography } from '@mui/material';

// component
import BarChart from 'src/components/shared/charts/bar-chart';
import PieChart from 'src/components/shared/charts/pie-chart';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ReportFilterTable from 'src/components/table/report-filter-table';

import './report.css';

const LedReport = (props) => {
  const { report, getAllLedReport } = props;
  const tableRef = useRef(null);
  const chartRef = useRef();

  const [filter, setFilter] = useState('kategori');
  const [period, setPeriod] = useState('triwulan');
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month') + 1);

  useEffect(() => {
    (async () => {
      await getAllLedReport(filter, period);
    })();
  }, [filter, period]);

  const axis = {
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    annual: ['TH1'],
    semester: ['Sem 1', 'Sem 2'],
    triwulan: ['TW1', 'TW2', 'TW3', 'TW4'],
  };

  const tableValue = (data) => {
    const newData = data.map((item) => {
      return {
        ...item,
        nominal:
          period !== 'month'
            ? chartValue(item?.nominal, period)
            : [item?.nominal[selectedMonth - 1] ? item?.nominal[selectedMonth - 1] : 0],
        frekuensi:
          period !== 'month'
            ? chartValue(item?.frekuensi, period)
            : [item?.nominal[selectedMonth - 1] ? item?.nominal[selectedMonth - 1] : 0],
      };
    });

    return newData;
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `laporan-LED-${month[dayjs().month() - 1].label.toLowerCase()}-${dayjs().year()}`,
    sheet: 'LED',
  });

  const handleDownload = () => {
    onDownload();
    exportComponentAsJPEG(chartRef, {
      fileName: `BarChart-${period}-${filter}`,
      html2CanvasOptions: { height: 500 },
    });
  };

  return (
    <PageContainer title="Led Report" description="Led Report Page">
      <DashboardCard>
        <div>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            Laporan LED
          </Typography>

          <div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Autocomplete
                sx={{ width: '200px' }}
                options={officeOpt}
                // onChange={(event, newValue) => {
                //   if (newValue !== null) {
                //     setFilter(newValue.value);
                //   }
                // }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Kantor" />}
              />

              <Autocomplete
                sx={{ width: '200px' }}
                options={periodOpt}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setPeriod(newValue.value);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="Periode" />}
              />

              {period === 'month' ? (
                <Autocomplete
                  sx={{ width: '200px' }}
                  options={month}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      setSelectedMonth(newValue.value);
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => <TextField {...params} label="Bulan" />}
                />
              ) : null}

              {period === 'annualy' ? (
                <Autocomplete
                  sx={{ width: '200px' }}
                  options={[
                    { label: '1 tahun', value: 1 },
                    { label: '2 tahun', value: 2 },
                    { label: '5 tahun', value: 5 },
                    { label: '10 tahun', value: 10 },
                  ]}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      setSelectedYear(newValue.value);
                    }
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  renderInput={(params) => <TextField {...params} label="Tahun" />}
                />
              ) : null}
            </div>
            <Button onClick={handleDownload} startIcon={<IconDownload size={18} />}>
              Unduh Laporan
            </Button>
          </div>

          <ReportFilterTable
            data={tableValue(report?.report)}
            title={period}
            tableRef={tableRef}
            subHeader={period !== 'month' ? axis[period] : [axis[period][selectedMonth - 1]]}
          />
        </div>

        <div style={{ maxWidth: period === 'month' ? '500px' : '1000px' }} ref={chartRef}>
          {period !== 'month' ? (
            <BarChart
              data={report?.report}
              label={axis[period]}
              title={`Grand total ${filter} kurun waktu ${periodTranslate[period]}`}
              period={period}
            />
          ) : (
            <PieChart
              data={report?.report}
              title={`Grafik frekuensi kejadian tiap ${filter}`}
              chosenMonth={selectedMonth}
            />
          )}
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
    getAllLedReport: (fil, period) => dispatch(getAllLedReport(fil, period)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LedReport);
