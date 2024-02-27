import * as yup from 'yup';
import { Button, Radio, Typography, TextField, RadioGroup, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';

// yup validation

const EditMasterForm = ({
  ssl,
  workUnit,
  selected,
  masterTitle,
  onSaveHandler,
  onCloseHandler,
}) => {
  const validationSchema = yup.object({
    id: yup.number(),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    description: yup.string(`masukkan deskripsi ${masterTitle}`).required('Deskripsi wajib diisi'),
    isEnable: yup.boolean('harap memilih salah satu status'),
  });
  const sslValidationSchema = yup.object({
    id: yup.number(),
    code: ssl
      ? yup.number(`masukkan ${masterTitle}`).required('Kode wajib diisi')
      : yup.string(`masukkan ${masterTitle}`).required('Kode wajib diisi'),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    isEnable: yup.boolean('harap memilih salah satu status'),
  });

  const formik = useFormik({
    initialValues: {
      id: selected.id,
      name: selected.name,
      description: selected.description,
      isEnable: selected.isEnable,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const sslFormik = useFormik({
    initialValues: {
      id: selected.id,
      code: selected.code,
      name: selected.name,
      isEnable: selected.isEnable,
    },
    validationSchema: sslValidationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const basicForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id={'name'}
        label={`Nama ${masterTitle}`}
        variant="outlined"
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
        multiline
        error={formik.touched.description && Boolean(formik.errors.description)}
        value={formik.values.description}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        helperText={formik.touched.description && formik.errors.description}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={formik.values.isEnable}
          onChange={(e, value) => {
            formik.setFieldValue('isEnable', value);
          }}
          sx={{ flexDirection: 'row' }}
        >
          <FormControlLabel value={true} control={<Radio />} label="Aktif" />
          <FormControlLabel value={false} control={<Radio />} label="Non-Aktif" />
        </RadioGroup>
      </div>

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

  const sslForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={sslFormik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id={'code'}
        label={`Kode ${masterTitle}`}
        variant="outlined"
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
        label={`Nama ${masterTitle}`}
        variant="outlined"
        multiline
        error={sslFormik.touched.name && Boolean(sslFormik.errors.name)}
        value={sslFormik.values.name}
        onBlur={sslFormik.handleBlur}
        onChange={sslFormik.handleChange}
        helperText={sslFormik.touched.name && sslFormik.errors.name}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={sslFormik.values.isEnable}
          onChange={(e, value) => {
            sslFormik.setFieldValue('isEnable', value);
          }}
          sx={{ flexDirection: 'row' }}
        >
          <FormControlLabel value={true} control={<Radio />} label="Aktif" />
          <FormControlLabel value={false} control={<Radio />} label="Non-Aktif" />
        </RadioGroup>
      </div>

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

  return ssl ? sslForm : workUnit ? sslForm : basicForm;
};

export default EditMasterForm;
