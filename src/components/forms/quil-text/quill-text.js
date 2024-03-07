import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill-text.css';

const QuillTextField = (props) => {
  const { id, value, onChange, isError, helperText } = props;
  const [text, setText] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const handleQuillChange = (content) => {
    setIsTouched(true);
    setText(content);
    if (onChange) {
      onChange(content);
    }
  };

  const error = value === '<p><br></p>' || Boolean(isError[`${id}`]);

  useEffect(() => {
    setText(value);
  }, [value]);

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
      {error && isTouched ? <p className="helper-text">{helperText}</p> : null}
    </div>
  );
};

export default QuillTextField;
