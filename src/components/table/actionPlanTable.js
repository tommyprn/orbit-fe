import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TextField,
  TableCell,
  TableHead,
  Typography,
  Autocomplete,
  TableContainer,
} from '@mui/material';

const ActionPlanTable = ({ formik }) => {
  const [rows, setRows] = useState([
    {
      id: 0,
      PIC: '',
      plan: '',
      file: '',
      email: '',
      workUnit: '',
      targetDate: '',
    },
  ]);

  const validationSchema = yup.object({
    actionPlan: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        PIC: yup
          .string(`masukkan PIC/ penanggung jawab dari rancangan ini`)
          .required(`kolom ini wajib diisi`),
        file: yup.string(`masukkan dampak dari kejadian`).nullable(),
        plan: yup
          .string(`rencana penganggulangan masalah dari kejadian`)
          .required(`kolom ini wajib diisi`),
        email: yup.string(`masukkan email dari PIC yang aktif`).required(`kolom ini wajib diisi`),
        workUnit: yup
          .string(`masukkan dampak dari kejadian`)
          .required('harap pilih unit kerja yang bersangkutan'),
        targetDate: yup
          .date(`input tanggal`)
          .required(`kolom ini wajib dipilih`)
          .max(new Date(), 'tanggal tidak boleh melebihi hari ini'),
      }),
    ),
  });

  const createOption = (option) => {
    if (option === undefined) {
      return [];
    } else {
      return option?.map((item) => {
        return { id: item.id, label: item.nama };
      });
    }
  };

  const addRow = () => {
    const actionPlan = [
      ...formik.values?.actionPlan,
      {
        id: rows.length,
        PIC: '',
        plan: '',
        file: '',
        email: '',
        workUnit: '',
        targetDate: '',
      },
    ];

    setRows(actionPlan);
    formik.setValues({ ...formik.values, actionPlan });
  };

  return (
    <Card
      elevation={0}
      sx={{
        gap: '16px',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography variant="h6" sx={{ width: '20%' }}>
          Tindak Lanjut
        </Typography>

        <Button variant="contained" onClick={addRow}>
          Tambah Plan
        </Button>
      </div>

      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>no</TableCell>
              <TableCell sx={{ width: '16%' }}>Action Plan*</TableCell>
              <TableCell sx={{ width: '16%' }}>Unit Kerja*</TableCell>
              <TableCell sx={{ width: '16%' }}>PIC*</TableCell>
              <TableCell sx={{ width: '16%' }}>Email PIC*</TableCell>
              <TableCell sx={{ width: '16%' }}>Tanggal target penyelesaian*</TableCell>
              <TableCell sx={{ width: '16%' }}>Lampiran</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" sx={{ width: '3%' }}>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <TextField
                    id={`actionPlan.${index}.plan`}
                    value={formik.values?.actionPlan?.[index]?.plan}
                    error={
                      formik.touched?.actionPlan?.[index]?.plan &&
                      Boolean(formik.errors?.actionPlan?.[index]?.plan)
                    }
                    onBlur={formik.handleBlur}
                    variant="standard"
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched?.actionPlan?.[index]?.plan &&
                      formik.errors?.actionPlan?.[index]?.plan
                    }
                    placeholder="rencana penanggulangan"
                  />
                </TableCell>
                <TableCell>
                  <Autocomplete
                    id={`actionPlan.${index}.workUnit`}
                    value={formik.actionPlan?.[index]?.workUnit}
                    options={createOption([
                      { id: 1, nama: 'test1' },
                      { id: 2, nama: 'test2' },
                      { id: 3, nama: 'test3' },
                    ])}
                    onChange={(event, newValue) => {
                      formik.setFieldValue(`actionPlan.${index}.workUnit`, newValue.label);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id={`actionPlan.${index}.workUnit`}
                        value={formik.values?.actionPlan?.[index]?.workUnit}
                        error={
                          formik.touched?.actionPlan?.[index]?.workUnit &&
                          Boolean(formik.errors?.actionPlan?.[index]?.workUnit)
                        }
                        onBlur={formik.handleBlur}
                        variant="standard"
                        helperText={
                          formik.touched?.actionPlan?.[index]?.workUnit &&
                          formik.errors?.actionPlan?.[index]?.workUnit
                        }
                        placeholder="pilih kode unit kerja"
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`actionPlan.${index}.PIC`}
                    value={formik.values?.actionPlan?.[index]?.PIC}
                    error={
                      formik.touched?.actionPlan?.[index]?.PIC &&
                      Boolean(formik.errors?.actionPlan?.[index]?.PIC)
                    }
                    onBlur={formik.handleBlur}
                    variant="standard"
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched?.actionPlan?.[index]?.PIC &&
                      formik.errors?.actionPlan?.[index]?.PIC
                    }
                    placeholder="penanggung jawab rencana"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`actionPlan.${index}.email`}
                    value={formik.values?.actionPlan?.[index]?.email}
                    error={
                      formik.touched?.actionPlan?.[index]?.email &&
                      Boolean(formik.errors?.actionPlan?.[index]?.email)
                    }
                    onBlur={formik.handleBlur}
                    variant="standard"
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched?.actionPlan?.[index]?.email &&
                      formik.errors?.actionPlan?.[index]?.email
                    }
                    placeholder="email penanggung jawab"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`actionPlan.${index}.targetDate`}
                    value={formik.values?.actionPlan?.[index]?.targetDate}
                    error={
                      formik.touched?.actionPlan?.[index]?.targetDate &&
                      Boolean(formik.errors?.actionPlan?.[index]?.targetDate)
                    }
                    onBlur={formik.handleBlur}
                    variant="standard"
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched?.actionPlan?.[index]?.targetDate &&
                      formik.errors?.actionPlan?.[index]?.targetDate
                    }
                    placeholder="target penyelesaian rencana"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`actionPlan.${index}.file`}
                    value={formik.values?.actionPlan?.[index]?.file}
                    error={
                      formik.touched?.actionPlan?.[index]?.file &&
                      Boolean(formik.errors?.actionPlan?.[index]?.file)
                    }
                    onBlur={formik.handleBlur}
                    variant="standard"
                    onChange={formik.handleChange}
                    helperText={
                      formik.touched?.actionPlan?.[index]?.file &&
                      formik.errors?.actionPlan?.[index]?.file
                    }
                    placeholder="lampiran laporan"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ActionPlanTable;
