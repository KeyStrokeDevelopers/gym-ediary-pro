/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Switch from '@material-ui/core/Switch';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
/* Textfield */
export const RegularTextFieldRedux = ({ input, meta: { touched, error }, ...reset }) => (
  <>
    <TextField
      {...reset}
      onChange={(value) => input.onChange(value)}
      onBlur={(value) => input.onBlur(value)}
      value={input.value}
      error={touched && Boolean(error)}
    />
    {
      touched
      && (
        <div style={{
          textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
        }}
        >
          {error}
        </div>
      )
    }
  </>
);


export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => {
  const [val, setVal] = useState('');
  let enterValue = val || input.value;
  enterValue = isNaN(enterValue) ? enterValue.toUpperCase() : enterValue;
  return (
    <>
      <TextField
        {...rest}
        // {...input}
        onChange={(value) => input.onChange(value)}
        onBlur={(value) => input.onBlur(value)}
        value={enterValue}
        error={touched && Boolean(error)}
      />
      {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
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

export const DatePickerInput = ({
  change, dateValue, input, label, meta: { touched, error }, ...reset
}) => (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          label={label}
          format="DD/MM/YYYY"
          {...reset}
          value={dateValue}
          onChange={(value) => { input.onChange(value.format('YYYY-MM-DD')); }}
          //  onBlur={(value) => input.onBlur(value)}
          autoOk
          style={{ width: '100%' }}
          animateYearScrolling={false}
          error={touched && Boolean(error)}
        />
      </MuiPickersUtilsProvider>
      {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
      }
    </>
  );

export const TimePickerInput = ({
  change, input, timeValue, label, meta: { touched, error }, ...reset
}) => {
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <TimePicker
          label={label}
          {...input}
          {...reset}
          value={timeValue}
          style={{ width: '100%' }}
          error={touched && Boolean(error)}
        />
      </MuiPickersUtilsProvider>
      {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
      }
    </>
  );
}

export const renderToggleInput = (field) => (
  <div style={{ marginTop: '15px' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
    </div>
    <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
      Swipe Machine
    </div>
  </div>
);

export const renderToggleFingerRequired = (field) => (
  <div style={{ marginTop: '15px' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
    </div>
    <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
      is finger code Required ?
    </div>
  </div>
);

export const renderToggleBirthDayWishes = (field) => (
  <div style={{ marginTop: '15px' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
    </div>
    <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
      BirthDay Wishes ?
    </div>
  </div>
);

export const renderToggleAnniversaryWishes = (field) => (
  <div style={{ marginTop: '15px' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
    </div>
    <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
      Anniversary Wishes ?
    </div>
  </div>
);

export const renderToggle = (field) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
      </div>
      <div style={{ textAlign: 'center', color: 'gray', width: '100%' }}>
        {field.label}
      </div>
    </div>
  );
}

export const renderFollowUpInput = (field) => <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />;

export const renderDaysToggleInput = (field) => (
  <div style={{
    marginTop: '15px', display: 'flex', justifyContent: 'center', flexDirection: 'column'
  }}
  >
    <div style={{ textAlign: 'center' }}>
      <Toggle checked={Boolean(field.input.value)} onChange={field.input.onChange} icons />
    </div>
    <div style={{ textAlign: 'center', color: 'gray' }}>
      {field.label}
    </div>
  </div>
);


/* Select */
export const SelectRedux = ({
  meta: { touched, error }, input, children, ...rest
}) => (
    <>
      <Select
        {...input}
        {...rest}
        error={touched && Boolean(error)}
      >
        {children}
      </Select>
      {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
      }
    </>
  );

SelectRedux.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
/* End */


/**
 * Autocomplete select box
 */

const filterOptions = (labelKey) => createFilterOptions({
  matchFrom: 'start',
  stringify: option => option[labelKey],
});

export const SearchableSelect = ({
  meta: { touched, error }, options, label, labelKey, valueKey, placeholder, input, children
}) => (
    <>
      <Autocomplete
        options={options}
        getOptionLabel={option => option[labelKey]}
        size="small"
        filterOptions={filterOptions(labelKey)}
        onChange={(e, value) => {
          if (value) {
            return input.onChange(value[valueKey]);
          }
        }}
        onBlur={(e, value) => {
          if (value) {
            return input.onChange(value[valueKey]);
          }
        }}
        renderInput={params => (
          <TextField {...params} label={label} placeholder={placeholder} fullWidth error={touched && Boolean(error)} />
        )}
      />
      {/* {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
      } */}
    </>
  );
/* End */

