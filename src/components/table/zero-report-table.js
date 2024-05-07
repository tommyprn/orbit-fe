import React, { useRef } from 'react';
import dayjs from 'dayjs';
import {
  Paper,
  Table,
  styled,
  Button,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';
import { IconDownload } from '@tabler/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ZeroReportTable = ({ data, title, isFinished }) => {
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Laporan LED berdasarkan kantor - cabang ${title}`,
    sheet: 'LED',
  });

  return (
    <div className="nil-container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6">
          {title} : {data?.length}
        </Typography>

        <Button startIcon={<IconDownload size={18} />} onClick={onDownload}>
          Unduh Laporan
        </Button>
      </div>

      <Paper
        sx={{
          maxWidth: '100%',
          marginBottom: '20px',
        }}
        elevation={0}
        variant="outlined"
      >
        <TableContainer className="table-filter" ref={tableRef}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Region/ Direktorat</TableCell>
                <TableCell>Nama Cabang/ Divisi</TableCell>
                {isFinished ? <TableCell>Tanggal Pengumpulan</TableCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 ? (
                data?.map((row, index) => {
                  return (
                    <StyledTableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.keterangan ? row?.keterangan : '-'}</TableCell>
                      <TableCell>{row.nama ? row.nama : '-'}</TableCell>
                      {isFinished ? (
                        <TableCell>{dayjs(row?.tanggal).format('DD-MMM-YYYY')}</TableCell>
                      ) : null}
                    </StyledTableRow>
                  );
                })
              ) : (
                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell colSpan={isFinished ? 4 : 3} align="center">
                    <Typography variant="h6">Belum ada data cabang</Typography>
                  </TableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ZeroReportTable;
