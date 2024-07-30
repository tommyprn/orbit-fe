import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { chartValue } from 'src/utils/use-chart-utils';
import { getDropdown } from 'src/actions/masterDataActions';
import { getAllLedReport } from 'src/actions/reportActions';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { exportComponentAsJPEG } from 'react-component-export-image';
import { IconDownload, IconFilter } from '@tabler/icons';
import { month, caseOpt, periodOpt, statusOpt, getYearOpt } from '../../utils/get-dropdown-data';
import { Button, TextField, Typography, IconButton, Autocomplete } from '@mui/material';

// component
import BarChart from 'src/components/shared/charts/bar-chart';
import PieChart from 'src/components/shared/charts/pie-chart';
import FilterModal from 'src/components/modal/filter-modal';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ReportFilterTable from 'src/components/table/report-filter-table';

import './report.css';

const LedReport = (props) => {
  const { report, dropdown, getDropdown, getAllLedReport } = props;
  const tableRef = useRef(null);
  const chartRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [line, setLine] = useState([]);
  const [status, setStatus] = useState(3);
  const [period, setPeriod] = useState('triwulan');
  const [isDownload, setIsDownload] = useState(false);
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedCase, setSelectedCase] = useState('kategori');
  const [selectedYear, setSelectedYear] = useState(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState(dayjs().get('month'));

  useEffect(() => {
    (async () => {
      await getDropdown();
      await getAllLedReport(selectedCase, selectedYear, line, selectedLine, status);
    })();
  }, [line, status, selectedYear, selectedCase, selectedLine]);

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
    filename: `laporan-LED-${month[dayjs().month() - 1].label?.toLowerCase()}-${dayjs().year()}`,
    sheet: 'LED',
  });

  const handleDownloadTable = () => {
    setIsDownload(true);
    setTimeout(() => {
      onDownload();
      setIsDownload(false);
    }, [100]);
  };

  const handleDOwnloadGraph = () => {
    exportComponentAsJPEG(chartRef, {
      fileName: `${period !== 'month' ? 'BarChart' : 'PieChart'}-${selectedYear}`,
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <PageContainer title="Led Report" description="Led Report Page">
      <FilterModal
        data={dropdown}
        isOpen={isOpen}
        setLine={setLine}
        onCloseHandler={closeModal}
        setSelectedLine={setSelectedLine}
      />

      <DashboardCard>
        <div>
          <Typography variant="h6" sx={{ marginBottom: '16px' }}>
            Laporan LED
          </Typography>

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

              <IconButton
                sx={{
                  width: '50px',
                  height: '50px',
                }}
                color="#4a116f"
                onClick={openModal}
              >
                <IconFilter />
              </IconButton>
            </div>
            <Button onClick={handleDownloadTable} startIcon={<IconDownload size={18} />}>
              Unduh Tabel Laporan
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
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
              options={statusOpt(dropdown?.reportStatus)}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setStatus(newValue.value);
                }
              }}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => <TextField {...params} label="Status laporan" />}
            />
          </div>

          <ReportFilterTable
            data={tableValue(report?.report)}
            title={period}
            tableRef={tableRef}
            isDownload={isDownload}
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
          <div />
          <Button onClick={handleDOwnloadGraph} startIcon={<IconDownload size={18} />}>
            Unduh Grafik Laporan
          </Button>
        </div>

        <div ref={chartRef}>
          {period !== 'month' ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BarChart
                data={report?.report}
                label={axis[period]}
                title={`Periode ${period} ${selectedYear}`}
                period={period}
                filter={selectedCase}
              />
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '1000px',
                height: '500px',
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
    getAllLedReport: (selCase, year, line, selectedLine, status) =>
      dispatch(getAllLedReport(selCase, year, line, selectedLine, status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LedReport);
