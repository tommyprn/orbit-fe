import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { month } from '../../utils/get-dropdown-data';
import { getAllOfficeReport } from 'src/actions/reportActions';
import { connect, useSelector } from 'react-redux';
import { Card, Divider, Typography, Autocomplete, TextField } from '@mui/material';

// component
import SearchBar from 'src/components/search-bar/SearchBar';
import PageContainer from 'src/components/container/PageContainer';
import ZeroReportTable from 'src/components/table/zero-report-table';

import './report.css';

const OfficeReport = (props) => {
  const customizer = useSelector((state) => state.customizer);

  const { report, getAllOfficeReport } = props;
  const [keyword, setKeyword] = useState('');
  const [zeroReport, setZeroReport] = useState({});
  const [monthFilter, setMonthFilter] = useState(1);

  useEffect(() => {
    (async () => {
      await getAllOfficeReport(monthFilter, keyword);
    })();
  }, [keyword, monthFilter]);

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

  return (
    <PageContainer title="Report Office" description="Report Office Page">
      {report?.reported && report?.unreported ? null : (
        <Card className="first-section" elevation={customizer.isCardShadow ? 9 : 0}>
          <Typography variant="h4">Laporan LED Berdasarkan Kantor</Typography>

          <div style={{ display: 'flex', gap: '16px' }}>
            <SearchBar onSubmit={onSearch} customStyle={{ height: '54px' }} />
            <Autocomplete
              sx={{ width: '200px' }}
              options={month}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setMonthFilter(newValue.value);
                }
              }}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              renderInput={(params) => <TextField {...params} label="Bulan" />}
            />
          </div>

          <Divider />

          <div className="first-section-content">
            <ZeroReportTable
              data={zeroReport.reported}
              title="Sudah melapor"
              message="Belum ada KCU / unit kerja yang membuat laporan"
            />

            <ZeroReportTable
              data={zeroReport.unreported}
              title="Belum melapor"
              message="Seluruh KCU & unit kerja sudah mengumpulkan laporan"
            />
          </div>
        </Card>
      )}
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
    getAllOfficeReport: (month, keyword) => dispatch(getAllOfficeReport(month, keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficeReport);
