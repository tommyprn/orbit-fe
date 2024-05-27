import { Typography, Slider } from '@mui/material';

const SliderInput = ({ id, title, formik, ...props }) => {
  const valuetext = (value) => {
    return `${value}°C`;
  };

  return (
    <div
      style={{
        gap: '8px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingRight: '24px',
        flexDirection: 'column',
      }}
    >
      <Typography variant="body1">{title}</Typography>

      <Slider
        marks
        min={1}
        max={5}
        step={1}
        defaultValue={1}
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        {...props}
      />
    </div>
  );
};

export default SliderInput;
