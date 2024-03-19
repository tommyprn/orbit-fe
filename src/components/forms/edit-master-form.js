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

  const workUnitValidationSchema = yup.object({
    pic: yup.string(`masukkan PIC ${masterTitle}`).required('nama PIC wajib diisi'),
    code: yup.string(`masukkan kode ${masterTitle}`).required('Kode wajib diisi').max(3),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    email: yup.string(`masukkan email PIC ${masterTitle}`).required('email PIC wajib diisi'),
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

  const workUnitFormik = useFormik({
    initialValues: {
      pic: selected.pic,
      code: selected.code,
      name: selected.name,
      email: selected.email,
    },
    validationSchema: workUnitValidationSchema,
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
            value === 'true'
              ? formik.setFieldValue('isEnable', true)
              : formik.setFieldValue('isEnable', false);
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
            value === 'true'
              ? sslFormik.setFieldValue('isEnable', true)
              : sslFormik.setFieldValue('isEnable', false);
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

  return ssl ? sslForm : workUnit ? workUnitForm : basicForm;
};

export default EditMasterForm;
