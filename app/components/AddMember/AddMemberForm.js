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
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import HighlightSuggest from '../Common/helpers/autoComplete';
import NumberSuggest from '../Common/helpers/autoCompleteNumber';
import NameSuggest from '../Common/helpers/autoCompleteName';
import { getAge } from '../Common/helpers';
import styles from '../Common/style';
import { SERVER_URL } from '../Common/constant';
import { validate, phoneNumber, email } from '../Forms/helpers/formValidation';
import { ContentDivider } from '../Divider';
import { TextFieldRedux, RegularTextFieldRedux, DatePickerInput, SelectRedux, renderToggleFingerRequired } from '../Forms/ReduxFormMUI';
let fillValueEnquiry;
class AddMemberForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  state = {
    tab: 0,
    age: '0',
    selectedPackPrice: 0,
    packDisc: 0,
    paidAmount: 0,
    regFee: 0,
    fillValueFromEnquiry: '',
    editImage: false,
    deleteImage: false,
    dob: null,
    anniversary: null,
    packageActivationDate: null,
    isBiometic: true,
    gstPer: 0
  };

  handleDateOfBirth = (e, date) => {
    const age = getAge(date);
    this.setState({ dob: date, age });
  }

  handleAnniversary = (e, date) => {
    this.setState({ anniversary: date });
  }

  handlePackageActivationDate = (e, date) => {
    this.setState({ packageActivationDate: date });
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  componentDidMount() {
    const { gymInfoData } = this.props;
    if (Object.keys(gymInfoData).length >= 1) {
      const isBiometic = gymInfoData.biometric;
      const { regFee } = gymInfoData;
      this.props.initialize({ isFingerRequired: isBiometic, regFee });
      this.setState({ isBiometic, regFee });
    }
  }

  handleEnquiryData = (data) => {
    this.setState(prevState => {
      let fillValueFromEnquiry = Object.assign({}, prevState.fillValueFromEnquiry);
      fillValueFromEnquiry = data;
      return { fillValueFromEnquiry };
    });
  }

  handlePackageSelected = (e, packId) => {
    const { packageData } = this.props;
    const selectedPackage = packageData.filter((selectedPackage) => selectedPackage._id === packId);
    if (selectedPackage) {
      this.setState({ selectedPackPrice: selectedPackage[0].packPrice });
    }
  }

  handlePackageDiscount = (e, packDisc) => {
    this.setState({ packDisc: parseInt(packDisc) });
  }

  handlePaidAmount = (e, paidAmount) => {
    this.setState({ paidAmount: parseInt(paidAmount) });
  }

  handleRegistrationFees = (e, regFee) => {
    this.setState({ regFee: parseInt(regFee) });
  }

  handleEditImage = () => {
    this.setState({ editImage: true, deleteImage: false });
  }

  deleteImage = () => {
    const { onDeleteImage } = this.props;
    onDeleteImage();
    this.setState({ deleteImage: true });
  }

  selectedGstPer = (e, gstPer) => {
    this.setState({ gstPer })
  }

  handleSubmitData = (data) => {
    const { selectedPackPrice, regFee, packDisc, gstPer } = this.state;
    const payable = selectedPackPrice + regFee - packDisc;
    const gstValue = Math.round(payable * gstPer / 100)
    const { onSubmit, reset } = this.props;
    let submitData = data.set('packPrice', selectedPackPrice);
    submitData = submitData.set('gstValue', gstValue);
    submitData = submitData.set('gstPer', gstPer);
    onSubmit(submitData);
    reset();
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      purposeData,
      packageData,
      addMemberData,
      paymentMethodData,
      itemSelected,
      occupationData,
      enquiryData,
      handleSubmit,
      onDrop,
      formValue,
      edit,
      imgAvatar
    } = this.props;
    const {
      age, selectedPackPrice, fillValueFromEnquiry, packDisc, paidAmount, editImage, deleteImage, dob, anniversary, packageActivationDate, isBiometic, regFee, gstPer
    } = this.state;
    const payable = selectedPackPrice + regFee - packDisc;
    const totalPayable = payable + Math.round(payable * gstPer / 100);
    const balAmount = totalPayable - paidAmount;
    fillValueEnquiry = Object.assign({}, fillValueFromEnquiry);
    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 300000;
    const isImageSave = addMemberData && addMemberData.length >= 1 ? addMemberData[itemSelected].profileImage : '';
    let imageUrl;
    if (isImageSave) {
      imageUrl = `${SERVER_URL}${isImageSave}`;
    }
    const fingerCodeWidth = isBiometic ? '50%' : '100%';
    const imgPreview = (img) => {
      if (deleteImage) {
        return null;
      }
      if (imageUrl && formValue && (Object.keys(formValue).length >= 1)) {
        return imageUrl;
      }
      if (typeof img !== 'string' && img !== '') {
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
            <div>
              <Field
                name="name"
                placeholder="Member Name"
                label="Member Name"
                component={NameSuggest}
                enquiryData={enquiryData}
                fillData={(data) => this.handleEnquiryData(data)}
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
                name="contact"
                placeholder="Contact Number"
                label="Contact Number"
                component={NumberSuggest}
                enquiryData={enquiryData}
                validate={phoneNumber}
                fillData={(data) => this.handleEnquiryData(data)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendar />
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '30%', marginRight: '10px' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Favour Of</InputLabel>
                  <Field
                    name="fTitle"
                    component={SelectRedux}
                    required
                    placeholder="Title"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="s/o">S/O</MenuItem>
                    <MenuItem value="d/o">D/O</MenuItem>
                    <MenuItem value="w/o">W/O</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div style={{ width: '70%' }}>
                <Field
                  name="favourOf"
                  component={TextFieldRedux}
                  autoComplete="off"
                  placeholder="Favour Of & Name"
                  label="Favour Of & Name"
                  required
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

            <div>
              <Field
                name="address"
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
            {!edit && (
              <div>
                <div>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Purpose</InputLabel>
                    <Field
                      name="purpose"
                      component={SelectRedux}
                      required
                      placeholder="Select Purpose"
                    >
                      {
                        (purposeData && purposeData.length >= 1) &&
                        purposeData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{item.purposeName}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                </div>
                <div>
                  <Field
                    name="regFee"
                    component={RegularTextFieldRedux}
                    placeholder="Registration Fess"
                    autoComplete="off"
                    label="Registration Fees"
                    onChange={this.handleRegistrationFees}
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
                    <InputLabel htmlFor="selection">GST %</InputLabel>
                    <Field
                      name="gst"
                      component={SelectRedux}
                      required
                      placeholder="GST %"
                      onChange={this.selectedGstPer}
                    >
                      <MenuItem value={0}>0.00</MenuItem>
                      <MenuItem value={5}>5.00</MenuItem>
                      <MenuItem value={12}>12.00</MenuItem>
                      <MenuItem value={18}>18.00</MenuItem>
                      <MenuItem value={28}>28.00</MenuItem>
                    </Field>
                  </FormControl>
                </div>
                <div>
                  <FormControl className={classes.field}>
                    <InputLabel htmlFor="selection">Select Package</InputLabel>
                    <Field
                      name="packageInfo"
                      component={SelectRedux}
                      required
                      placeholder="Select Package"
                    >
                      {
                        (packageData && packageData.length >= 1) &&
                        packageData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{`${item.packName}/${item.packDuration}${item.durationIn}/${item.packPrice}`}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                </div>
                <div style={{ display: 'flex' }}>
                  <div className={classes.picker} style={{ marginRight: '10px', width: '50%' }}>
                    <Field
                      name="packActivation"
                      label="Package Activation"
                      disablePast
                      component={DatePickerInput}
                      onChange={this.handlePackageActivationDate}
                      dateValue={packageActivationDate}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    <Field
                      name="packDisc"
                      component={RegularTextFieldRedux}
                      placeholder="Discount"
                      label="Package Discount"
                      autoComplete="off"
                      onChange={this.handlePackageDiscount}
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
                </div>
                <div>
                  <Field
                    name="payable"
                    component={RegularTextFieldRedux}
                    placeholder={`${totalPayable}`}
                    value={totalPayable}
                    label="Payable"
                    disabled
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
                  <Field
                    name="paidAmount"
                    component={RegularTextFieldRedux}
                    placeholder="Paid Amount"
                    label={(balAmount !== 0)
                      ? (
                        <div>
                          <span style={{ color: '#000000' }}>Paid Amount / </span>
                          <span style={{ color: '#1565C0' }}>
                            {' '}
                            {`Balance ${balAmount}`}
                            {' '}
                          </span>
                        </div>
                      ) : 'Paid Amount'}
                    autoComplete="off"
                    onChange={this.handlePaidAmount}
                    className={classes.field}
                    required
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
                    <InputLabel htmlFor="selection">Select Payment Mode</InputLabel>
                    <Field
                      name="paymentMode"
                      component={SelectRedux}
                      required
                      placeholder="Select Payment Mode"
                    >
                      {
                        (paymentMethodData && paymentMethodData.length >= 1) &&
                        paymentMethodData.map((item, index) => <MenuItem value={item._id} key={index + Math.random()}>{item.paymentMethod}</MenuItem>)
                      }
                    </Field>
                  </FormControl>
                </div>
              </div>
            )
            }
            <div style={{ display: 'flex' }}>
              {isBiometic
                && (
                  <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                    <Field
                      name="isFingerRequired"
                      component={renderToggleFingerRequired}
                    />
                  </div>
                )
              }
              <div style={{ width: fingerCodeWidth }}>
                <Field
                  name="fingerCode"
                  component={RegularTextFieldRedux}
                  placeholder="Fingerprint Code"
                  label="Fingerprint Code"
                  autoComplete="off"
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
            </div>
            <div>
              <Field
                name="referredBy"
                component={RegularTextFieldRedux}
                placeholder="Referred By Optional"
                label="Referred By Optional"
                autoComplete="off"
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
            <ContentDivider content="Additional Information" />
            <div>
              <Field
                name="alternativeContact"
                component={TextFieldRedux}
                placeholder="Alternative Contact Number"
                label="Alternative Contact Number"
                autoComplete="off"
                validate={phoneNumber}
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
                name="memberEmail"
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
            <div>
              <Field
                name="occupation"
                placeholder="Occupation e.g. Teacher, Doctor"
                label="Occupation e.g. Teacher, Doctor"
                component={HighlightSuggest}
                occupationData={occupationData}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div className={classes.picker} style={{ width: '50%', marginRight: '10px' }}>
                <Field
                  name="dob"
                  label={(age !== '0')
                    ? (
                      <div>
                        <span style={{ color: '#000000' }}>Date of Birth : </span>
                        <span style={{ color: '#1565C0' }}>
                          {' '}
                          {`${age}`}
                          {' '}
                        </span>
                      </div>
                    ) : 'Date Of Birth'}
                  disableFuture
                  component={DatePickerInput}
                  onChange={this.handleDateOfBirth}
                  dateValue={dob}
                />
              </div>
              <div style={{ width: '50%' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">Blood Group</InputLabel>
                  <Field
                    name="bloodGroup"
                    component={SelectRedux}
                    required
                    placeholder="Blood Group"
                  >
                    <MenuItem value="">Not Known</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Field>
                </FormControl>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '50%', marginRight: '10px' }}>
                <FormControl className={classes.field}>
                  <InputLabel htmlFor="selection">MARITAL STATUS</InputLabel>
                  <Field
                    name="maritalStatus"
                    component={SelectRedux}
                    required
                    placeholder="MARITAL STATUS"
                  >
                    <MenuItem value="">Not Known</MenuItem>
                    <MenuItem value="sin">SINGLE</MenuItem>
                    <MenuItem value="mar">MARRIED</MenuItem>
                    <MenuItem value="wid">WIDOWED</MenuItem>
                    <MenuItem value="div">DIVORCED</MenuItem>
                    <MenuItem value="sep">SEPARATED</MenuItem>
                  </Field>
                </FormControl>
              </div>
              <div className={classes.picker} style={{ width: '50%' }}>
                <Field
                  name="anniversary"
                  label="ANNIVERSARY"
                  disableFuture
                  component={DatePickerInput}
                  onChange={this.handleAnniversary}
                  dateValue={anniversary}
                />
              </div>
            </div>
            <div>
              <Field
                name="query"
                component={RegularTextFieldRedux}
                placeholder="Query - If Any"
                autoComplete="off"
                label="Query - If Any"
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
          </section>
        </form>
      </div>
    );
  }
}

const AddMemberFormRedux = reduxForm({
  form: 'addMemberForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AddMemberForm);

const mapStateToProps = (state) => ({
  formValue: state.get('addMember').formValues,
  initialValues: fillValueEnquiry && (Object.keys(fillValueEnquiry).length >= 1) ? fillValueEnquiry : state.get('addMember').formValues
});

const AddMemberInit = connect(
  mapStateToProps
)(AddMemberFormRedux);


export default withStyles(styles)(AddMemberInit);
