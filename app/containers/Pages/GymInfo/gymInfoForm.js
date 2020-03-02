/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import Work from '@material-ui/icons/Work';
import css from 'dan-styles/Form.scss';
import styles from '../../../components/Common/style';
import { SERVER_URL } from '../../../components/Common/constant';
import { validate, phoneNumber, email, number } from '../../../components/Forms/helpers/formValidation';
import { allIndianState } from '../../../components/Common/constant';
import {
  TextFieldRedux, RegularTextFieldRedux, renderToggle, SearchableSelect
} from '../../../components/Forms/ReduxFormMUI';
let fillValueEnquiry;
class GymInfoForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  state = {
    fillValueFromEnquiry: '',
    editImage: false,
    deleteImage: false,
  };


  componentDidMount() {
    const { gymInfoData } = this.props;
    this.props.initialize(gymInfoData);
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
      addMemberData,
      itemSelected,
      handleSubmit,
      onDrop,
      formValue,
      gymInfoData,
      imgAvatar
    } = this.props;
    const { fillValueFromEnquiry, editImage, deleteImage } = this.state;

    fillValueEnquiry = Object.assign({}, fillValueFromEnquiry);
    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 300000;
    const isImageSave = addMemberData && addMemberData.length >= 1 ? addMemberData[itemSelected].profileImage : '';
    let imageUrl;
    if (isImageSave) {
      imageUrl = `${SERVER_URL}${isImageSave}`;
    }
    const imgPreview = (img) => {
      if (deleteImage) {
        return null;
      }
      if (imageUrl && formValue && (Object.keys(formValue).length >= 1)) {
        return imageUrl;
      }
      if (typeof img !== 'string' && img !== '' && imgAvatar) {
        return URL.createObjectURL(imgAvatar);
      }
      return img;
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <section className={classes.formBody}>
            <div>
              <Typography display="block" variant="button" className={Type.textCenter}>Upload Logo</Typography>
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
                  alt=""
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
            <div className={classes.row}>
              <div className={classes.col_1}>
                <Field
                  name="branchName"
                  placeholder="Firm Name e.g. KSD"
                  label="Firm Name"
                  component={RegularTextFieldRedux}
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
              <div className={classes.col_2}>
                <Field
                  name="branchContact"
                  placeholder="Firm Contact Number"
                  label="Firm Contact Number"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  validate={phoneNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.col_1}>
                <Field
                  name="branchDetails"
                  placeholder="Firm Details e.g. My Shop"
                  label="Firm Details e.g. My Shop"
                  component={RegularTextFieldRedux}
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
              <div className={classes.col_2}>
                <Field
                  name="branchAltContact"
                  component={RegularTextFieldRedux}
                  placeholder="Firm Alternate Contact"
                  label="Firm Alternate Contact"
                  autoComplete="off"
                  validate={phoneNumber}
                  className={classes.field}
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
            </div>
            <div className={classes.row}>
              <div className={classes.col_1}>
                <Field
                  name="branchAddress"
                  component={RegularTextFieldRedux}
                  placeholder="Postal Address"
                  label="Address"
                  autoComplete="off"
                  required
                  multiline
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
              <div className={classes.col_2}>
                <Field
                  name="branchEmail"
                  component={RegularTextFieldRedux}
                  placeholder="Email"
                  autoComplete="off"
                  label="Email"
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
            </div>
            <div className={classes.row}>
              <div className={classes.col_1}>
                <div>
                  <Field
                    name="branchState"
                    component={SearchableSelect}
                    placeholder="State"
                    autoComplete="off"
                    label="State"
                    options={allIndianState}
                    labelKey="value"
                    valueKey="value"
                    required
                    className={classes.field}
                  />
                </div>
              </div>
              <div className={classes.col_2}>
                <Field
                  name="preFix"
                  placeholder="Form Prefix e.g. ksd"
                  label="Form Prefix"
                  component={RegularTextFieldRedux}
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
            </div>
            <div className={classes.row}>
              <div className={classes.col_1}>
                <Field
                  name="regFee"
                  placeholder="Registration Fee"
                  label="Registration Fee"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  validate={number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className={classes.col_2}>
                <Field
                  name="gstNumber"
                  placeholder="GST Number"
                  label="GST Number"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  validate={number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            {!gymInfoData.isCounterOn &&
              <div>
                <Field
                  name="seriesStartFrom"
                  placeholder="Series Start From"
                  label="Series Start From"
                  component={RegularTextFieldRedux}
                  className={classes.field}
                  validate={number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendar />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            }
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="autoBirth"
                  component={renderToggle}
                  label='Automatic Birthday Wishes'
                />
              </div>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="autoAnniv"
                  component={renderToggle}
                  label='Automatic Anniversary Wishes'
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="autoExpiring"
                  component={renderToggle}
                  label='Automatic Expiring Reminder For 2 Days'
                />
              </div>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="autoExpired"
                  component={renderToggle}
                  label='Automatic Expired Reminder For 2 Days'
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="isStaffAttendance"
                  component={renderToggle}
                  label='Staff Attendance'
                />
              </div>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="isMemberAttendance"
                  component={renderToggle}
                  label='Member Attendance'
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="printLogo"
                  component={renderToggle}
                  label='Print Logo'
                />
              </div>
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

const GymInfoFormRedux = reduxForm({
  form: 'gymInfoForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(GymInfoForm);

const mapStateToProps = (state) => ({
  formValue: state.get('addMember').formValues,
  initialValues: fillValueEnquiry && (Object.keys(fillValueEnquiry).length >= 1) ? fillValueEnquiry : state.get('addMember').formValues
});

const GymInfoInit = connect(
  mapStateToProps
)(GymInfoFormRedux);


export default withStyles(styles)(GymInfoInit);
