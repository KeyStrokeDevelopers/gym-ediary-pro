/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
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
  TextFieldRedux, RegularTextFieldRedux, DatePickerInput, SelectRedux
} from '../Forms/ReduxFormMUI';


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
  };

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
      showPassword, joiningDate, dob, salaryDate, deleteImage, editImage
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
      if (deleteImage && !imageUrl) {
        return null;
      }
      if (deleteImage && imageUrl) {
        return imageUrl;
      }
      if (imageUrl && !editImage) {
        return imageUrl;
      }
      if (typeof img !== 'string' && img !== '') {
        return URL.createObjectURL(imgAvatar);
      }
      return img;
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
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
                label="Salary Date"
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
      </div>
    );
  }
}


const AddStaffFormRedux = reduxForm({
  form: 'addStaffForm',
  validate,
  enableReinitialize: true
})(AddStaffForm);

const AddStaffInit = connect(
  state => ({
    initialValues: state.get('staff').formValues
  })
)(AddStaffFormRedux);


export default withStyles(styles)(AddStaffInit);
