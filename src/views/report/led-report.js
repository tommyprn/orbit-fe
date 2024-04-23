import React, { useEffect, useState, useRef } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { chunkArray } from 'src/utils/use-calculate';
import { IconDownload } from '@tabler/icons';
import { saveSvgAsPng } from 'save-svg-as-png';
import { getAllLedReport } from 'src/actions/reportActions';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { officeOpt, periodOpt, month } from '../../utils/get-dropdown-data';
import { Button, TextField, Autocomplete, Typography } from '@mui/material';

// component
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ReportFilterTable from 'src/components/table/report-filter-table';

import './report.css';

const dummySeries = [
  {
    label: 'Eks. pengiriman',
    nominal: [35, 44, 24, 34, 35, 44, 24, 34, 35, 44, 24, 34],
    frekuensi: [35, 44, 24, 34, 35, 44, 24, 34, 35, 44, 24, 34],
  },
  {
    label: 'Eksternal fraud',
    nominal: [51, 6, 49, 30, 51, 6, 49, 30, 51, 6, 49, 30],
    frekuensi: [51, 6, 49, 30, 51, 6, 49, 30, 51, 6, 49, 30],
  },
  {
    label: 'kegagalan sistem',
    nominal: [15, 25, 30, 50, 15, 25, 30, 50, 15, 25, 30, 50],
    frekuensi: [15, 25, 30, 50, 15, 25, 30, 50, 15, 25, 30, 50],
  },
  {
    label: 'Internal Fraud',
    nominal: [60, 50, 15, 25, 60, 50, 15, 25, 60, 50, 15, 25],
    frekuensi: [60, 50, 15, 25, 60, 50, 15, 25, 60, 50, 15, 25],
  },

  {
    label: 'Kerusakan aset fisik',
    nominal: [12, 5, 8, 2, 12, 5, 8, 2, 12, 5, 8, 2],
    frekuensi: [12, 5, 8, 2, 12, 5, 8, 2, 12, 5, 8, 2],
  },
  {
    label: 'Praktek bisnis',
    nominal: [67, 23, 0, 5, 67, 23, 0, 5, 67, 23, 0, 5],
    frekuensi: [67, 23, 0, 5, 67, 23, 0, 5, 67, 23, 0, 5],
  },
  {
    color: 'orange',
    label: 'ketenagakerjaan & K3',
    nominal: [5, 3, 1, 11, 5, 3, 1, 11, 5, 3, 1, 11],
    frekuensi: [5, 3, 1, 11, 5, 3, 1, 11, 5, 3, 1, 11],
  },
  {
    label: 'grand total',
    nominal: [200, 50, 20, 10, 0, 15, 30, 70, 150, 300, 369, 299],
    frekuensi: [200, 50, 20, 10, 0, 15, 30, 70, 150, 300, 369, 299],
  },
];

const LedReport = (props) => {
  const { report, getAllLedReport } = props;
  const tableRef = useRef(null);
  const pieChartRef = useRef();
  const barChartRef = useRef();

  const [filter, setFilter] = useState('kategori');
  const [period, setPeriod] = useState('triwulan');

  useEffect(() => {
    (async () => {
      await getAllLedReport(filter, period);
    })();
  }, [filter, period]);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `laporan-LED-${month[dayjs().month() - 1].label.toLowerCase()}-${dayjs().year()}`,
    sheet: 'LED',
  });

  const axis = {
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    annual: ['TH1'],
    semester: ['Sem 1', 'Sem 2'],
    triwulan: ['TW1', 'TW2', 'TW3', 'TW4'],
  };

  const getSliceAmount = () => {
    if (period === 'month') {
      return 12;
    } else if (period === 'semester') {
      return 2;
    } else if (period === 'annual') {
      return 1;
    } else {
      return 4;
    }
  };

  const chartValue = (data) => {
    const newData = chunkArray(data, getSliceAmount());
    const newValue = newData.map((item) => {
      return item.reduce((sum, val) => {
        return sum + val;
      }, 0);
    });

    return newValue;
  };

  const tableValue = (data) => {
    const newData = data.map((item) => {
      return {
        ...item,
        nominal: chartValue(item?.nominal),
        frekuensi: chartValue(item?.frekuensi),
      };
    });

    return newData;
  };

  const handleDownload = () => {
    onDownload();
    saveSvgAsPng(pieChartRef?.current?.getElementsByTagName('svg')[0], 'pieChart.png');
    saveSvgAsPng(barChartRef.current, 'barChart.png');
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
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setFilter(newValue.value);
                  }
                }}
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
            </div>
            <Button onClick={handleDownload} startIcon={<IconDownload size={18} />}>
              Unduh Laporan
            </Button>
          </div>

          <ReportFilterTable
            data={tableValue(report?.report)}
            title={period}
            tableRef={tableRef}
            subHeader={axis[period]}
          />
        </div>

        {filter !== 'cabang' && report?.report.length > 0 ? (
          <>
            <BarChart
              series={report?.report
                .filter((item) => item?.label.toLocaleLowerCase() !== 'grand total')
                ?.map((item) => ({
                  ...item,
                  data: chartValue(item.frekuensi),
                }))}
              xAxis={[
                {
                  data: axis[period],
                  scaleType: 'band',
                  barGapRatio: 0.5,
                  categoryGapRatio: 0.4,
                },
              ]}
              ref={barChartRef}
              height={450}
              margin={{ top: 120 }}
            />

            <div
              ref={pieChartRef}
              style={{
                gap: 20,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}
            >
              {chartValue(report?.report?.[0]?.frekuensi).map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      gap: 16,
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '8px',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography variant="h5">{axis[period][index]}</Typography>
                    <PieChart
                      series={[
                        {
                          data: report?.report
                            ?.filter((item) => item?.label.toLocaleLowerCase() !== 'grand total')
                            ?.map((item) => ({
                              ...item,
                              value: chartValue(item.frekuensi)[index],
                            })),
                        },
                      ]}
                      width={250}
                      height={400}
                      margin={{ right: 0, top: -150 }}
                      slotProps={{
                        legend: {
                          padding: 0,
                          position: { vertical: 'bottom', horizontal: 'right' },
                          direction: 'row',
                          labelStyle: {
                            fontSize: 10,
                          },
                          itemMarkHeight: 2,
                        },
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
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
