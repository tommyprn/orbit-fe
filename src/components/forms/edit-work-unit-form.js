import * as yup from 'yup';
import { useFormik } from 'formik';
import { createIdOption } from 'src/utils/use-options';
import {
  Radio,
  Button,
  TextField,
  Typography,
  RadioGroup,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';

// yup validation

const EditWorkUnitForm = ({
  workUnit,
  selected,
  regionOpt,
  parentOpt,
  masterTitle,
  onSaveHandler,
  onCloseHandler,
}) => {
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
    approver: yup.string(`masukkan nama approver ${masterTitle}`),

    emailApprover: yup.string(`masukkan email approver ${masterTitle}`),

    emailUpperLevel: yup.string(`masukkan email upper level ${masterTitle}`),
  });

  const workUnitFormik = useFormik({
    initialValues: {
      pic: selected.pic,
      code: selected.code,
      name: selected.name,
      email: selected.email,
      region: selected?.region,
      parent: selected?.parent,
      isEnable: selected.isEnable,
      approver: selected.approver,
      emailApprover: selected.emailApprover,
      emailUpperLevel: selected.emailUpperLevel,
    },
    validationSchema: workUnitValidationSchema,
    onSubmit: (values) => {
      onSaveHandler(values);
    },
  });

  const workUnitForm = (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={workUnitFormik.handleSubmit}
    >
      <TextField
        sx={{ width: '100%' }}
        id="code"
        label={`kode ${masterTitle}`}
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
      {workUnit === 'branch' ? (
        <>
          <Autocomplete
            disablePortal
            id="region"
            options={createIdOption(regionOpt)}
            value={workUnitFormik.values.region}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                workUnitFormik.setFieldValue('region', newValue.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="region"
                label="Kode region cabang"
                error={workUnitFormik.touched.region && Boolean(workUnitFormik.errors.region)}
                value={workUnitFormik.values.region}
                onBlur={workUnitFormik.handleBlur}
                helperText={workUnitFormik.touched.region && workUnitFormik.errors.region}
              />
            )}
          />

          <Autocomplete
            disablePortal
            id="parent"
            options={createIdOption(parentOpt)}
            value={workUnitFormik.values.parent}
            onChange={(event, newValue) => {
              if (newValue !== null) {
                workUnitFormik.setFieldValue('parent', newValue.id);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                id="parent"
                label="Kode induk cabang"
                error={workUnitFormik.touched.parent && Boolean(workUnitFormik.errors.parent)}
                value={workUnitFormik.values.parent}
                onBlur={workUnitFormik.handleBlur}
                helperText={workUnitFormik.touched.parent && workUnitFormik.errors.parent}
              />
            )}
          />
        </>
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
        value={workUnitFormik.values.emailUpperLevel}
        error={
          workUnitFormik.touched.emailUpperLevel && Boolean(workUnitFormik.errors.emailUpperLevel)
        }
        onBlur={workUnitFormik.handleBlur}
        onChange={workUnitFormik.handleChange}
        helperText={workUnitFormik.touched.emailUpperLevel && workUnitFormik.errors.emailUpperLevel}
      />

      <div>
        <Typography>Status {masterTitle}</Typography>
        <RadioGroup
          id="isEnable"
          value={workUnitFormik.values.isEnable}
          onChange={(e, value) => {
            value === 'true'
              ? workUnitFormik.setFieldValue('isEnable', true)
              : workUnitFormik.setFieldValue('isEnable', false);
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

  return workUnitForm;
};

export default EditWorkUnitForm;
