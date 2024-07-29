import dayjs from 'dayjs';
import { useRef } from 'react';
import { IconDownload } from '@tabler/icons';
import { useDownloadExcel } from 'react-export-table-to-excel';

import {
  Table,
  Button,
  styled,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
} from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ActionPlanReportTable = ({ data }) => {
  const tableRef = useRef();

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `detail-laporan-action-plan-LED`,
    sheet: 'Rencana Tindakan',
  });

  const header = [
    'No',
    'Nomor Laporan',
    'Rencana Tindakan',
    'Divisi',
    'PIC',
    'Email PIC',
    'Target Penyelesaian',
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginTop: '32px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">List Rencana Tindakan</Typography>
        <Button startIcon={<IconDownload size={18} />} onClick={onDownload}>
          Unduh Laporan Rencana Tindakan
        </Button>
      </div>

      <TableContainer
        sx={{
          overflowY: 'hidden',
          border: '1px solid #e5eaef',
          borderRadius: '8px',
        }}
        ref={tableRef}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {header.map((item, i) => (
                <TableCell key={i}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.laporanLed?.idLaporan}</TableCell>
                <TableCell>{row?.actionPlan}</TableCell>
                <TableCell>
                  {row?.unitKerjaEntity?.namaUnitKerja?.toLowecase() !== 'cabang'
                    ? row?.unitKerjaEntity?.namaUnitKerja
                    : row?.cabangEntity?.namaCabang}
                </TableCell>
                <TableCell>{row?.penanggungJawab}</TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{dayjs(row?.targetPenyelesaian).format('DD - MMM - YYYY')}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActionPlanReportTable;
