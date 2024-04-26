import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { formatNumber } from 'src/utils/use-formatter';
import {
  Paper,
  Table,
  styled,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
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

const ReportFilterTable = ({ data, title, tableRef, subHeader }) => {
  const customizer = useSelector((state) => state.customizer);

  const tableTitle = {
    month: 'Bulanan',
    triwulan: 'Triwulan',
    semester: 'Semester',
    annual: 'Tahunan',
  };

  return (
    <Paper
      sx={{
        maxWidth: '100%',
        overflow: 'hidden',
      }}
      elevation={0}
      variant="outlined"
    >
      <TableContainer
        sx={{
          maxHeight: '350px',
          maxWidth: customizer.isCollapse
            ? `calc(100vw - 202px)`
            : window.innerWidth > 1199
            ? `calc(100vw - 385px)`
            : '100%',
        }}
        className="table-filter"
        ref={tableRef}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell rowSpan={3} sx={{ borderRight: '1px solid #e5eaef' }}>
                Kategori Jenis Kejadian
              </TableCell>
              <TableCell colSpan={subHeader?.length * 2} align="center">
                {tableTitle[title]}
              </TableCell>
            </TableRow>
            <TableRow>
              {subHeader.map((item, i) => {
                return (
                  <TableCell
                    key={i}
                    colSpan={2}
                    align="center"
                    sx={{ border: '1px solid #e5eaef' }}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
            <TableRow>
              {subHeader?.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <TableCell sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}>
                      Frekuensi
                    </TableCell>

                    <TableCell sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}>
                      nominal
                    </TableCell>
                  </Fragment>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.label}</TableCell>

                  {row.frekuensi?.map((item, i) => {
                    return (
                      <Fragment key={i}>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {formatNumber(item) || 0}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          {formatNumber(row.nominal[i]) || 0}
                        </TableCell>
                      </Fragment>
                    );
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ReportFilterTable;
