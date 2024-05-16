import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

const CreateMasterForm = ({ ssl, masterTitle, onSaveHandler, onCloseHandler }) => {
  // yup validation
  const validationSchema = yup.object({
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    description: yup.string(`masukkan deskripsi ${masterTitle}`).required('Deskripsi wajib diisi'),
  });

  const sslValidationSchema = yup.object({
    code: ssl
      ? yup.number(`masukkan kode ${masterTitle}`).required('Kode wajib diisi')
      : yup.string(`masukkan kode ${masterTitle}`).required('Kode wajib diisi'),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const sslFormik = useFormik({
    initialValues: {
      code: '',
      name: '',
    },
    validationSchema: sslValidationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const sslForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={sslFormik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="code"
        label={`kode ${masterTitle} baru`}
        variant="outlined"
        required
        value={sslFormik.values.code}
        error={sslFormik.touched.code && Boolean(sslFormik.errors.code)}
        onBlur={sslFormik.handleBlur}
        onChange={sslFormik.handleChange}
        helperText={sslFormik.touched.code && sslFormik.errors.code}
      />
      <TextField
        id="name"
        sx={{ width: '100%' }}
        rows={4}
        label={`nama ${masterTitle}`}
        variant="outlined"
        required
        multiline
        error={sslFormik.touched.name && Boolean(sslFormik.errors.name)}
        value={sslFormik.values.name}
        onBlur={sslFormik.handleBlur}
        onChange={sslFormik.handleChange}
        helperText={sslFormik.touched.name && sslFormik.errors.name}
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

  const basicForm = (
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
      <TextField
        id="description"
        sx={{ width: '100%' }}
        rows={4}
        label="Deskripsi"
        variant="outlined"
        required
        multiline
        error={formik.touched.description && Boolean(formik.errors.description)}
        value={formik.values.description}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={formik.touched.description && formik.errors.description}
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

  return ssl ? sslForm : basicForm;
};

export default CreateMasterForm;
