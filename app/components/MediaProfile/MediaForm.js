/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import css from 'dan-styles/Form.scss';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import InputAdornment from '@material-ui/core/InputAdornment';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import Work from '@material-ui/icons/Work';
import IconButton from '@material-ui/core/IconButton';
import Type from 'dan-styles/Typography.scss';
import { validate } from '../Forms/helpers/formValidation';
import { RegularTextFieldRedux, DatePickerInput } from '../Forms/ReduxFormMUI';
import styles from '../Common/style';


class MediaForm extends React.Component {
  saveRef = ref => {
    this.ref = ref;
    return this.ref;
  };

  state = {
    mediaDate: null,
    editImage: false,
    deleteImage: false,
    date: null
  };

  selectedValue = (e, value) => {
    let duration;
    if (value === 'days') {
      duration = 'Days';
    } else if (value === 'months') {
      duration = 'Months';
    }
    this.setState({ durationIn: duration });
  }

  handleDate = (e, date) => {
    this.setState({ date });
  }

  componentDidMount = () => {
    const { memberData } = this.props;
    this.props.initialize({ member: memberData._id });
  }

  handleMediaSelected = (e, packId) => {
    const { availableMediaData } = this.props;
    const selectedMedia = availableMediaData.filter((selectedMedia) => selectedMedia._id === packId);
    if (selectedMedia) {
      this.setState({ selectedPackPrice: selectedMedia[0].packPrice });
    }
  }

  handleEditImage = () => {
    this.setState({ editImage: true, deleteImage: false });
  }

  deleteImage = () => {
    const { onDeleteImage } = this.props;
    onDeleteImage();
    this.setState({ deleteImage: true });
  }

  getFormField = (data, index) => {
    const { classes } = this.props;
    const { name, placeLabel } = data;
    const margin_right = index % 2 === 0 ? '4%' : '';
    return (
      <div className={classes.half} style={{ marginRight: margin_right }} key={index + Math.random()}>
        <Field
          name={name}
          component={RegularTextFieldRedux}
          placeholder={placeLabel}
          label={placeLabel}
          autoComplete="off"
          className={classes.field}
        />
      </div>
    );
  }

  render() {
    const {
      classes,
      reset,
      pristine,
      submitting,
      mediaData,
      onDrop,
      imgAvatar,
      handleSubmit
    } = this.props;
    const {
      mediaDate, editImage, deleteImage, date
    } = this.state;
    let dropzoneRef;
    const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    const fileSizeLimit = 300000;
    const isImageSave = mediaData && mediaData.length >= 1 ? mediaData[itemSelected].profileImage : '';
    let imageUrl;
    if (isImageSave) {
      imageUrl = `${SERVER_URL}${isImageSave}`;
    }

    const imgPreview = (img) => {
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
              <Typography display="block" variant="button" className={Type.textCenter}>Upload Media Picture</Typography>
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
            <div className={classes.picker}>
              <Field
                name="date"
                label="Date"
                component={DatePickerInput}
                onChange={this.handleDate}
                dateValue={date}
              />
            </div>
            <div>
              <Field
                name="description"
                component={RegularTextFieldRedux}
                placeholder="Description Optional"
                autoComplete="off"
                label="Description Optional"
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

const MediaFormRedux = reduxForm({
  form: 'MediaForm',
  validate,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(MediaForm);

const Media = connect(
  state => ({
    initialValues: state.get('media').formValues
  })
)(MediaFormRedux);


export default withStyles(styles)(Media);
