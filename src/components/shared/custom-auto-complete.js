import React, { useState, useEffect } from 'react';
import { Switch, TextField, Autocomplete, FormControlLabel } from '@mui/material';
import './BaseCard.css';

const CustomAutoComplete = ({ formik, index, branchOption, workUnitOption }) => {
  const [value, setValue] = useState('');
  const [branch, setBranch] = useState(false);

  const onCheck = () => {
    setBranch(!branch);
    formik.setFieldValue(`actionPlan.${index}.isBranch`, !branch);
  };

  useEffect(() => {
    setBranch(formik.values.actionPlan[index]?.isBranch);
  }, [formik.values.actionPlan[index]?.isBranch]);

  useEffect(() => {
    if (formik.values.actionPlan[index]?.branch?.id > 0) {
      setValue(formik.values.actionPlan[index]?.branch);
    }
    if (formik.values.actionPlan[index]?.workUnit?.id > 0) {
      setValue(formik.values.actionPlan[index]?.workUnit);
    }
  }, [formik.values.actionPlan[index]?.branch, formik.values.actionPlan[index]?.workUnit]);

  return (
    <div
      style={{
        gap: '8px',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <FormControlLabel
        control={<Switch checked={!branch} onChange={onCheck} />}
        label={branch ? 'Kode Cabang' : 'Kode Unit Kerja'}
      />

      <Autocomplete
        disablePortal
        id={branch ? `actionPlan.${index}.branch` : `actionPlan.${index}.workUnit`}
        sx={{ width: '200px' }}
        value={value}
        options={branch ? branchOption : workUnitOption}
        onChange={(event, newValue) => {
          if (newValue === null) {
            formik.setFieldValue(
              branch ? `actionPlan.${index}.branch` : `actionPlan.${index}.workUnit`,
              {
                id: 0,
                label: '',
              },
            );
          } else {
            formik.setFieldValue(
              branch ? `actionPlan.${index}.branch` : `actionPlan.${index}.workUnit`,
              newValue,
            );
            formik.setFieldValue(
              branch ? `actionPlan.${index}.workUnit` : `actionPlan.${index}.branch`,
              {
                id: 0,
                label: '',
              },
            );
          }
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            id={branch ? `actionPlan.${index}.branch` : `actionPlan.${index}.workUnit`}
            error={
              branch
                ? formik.touched?.actionPlan?.[index]?.branch &&
                  Boolean(formik.errors?.actionPlan?.[index]?.branch)
                : formik.touched?.actionPlan?.[index]?.workUnit &&
                  Boolean(formik.errors?.actionPlan?.[index]?.workUnit)
            }
            onBlur={formik.handleBlur}
            variant="standard"
            helperText={
              branch
                ? formik.touched?.actionPlan?.[index]?.branch &&
                  formik.errors?.actionPlan?.[index]?.branch
                : formik.touched?.actionPlan?.[index]?.workUnit &&
                  formik.errors?.actionPlan?.[index]?.workUnit
            }
            placeholder={`pilih kode ${branch ? 'cabang' : 'unit kerja'}`}
          />
        )}
      />
    </div>
  );
};

export default CustomAutoComplete;
