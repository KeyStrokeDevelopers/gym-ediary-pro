import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
/* Textfield */
export const RegularTextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => {
  const [val, setVal] = useState('');
  return (
    <>
      <TextField
        {...rest}
        {...input}
        value={val || input.value}
        error={touched && Boolean(error)}
      />
      {
        touched &&
        <div style={{ textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px' }}>{error}</div>
      }
    </>
  );
};

export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => {
  const [val, setVal] = useState('');
  let enterValue = val || input.value;
  enterValue = enterValue.toUpperCase();
  return (
    <>
      <TextField
        {...rest}
        {...input}
        value={enterValue}
        error={touched && Boolean(error)}
      />
      {
        touched &&
        <div style={{ textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px' }}>{error}</div>
      }
    </>
  );
};


TextFieldRedux.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

TextFieldRedux.defaultProps = {
  meta: null,
};
/* End */

/* Select */
export const SelectRedux = ({ input, children, ...rest }) => (
  <Select
    {...input}
    {...rest}
  >
    {children}
  </Select>
);

SelectRedux.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
/* End */

/* Checkbox */
export const CheckboxRedux = ({ input, ...rest }) => (
  <Checkbox
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

CheckboxRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */

/* Switch */
export const SwitchRedux = ({ input, ...rest }) => (
  <Switch
    checked={input.value === '' ? false : input.value}
    {...input}
    {...rest}
  />
);

export const DatePickerInput = ({ change, input, label, meta: { touched, error }, ...reset }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    change(date.toDate());
    setSelectedDate(date);
  }

  return (<MuiPickersUtilsProvider utils={MomentUtils}>
    <DatePicker
      label={label}
      format="DD/MM/YYYY"
      {...input}
      {...reset}
      disableFuture
      onChange={handleDateChange}
      value={selectedDate}
      autoOk={true}
      style={{ width: '100%' }}
      animateYearScrolling={false}
    />
  </MuiPickersUtilsProvider>
  );
}

export const renderToggleInput = (field) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons={true} />
      </div>
      <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
        Swipe Machine
      </div>
    </div>
  )
};


SwitchRedux.propTypes = {
  input: PropTypes.object.isRequired,
};
/* End */
