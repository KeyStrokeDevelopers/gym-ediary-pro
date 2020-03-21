/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import Work from '@material-ui/icons/Work';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import Tooltip from '@material-ui/core/Tooltip';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import css from 'dan-styles/Form.scss';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from './contact-jss';
import { validate, phoneNumber, email } from '../Forms/helpers/formValidation';
import {
  TextFieldRedux, RegularTextFieldRedux, DatePickerInput, SelectRedux, TimePickerInput
} from '../Forms/ReduxFormMUI';
import { SERVER_URL } from '../Common/constant';

class AddStaffForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  state = {
    tab: 0,
    showPassword: false,
    joiningDate: null,
    dob: null,
    salaryDate: null,
    editImage: false,
    deleteImage: false,
    numberOfShift: 1,
    shiftFrom1: null,
    shiftTo1: null,
    shiftFrom2: null,
    shiftTo2: null,
    shiftFrom3: null,
    shiftTo3: null,
    formValues: {}
  };

  componentDidUpdate = () => {
    const { formValues } = this.props;
    if (formValues !== this.state.formValues) {
      this.setState({ formValues: formValues, dob: formValues.staffDob, salaryDate: formValues.salaryDate, joiningDate: formValues.staffJoiningDate, shiftFrom1: formValues.shiftFrom1, shiftFrom2: formValues.shiftFrom2, shiftFrom3: formValues.shiftFrom3, shiftTo1: formValues.shiftTo1, shiftTo2: formValues.shiftTo2, shiftTo3: formValues.shiftTo3 });
      this.props.initialize(formValues);
    }
  }

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleJoiningDateChange = (e, date) => {
    this.setState({ joiningDate: date });
  }

  handleDateOfBirth = (e, date) => {
    this.setState({ dob: date });
  }

  handleSalaryDate = (e, date) => {
    this.setState({ salaryDate: date });
  }

  handleEditImage = () => {
    this.setState({ editImage: true, deleteImage: false });
  }

  deleteImage = () => {
    const { onDeleteImage } = this.props;
    onDeleteImage();
    this.setState({ deleteImage: true });
  }

  selectedNumberOfShift = (e, numberOfShift) => {
    this.setState({ numberOfShift })
  }

  handleShiftFrom1 = (e, shiftFrom1) => {
    this.setState({ shiftFrom1 });
  }
  handleShiftFrom2 = (e, shiftFrom2) => {
    this.setState({ shiftFrom2 });
  }
  handleShiftFrom3 = (e, shiftFrom3) => {
    this.setState({ shiftFrom3 });
  }

  handleShiftTo1 = (e, shiftTo1) => {
    this.setState({ shiftTo1 });
  }
  handleShiftTo2 = (e, shiftTo2) => {
    this.setState({ shiftTo2 });
  }
  handleShiftTo3 = (e, shiftTo3) => {
    this.setState({ shiftTo3 });
  }

  handleFieldRemove = () => {
    this.setState((preState) => ({ numberOfShift: preState.numberOfShift - 1 }));
  }

  handleAddField = () => {
    this.setState((preState) => ({ numberOfShift: preState.numberOfShift + 1 }));
  }

  handleSubmitData = (data) => {
    const { onSubmit, numberOfShift } = this.props;
    const submitData = data.set('numberOfShift', numberOfShift);
    onSubmit(submitData);
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      handleSubmit,
      accessData,
      formValues,
      itemSelected,
      onDrop,
      staffData,
      imgAvatar
    } = this.props;
    const {
      showPassword, joiningDate, dob, salaryDate, numberOfShift, shiftFrom1, shiftTo1, shiftFrom2, shiftTo2, shiftFrom3, shiftTo3
    } = this.state;
    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 300000;
    const isImageSave = staffData && staffData.length >= 1 ? staffData[itemSelected].staffImage : '';
    let imageUrl;
    if (isImageSave) {
      imageUrl = `${SERVER_URL}${isImageSave}`;
    }
    const imgPreview = img => {
      if (typeof img !== 'string' && img !== '' && img) {
        return URL.createObjectURL(imgAvatar);
      }
      return img;
    };
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleSubmitData)}>
          <section className={css.bodyForm}>
            <div>
              <Typography display="block" variant="button" className={Type.textCenter}>Upload Profile Picture</Typography>
              <Dropzone
                className={classes.hiddenDropzone}
                accept={acceptedFiles.join(',')}
                acceptClassName="stripes"
                onDrop={onDrop}
                maxSize={fileSizeLimit}
                ref={(node) => { dropzoneRef = node; }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
              <div className={classes.avatarWrap}>
                <Avatar
                  alt="ksd"
                  className={classes.uploadAvatar}
                  src={imgPreview(imgAvatar)}
                />
                <Tooltip id="tooltip-upload" title="Upload Photo">
                  <IconButton
                    className={classes.buttonUploadEdit}
                    component="button"
                    onClick={() => {
                      dropzoneRef.open();
                      this.handleEditImage();
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Photo">
                  <IconButton
                    className={classes.buttonUploadDelete}
                    component="button"
                    onClick={() => this.deleteImage()}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div>
              <Field
                name="staffName"
                component={TextFieldRedux}
                placeholder="Staff Name"
                label="Staff Name"
                autoComplete="off"
                required
                ref={this.saveRef}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendar />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="staffEmail"
                component={RegularTextFieldRedux}
                placeholder="Staff Email"
                autoComplete="off"
                label="Staff Email"
                required
                validate={email}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <Field
                name="staffContact"
                component={TextFieldRedux}
                autoComplete="off"
                placeholder="Staff Contact"
                label="Staff Contact"
                required
                validate={phoneNumber}
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Bookmark />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            {(numberOfShift < 3) &&
              <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary" type="button" disabled={submitting} onClick={() => this.handleAddField()}>
                  Add Shift
            </Button>
              </div>
            }
            {(numberOfShift >= 1) &&
              <div style={{ display: 'flex' }}>
                <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                  <Field
                    name={'shiftFrom1'}
                    label="Shift From"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftFrom1}
                    timeValue={shiftFrom1}
                  />
                </div>
                <div className={classes.picker} style={{ width: '50%' }}>
                  <Field
                    name={'shiftTo1'}
                    label="Shift To"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftTo1}
                    timeValue={shiftTo1}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon style={{ color: '#f56049', cursor: 'pointer' }} variant="contained" type="button" onClick={() => this.handleFieldRemove()} />
                </div>
              </div>
            }
            {(numberOfShift >= 2) &&
              <div style={{ display: 'flex' }}>
                <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                  <Field
                    name={'shiftFrom2'}
                    label="Shift From"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftFrom2}
                    timeValue={shiftFrom2}
                  />
                </div>
                <div className={classes.picker} style={{ width: '50%' }}>
                  <Field
                    name={'shiftTo2'}
                    label="Shift To"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftTo2}
                    timeValue={shiftTo2}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon style={{ color: '#f56049', cursor: 'pointer' }} variant="contained" type="button" onClick={() => this.handleFieldRemove()} />
                </div>
              </div>
            }
            {(numberOfShift >= 3) &&
              <div style={{ display: 'flex' }}>
                <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                  <Field
                    name={'shiftFrom3'}
                    label="Shift From"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftFrom3}
                    timeValue={shiftFrom3}
                  />
                </div>
                <div className={classes.picker} style={{ width: '50%' }}>
                  <Field
                    name={'shiftTo3'}
                    label="Shift To"
                    autoComplete="off"
                    component={TimePickerInput}
                    onChange={this.handleShiftTo3}
                    timeValue={shiftTo3}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <DeleteIcon style={{ color: '#f56049', cursor: 'pointer' }} variant="contained" type="button" onClick={() => this.handleFieldRemove()} />
                </div>
              </div>
            }
            <div>
              <Field
                name="staffAddress"
                component={RegularTextFieldRedux}
                placeholder="Address"
                autoComplete="off"
                label="Address"
                required
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div className={classes.picker}>
              <Field
                name="staffDob"
                label="Date Of Birth"
                onChange={this.handleDateOfBirth}
                dateValue={dob}
                disableFuture
                component={DatePickerInput}
              />
            </div>
            <div className={classes.picker}>
              <Field
                name="staffJoiningDate"
                label="Joining date"
                onChange={this.handleJoiningDateChange}
                dateValue={joiningDate}
                component={DatePickerInput}
              />
            </div>
            <div className={classes.picker}>
              <Field
                name="salaryDate"
                label="Next Salary Date"
                onChange={this.handleSalaryDate}
                dateValue={salaryDate}
                component={DatePickerInput}
              />
            </div>
            <div>
              <Field
                name="staffCode"
                component={RegularTextFieldRedux}
                placeholder="Staff Code"
                autoComplete="off"
                label="Staff Code"
                required
                className={classes.field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Work />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <FormControl className={classes.field}>
                <InputLabel htmlFor="selection">Select Staff Level</InputLabel>
                <Field
                  name="accessLevel"
                  component={SelectRedux}
                  placeholder="Select Staff Level"
                >
                  <MenuItem value="">None</MenuItem>
                  {
                    accessData.map((data, index) => <MenuItem key={index + Math.random()} value={data._id}>{data.accessLevel}</MenuItem>)
                  }
                </Field>
              </FormControl>
            </div>
            <div>
              {((Object.keys(formValues).length >= 1)) ? ''
                : (
                  <FormControl className={classes.formControl} style={{ width: '100%' }}>
                    <Field
                      name="staffPassword"
                      component={RegularTextFieldRedux}
                      autoComplete="off"
                      autoComplete="off"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      required
                      className={classes.field}
                    />
                  </FormControl>
                )
              }
            </div>

          </section>
          <div className={css.buttonArea}>
            <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              {' '}
              Reset
            </Button>
          </div>
        </form>
      </div >
    );
  }
}


const AddStaffFormRedux = reduxForm({
  form: 'addStaffForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddStaffForm);

const AddStaffInit = connect(null, null)(AddStaffFormRedux);


export default withStyles(styles)(AddStaffInit);
