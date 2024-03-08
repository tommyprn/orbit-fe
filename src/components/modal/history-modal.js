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
import { getHistoryLED } from 'src/actions/formLEDActions';

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

const HistoryModal = ({ id, reportId, LED, title, isOpen, getHistoryLED, onCloseHandler }) => {
  useEffect(() => {
    (async () => {
      await getHistoryLED(id);
    })();
  }, [id]);

  const role = {
    1: 'Inputer',
    2: 'Approver',
    3: 'IRM',
  };

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
                <TableCell>no</TableCell>
                <TableCell>ID laporan</TableCell>
                <TableCell>NIP</TableCell>
                <TableCell>Posisi</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tanggal mulai</TableCell>
                <TableCell>Tanggal berakhir</TableCell>
                <TableCell>Status laporan</TableCell>
                <TableCell>Keterangan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LED?.data?.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{reportId || 'DRAFT'}</TableCell>
                  <TableCell>{row.createdBy}</TableCell>
                  <TableCell>{role[row.idFlow]}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{dayjs(row.tglStart).format('DD-MMM-YY')}</TableCell>
                  <TableCell>{row.tglEnd ? dayjs(row.tglEnd).format('DD-MMM-YY') : '-'}</TableCell>
                  <TableCell>{row.statusLaporanEntity?.nama}</TableCell>
                  <TableCell>{row.keterangan}</TableCell>
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
    LED: state.LED.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistoryLED: (id) => dispatch(getHistoryLED(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryModal);
