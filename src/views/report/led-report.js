import React, { useEffect, useState, useRef, Fragment, useMemo } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { chartValue } from 'src/utils/use-chart-utils';
import { getDropdown } from 'src/actions/masterDataActions';
import { IconDownload } from '@tabler/icons';
import { getAllLedReport } from 'src/actions/reportActions';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { geoOpt, periodOpt, caseOpt, month, getYearOpt } from '../../utils/get-dropdown-data';
import {
  Button,
  Switch,
  TextField,
  Autocomplete,
  Typography,
  FormControlLabel,
} from '@mui/material';

// component
import BarChart from 'src/components/shared/charts/bar-chart';
import PieChart from 'src/components/shared/charts/pie-chart';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ReportFilterTable from 'src/components/table/report-filter-table';

import './report.css';

const LedReport = (props) => {
  const { report, dropdown, getDropdown, getAllLedReport } = props;
  const tableRef = useRef(null);
  const chartRef = useRef();

  const [filter, setFilter] = useState();
  const [period, setPeriod] = useState('triwulan');
  const [isRegion, setIsRegion] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCase, setSelectedCase] = useState('kategori');
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month'));

  useEffect(() => {
    (async () => {
      await getDropdown();
      await getAllLedReport(selectedCase, selectedYear, filter, isRegion);
    })();
  }, [filter, selectedYear, selectedCase]);

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
        realisasiKerugian:
          period !== 'month'
            ? chartValue(item?.realisasiKerugian, period)
            : [
                item?.realisasiKerugian[selectedMonth - 1]
                  ? item?.realisasiKerugian[selectedMonth - 1]
                  : 0,
              ],
        recovery:
          period !== 'month'
            ? chartValue(item?.recovery, period)
            : [item?.recovery[selectedMonth - 1] ? item?.recovery[selectedMonth - 1] : 0],
        potensiKerugian:
          period !== 'month'
            ? chartValue(item?.potensiKerugian, period)
            : [
                item?.potensiKerugian[selectedMonth - 1]
                  ? item?.potensiKerugian[selectedMonth - 1]
                  : 0,
              ],
        frekuensi:
          period !== 'month'
            ? chartValue(item?.frekuensi, period)
            : [item?.frekuensi[selectedMonth - 1] ? item?.frekuensi[selectedMonth - 1] : 0],
      };
    });

    return newData;
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `laporan-LED-${month[dayjs().month() - 1].label.toLowerCase()}-${dayjs().year()}`,
    sheet: 'LED',
  });

  const handleDownloadTable = () => {
    onDownload();
  };

  const handleDOwnloadGraph = () => {
    exportComponentAsJPEG(chartRef, {
      fileName: `BarChart-${selectedType}-${selectedYear}`,
      html2CanvasOptions: { height: 500 },
    });
  };

  const getCaseOpt = useMemo(() => {
    return report?.report.filter((item) => item.label !== 'Grand Total').map((item) => item.label);
  }, [report?.report]);

  const onCheck = () => {
    setIsRegion(!isRegion);
  };

  return (
    <PageContainer title="Led Report" description="Led Report Page">
      <DashboardCard>
        <div>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            Laporan LED
          </Typography>

          <FormControlLabel
            control={<Switch checked={!isRegion} onChange={onCheck} />}
            label={!isRegion ? 'Dropdown Cabang' : 'Dropdown Region'}
          />

          <div
            style={{
              gap: '16px',
              display: 'flex',
              margin: '20px 0',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <Autocomplete
                sx={{ width: '300px' }}
                options={geoOpt(!isRegion ? dropdown.branch : dropdown.region)}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setFilter(newValue.id);
                  } else {
                    setFilter('');
                  }
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label={!isRegion ? 'filter cabang' : 'filter region'} />
                )}
              />
              <Autocomplete
                sx={{ width: '200px' }}
                options={caseOpt}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setSelectedCase(newValue.value);
                  }
                }}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                renderInput={(params) => <TextField {...params} label="filter kejadian" />}
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

              <Autocomplete
                sx={{ width: '200px' }}
                options={getYearOpt()}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setSelectedYear(newValue);
                  }
                }}
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={(params) => <TextField {...params} label="Tahun" />}
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
            </div>
            <Button onClick={handleDownloadTable} startIcon={<IconDownload size={18} />}>
              Unduh Tabel Laporan
            </Button>
          </div>

          <ReportFilterTable
            data={tableValue(report?.report)}
            title={period}
            tableRef={tableRef}
            subHeader={period !== 'month' ? axis[period] : [axis[period][selectedMonth - 1]]}
            selectedCase={selectedCase}
          />
        </div>

        <div
          style={{
            gap: '24px',
            display: 'flex',
            marginTop: '24px',
            justifyContent: 'space-between',
          }}
        >
          <Autocomplete
            sx={{ width: '400px' }}
            options={getCaseOpt}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                setSelectedType(newValue);
              }
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} label="jenis kejadian" />}
          />
          <Button onClick={handleDOwnloadGraph} startIcon={<IconDownload size={18} />}>
            Unduh Grafik Laporan
          </Button>
        </div>

        <div
          style={{
            maxWidth: '1100px',
          }}
          ref={chartRef}
        >
          {period !== 'month' ? (
            <Fragment>
              <div
                style={{
                  display: 'flex',
                  maxWidth: '1000px',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ transform: 'rotate(270deg)', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Nominal
                </Typography>
                <BarChart
                  data={report?.report}
                  label={axis[period]}
                  title={`${selectedType} ${selectedYear}`}
                  period={period}
                  filter={selectedType}
                />
                <Typography
                  sx={{ transform: 'rotate(90deg)', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Frekuensi
                </Typography>
              </div>
            </Fragment>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '1000px',
              }}
            >
              <PieChart
                data={report?.report}
                title={`nominal gross loss bulan ${dayjs()
                  .month(selectedMonth - 1)
                  .format('MMMM')}`}
                chosenMonth={selectedMonth}
              />
            </div>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.masterData.dropdown,
    report: state.report,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDropdown: () => dispatch(getDropdown()),
    getAllLedReport: (selCase, fil, period, isRegion) =>
      dispatch(getAllLedReport(selCase, fil, period, isRegion)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LedReport);
