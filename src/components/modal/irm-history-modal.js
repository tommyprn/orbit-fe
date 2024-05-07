import { useEffect } from 'react';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import {
  Paper,
  Table,
  styled,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import { getOneIrmActionReport } from 'src/actions/reportActions';

// component
import SimpleModal from './simpleModal';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const newStyle = {
  p: 3,
  top: '50%',
  left: '50%',
  width: '80vw',
  maxHeight: 400,
  bgcolor: 'background.paper',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
};

const IrmHistoryModal = ({ id, report, title, isOpen, getOneIrmActionReport, onCloseHandler }) => {
  useEffect(() => {
    (async () => {
      if (id) {
        await getOneIrmActionReport(id);
      }
    })();
  }, [id]);

  const header = ['No', 'NIK', 'Nama', 'Aksi', 'Catatan', 'Tanggal'];

  return (
    <SimpleModal title={title} isOpen={isOpen} newStyle={newStyle} onCloseHandler={onCloseHandler}>
      <Paper
        sx={{
          maxWidth: '100%',
          overflow: 'hidden',
        }}
        elevation={0}
        variant="outlined"
      >
        <TableContainer sx={{ maxHeight: '300px' }}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {header.map((item) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {report?.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>{row.nama}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>
                  <TableCell>{dayjs(row.tglEnd).format('DD - MMM - YYYY')}</TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </SimpleModal>
  );
};

const mapStateToProps = (state) => {
  return {
    report: state.report.detailedHistory.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOneIrmActionReport: (id) => dispatch(getOneIrmActionReport(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IrmHistoryModal);
