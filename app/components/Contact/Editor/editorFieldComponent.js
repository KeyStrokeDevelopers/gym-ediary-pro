/* eslint-disable */
import React from 'react';

import ControlledEditor from './controlledEditor';

const EditorFieldComponent = props => {
  const {
    placeholder, initValue, input: { onChange, value }, disabled, id
  } = props;
  return (
    <ControlledEditor
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      initValue={initValue}
      onChange={onChange}
      value={value}
      initValue={initValue}
    />
  );
};

export default EditorFieldComponent;
