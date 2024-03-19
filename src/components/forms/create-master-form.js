import * as yup from 'yup';
import { useFormik } from 'formik';
import { Button, TextField } from '@mui/material';

const CreateMasterForm = ({ ssl, workUnit, masterTitle, onSaveHandler, onCloseHandler }) => {
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

  const workUnitValidationSchema = yup.object({
    pic: yup.string(`masukkan PIC ${masterTitle}`).required('nama PIC wajib diisi'),
    code: yup
      .string(`masukkan kode ${masterTitle}`)
      .required('Kode wajib diisi')
      .max(3, 'maksimal 3 karakter'),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    email: yup.string(`masukkan email PIC ${masterTitle}`).required('email PIC wajib diisi'),
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

  const workUnitFormik = useFormik({
    initialValues: {
      pic: '',
      code: '',
      name: '',
      email: '',
    },
    validationSchema: workUnitValidationSchema,
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
        id={'code'}
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
        id={'name'}
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

  const workUnitForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={workUnitFormik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="code"
        label={`kode ${masterTitle} baru`}
        variant="outlined"
        required
        value={workUnitFormik.values.code}
        error={workUnitFormik.touched.code && Boolean(workUnitFormik.errors.code)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.code && workUnitFormik.errors.code}
      />
      <TextField
        id="name"
        sx={{ width: '100%' }}
        label={`nama ${masterTitle}`}
        variant="outlined"
        required
        error={workUnitFormik.touched.name && Boolean(workUnitFormik.errors.name)}
        value={workUnitFormik.values.name}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.name && workUnitFormik.errors.name}
      />

      <TextField
        sx={{ width: '100%' }}
        id="pic"
        label="PIC unit kerja"
        variant="outlined"
        required
        value={workUnitFormik.values.pic}
        error={workUnitFormik.touched.pic && Boolean(workUnitFormik.errors.pic)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.pic && workUnitFormik.errors.pic}
      />

      <TextField
        sx={{ width: '100%' }}
        id="email"
        label="email PIC"
        variant="outlined"
        required
        value={workUnitFormik.values.email}
        error={workUnitFormik.touched.email && Boolean(workUnitFormik.errors.email)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.email && workUnitFormik.errors.email}
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
        id={'name'}
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
        id={'description'}
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

  return ssl ? sslForm : workUnit ? workUnitForm : basicForm;
};

export default CreateMasterForm;
