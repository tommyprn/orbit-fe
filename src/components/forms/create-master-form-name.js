import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';

const CreateMasterFormName = ({ masterTitle, onSaveHandler, onCloseHandler }) => {
  // yup validation
  const validationSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="name"
        label={`${masterTitle} baru`}
        variant="outlined"
        required
        value={formik.values.name}
        error={formik.touched.name && Boolean(formik.errors.name)}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={formik.touched.name && formik.errors.name}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        <Button variant="contained" color="error" onClick={onCloseHandler}>
          Batal
        </Button>
        <Button variant="contained" type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default CreateMasterFormName;
