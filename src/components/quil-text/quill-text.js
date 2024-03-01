import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-text.css';

const QuillTextField = (props) => {
  const { id, value, onChange, formik, helperText } = props;
  const [text, setText] = useState(value);

  const handleQuillChange = (content) => {
    setText(content);
    if (onChange) {
      onChange(content);
    }
  };

  const error = formik.values[`${id}`] === '<p><br></p>' || Boolean(formik.errors[`${id}`]);

  return (
    <div className="quill-text-container">
      <div style={{ height: '145px' }}>
        <TextField id={id} sx={{ display: 'none' }} value={text} />

        <ReactQuill
          theme="snow"
          value={text}
          onChange={handleQuillChange}
          style={{ width: '100%', height: '100px' }}
        />
      </div>
      {error ? <p className="helper-text">{helperText}</p> : null}
    </div>
  );
};

export default QuillTextField;
