/* eslint-disable no-unused-expressions */
import { useState } from 'react';
import { IconPlus } from '@tabler/icons';
import { Typography, Button } from '@mui/material';

// component
import BaseCard from '../shared/BaseCard';
import SearchBar from 'src/components/search-bar/SearchBar';

export const ZeroReportTable = ({
  data,
  onSearch,
  onUpdate,
  onDelete,
  onPageChange,
  onOpenHandler,
}) => {
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //     onPageChange(rowsPerPage, newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     const RPP = parseInt(event.target.value, 10);
  //     setRowsPerPage(RPP);
  //     setPage(0);
  //     onPageChange(RPP, 0);
  //   };

  const header = ['No', 'Belum Melapor', 'Sudah Melapor'];

  const CardHeader = (
    <>
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 14,
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h3">Report tipe A</Typography>
        <Button variant="contained" startIcon={<IconPlus />} onClick={onOpenHandler}>
          Add
        </Button>
      </div>

      <div
        style={{
          paddingBottom: 24,
          paddingLeft: 24,
        }}
      >
        <SearchBar onSubmit={(val) => onSearch(val)} />
      </div>
    </>
  );

  const dataToMap = () => {
    if (data.reported?.length > data.ureported?.length) {
      return data.reported.map();
    } else {
      return data.unreported;
    }
  };

  return (
    <BaseCard title="Report tipe A" CustomHeader={CardHeader}>
      <table
        style={{ width: '100%', backgroundColor: '', borderBottom: '1px solid rgba(0,0,0,0.1)' }}
      >
        <thead style={{ width: '100%' }}>
          <tr
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              paddingBottom: '8px',
              marginBottom: '8px',
            }}
          >
            {header?.map((item, index) => {
              return (
                <td key={index} style={{}}>
                  <Typography>{item}</Typography>
                </td>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {dataToMap()?.map((item, index) => {
            return (
              <tr
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                }}
              >
                <td style={{}}>
                  <Typography>{index + 1}</Typography>
                </td>
              </tr>
            );
          })}
          {data.unreported?.map((item, i) => {
            return (
              <td style={{}}>
                <Typography> {item}</Typography>
              </td>
            );
          })}

          {data.reported?.map((item, i) => {
            return (
              <td style={{}}>
                <Typography> {item}</Typography>
              </td>
            );
          })}
        </tbody>
      </table>

      {/* <TablePagination
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
        page={page}
        count={master?.totalData ?? 0}
        component="div"
        rowsPerPage={master?.perPage ?? rowsPerPage}
        onPageChange={handleChangePage}
        labelRowsPerPage="Baris per halaman"
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </BaseCard>
  );
};

export default ZeroReportTable;
