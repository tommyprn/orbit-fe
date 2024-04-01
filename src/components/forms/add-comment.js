import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

import SimpleModal from '../modal/simpleModal';

const AddComment = ({ isOpen, title, newStyle, onSaveHandler, onCloseHandler }) => {
  // yup validation
  const validationSchema = yup.object({
    comment: yup
      .string(`masukkan alasan laporan ini ditolak`)
      .required(`wajib memberikan alasan ditolak`),
  });

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSaveHandler(values.comment);
    },
  });

  return (
    <SimpleModal title={title} isOpen={isOpen} newStyle={newStyle} onCloseHandler={onCloseHandler}>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          sx={{ width: '100%' }}
          id="comment"
          rows={5}
          label={`Komentar`}
          value={formik.values.comment}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          onBlur={formik.handleBlur}
          variant="outlined"
          onChange={formik.handleChange}
          helperText={formik.errors.comment}
          required
          multiline
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Button variant="contained" color="warning" onClick={onCloseHandler}>
            Kembali
          </Button>
          <Button variant="contained" color="error" type="submit">
            Tolak Laporan
          </Button>
        </div>
      </form>
    </SimpleModal>
  );
};

export default AddComment;
