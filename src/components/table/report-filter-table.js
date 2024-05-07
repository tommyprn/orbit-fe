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
  '&:last-child td, &:last-child th': {},
}));

const ReportFilterTable = ({ data, title, tableRef, subHeader, selectedCase }) => {
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
        overflowY: 'hidden',
      }}
      elevation={0}
      variant="outlined"
    >
      <TableContainer
        sx={{
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
              <TableCell rowSpan={4} sx={{ borderRight: '1px solid #e5eaef' }}>
                {selectedCase.charAt(0).toUpperCase() + selectedCase.slice(1)} Kejadian
              </TableCell>
              <TableCell colSpan={subHeader?.length * 4} align="center">
                {tableTitle[title]}
              </TableCell>
            </TableRow>
            <TableRow>
              {subHeader.map((item, i) => {
                return (
                  <TableCell
                    key={i}
                    colSpan={4}
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
                    <TableCell
                      rowSpan={2}
                      sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}
                    >
                      Frekuensi
                    </TableCell>

                    <TableCell
                      colSpan={3}
                      sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}
                    >
                      nominal (Rp)
                    </TableCell>
                  </Fragment>
                );
              })}
            </TableRow>
            <TableRow>
              {subHeader?.map((item, i) => {
                return (
                  <Fragment key={i}>
                    <TableCell sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}>
                      Recovery
                    </TableCell>

                    <TableCell sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}>
                      Potential
                    </TableCell>

                    <TableCell sx={{ border: '1px solid #e5eaef', textAlign: 'center' }}>
                      Gross loss
                    </TableCell>
                  </Fragment>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              return (
                <StyledTableRow key={index}>
                  <TableCell sx={{ textWrap: 'noWrap' }}>{row.label}</TableCell>

                  {row.frekuensi?.map((item, i) => {
                    return (
                      <Fragment key={i}>
                        <TableCell sx={{ textAlign: 'center', borderLeft: '1px solid #e5eaef' }}>
                          {formatNumber(item) || 0}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          {formatNumber(row.recovery[i]) || 0}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          {formatNumber(row.potensiKerugian[i]) || 0}
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          {formatNumber(row.realisasiKerugian[i]) || 0}
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
