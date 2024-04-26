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
    code: yup.string().when(workUnit, {
      is: 'branch',
      then: yup.number(`masukkan kode ${masterTitle}`).required('Kode wajib diisi'),
    }),
    name: yup.string(`masukkan nama ${masterTitle}`).required(`Nama ${masterTitle} wajib diisi`),
    email: yup.string(`masukkan email PIC ${masterTitle}`).required('email PIC wajib diisi'),
    parent: yup
      .number(`masukkan induk nama ${masterTitle}`)
      .typeError('diisi dengan nomor kode induk')
      .when(workUnit, {
        is: 'branch',
        then: yup.number().required('wajib diisi'),
      }),
    approver: yup
      .string(`masukkan nama approver ${masterTitle}`)
      .required(`Nama approver ${masterTitle} wajib diisi`),
    emailApprover: yup
      .string(`masukkan email approver ${masterTitle}`)
      .required(`Email approver ${masterTitle} wajib diisi`),
    emailUpperLevel: yup
      .string(`masukkan email upper level ${masterTitle}`)
      .required(`masukkan email upper level ${masterTitle} wajib diisi`),
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
      code: null,
      name: '',
      email: '',
      parent: '',
      approver: '',
      emailApprover: '',
      emailUpperLevel: '',
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

  const workUnitForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={workUnitFormik.handleSubmit}
    >
      <TextField
        required
        sx={{ width: '100%' }}
        id="code"
        label={`kode ${masterTitle} baru`}
        variant="outlined"
        value={workUnitFormik.values.code}
        error={workUnitFormik.touched.code && Boolean(workUnitFormik.errors.code)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.code && workUnitFormik.errors.code}
      />
      <TextField
        required
        id="name"
        sx={{ width: '100%' }}
        label={`nama ${masterTitle}`}
        variant="outlined"
        error={workUnitFormik.touched.name && Boolean(workUnitFormik.errors.name)}
        value={workUnitFormik.values.name}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.name && workUnitFormik.errors.name}
      />
      {workUnit === 'branch' ? (
        <TextField
          required
          id="parent"
          sx={{ width: '100%' }}
          label={`nama induk cabang`}
          variant="outlined"
          error={workUnitFormik.touched.parent && Boolean(workUnitFormik.errors.parent)}
          value={workUnitFormik.values.parent}
          onBlur={workUnitFormik.handleBlur}
          onChange={workUnitFormik.handleChange}
          helperText={workUnitFormik.touched.parent && workUnitFormik.errors.parent}
        />
      ) : null}

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

      <TextField
        sx={{ width: '100%' }}
        id="approver"
        label="nama approver"
        variant="outlined"
        required
        value={workUnitFormik.values.approver}
        error={workUnitFormik.touched.approver && Boolean(workUnitFormik.errors.approver)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.approver && workUnitFormik.errors.approver}
      />

      <TextField
        sx={{ width: '100%' }}
        id="emailApprover"
        label="email approver"
        variant="outlined"
        required
        value={workUnitFormik.values.emailApprover}
        error={workUnitFormik.touched.emailApprover && Boolean(workUnitFormik.errors.emailApprover)}
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.emailApprover && workUnitFormik.errors.emailApprover}
      />

      <TextField
        sx={{ width: '100%' }}
        id="emailUpperLevel"
        label="email L2/ upper level"
        variant="outlined"
        required
        value={workUnitFormik.values.emailUpperLevel}
        error={
          workUnitFormik.touched.emailUpperLevel && Boolean(workUnitFormik.errors.emailUpperLevel)
        }
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.emailUpperLevel && workUnitFormik.errors.emailUpperLevel}
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

  return ssl ? sslForm : workUnit ? workUnitForm : basicForm;
};

export default CreateMasterForm;
