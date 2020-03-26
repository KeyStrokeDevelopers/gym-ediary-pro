/* eslint-disable */
import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
  getMediaData,
  submitMediaData,
  addMediaData,
  closeAction,
  deleteMediaData,
  loadingAction,
  closeNotifAction
} from 'dan-actions/mediaActions';
import styles from 'dan-components/Email/email-jss';
import MediaList from '../../../components/MediaProfile/MediaList';
import StyledNotif from '../../../components/Notification/StyledNotif';
import MediaHeader from '../../../components/MediaProfile/MediaProfileHeader';
import Media from '../../../components/MediaProfile/Media';

class MediaProfile extends React.Component {
  state = {
    mobileOpen: false,
  };

  componentDidMount() {
    const { fetchMediaData } = this.props;
    fetchMediaData();
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };


  submitMediaData = (data, avatar) => {
    const {
      submitData, formValue, updateData, loading, memberData
    } = this.props;
    if (Object.keys(formValue).length >= 1) {
      updateData(data);
    } else {
      const formData = new FormData();
      formData.append('image', avatar);
      formData.set('date', data.get('date'));
      formData.set('description', data.get('description'));
      formData.set('member', memberData._id);
      loading();
      submitData(formData);
    }
    // const avatarBase64 = typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar;
    // const avatarPreview = avatar !== null ? avatarBase64 : dummy.user.avatar;
  }


  render() {
    const {
      classes,
      currentPage,
      open,
      search, keyword,
      avatarInit, toggleStar,
      mediaData,
      deleteMedia,
      memberData,
      add, close,
      messageNotif,
      isFormReset,
      notifType,
      openNoti,
      closeNotif
    } = this.props;
    const title = brand.name + ' - Email';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <div className={classes.root}>
          <MediaHeader search={search} handleDrawerToggle={this.handleDrawerToggle} />
          <MediaList
            filterPage={currentPage}
            mediaData={mediaData}
            memberData={memberData}
            deleteMedia={deleteMedia}
            keyword={keyword}
            toggleStar={toggleStar}
          />
          <Media
            submitData={this.submitMediaData}
            memberData={memberData}
            isFormReset={isFormReset}
            avatarInit={avatarInit}
            open={open}
            add={add}
            closeForm={close}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const mediaReducer = state.get('media');
  return ({
    force: state, // force state from reducer
    avatarInit: mediaReducer.avatarInit,
    mediaData: mediaReducer.mediaList,
    itemSelected: mediaReducer.selectedIndex,
    keyword: mediaReducer.keywordValue,
    open: mediaReducer.openFrm,
    showMobileDetail: mediaReducer.showMobileDetail,
    messageNotif: mediaReducer.notifMsg,
    formValue: mediaReducer.formValues,
    occupationData: mediaReducer.occupation,
    is_active: mediaReducer.isActive,
    isLoading: mediaReducer.isLoading,
    showDetails: mediaReducer.showDetails,
    filter_value: mediaReducer.filterValue,
    messageNotif: mediaReducer.notifMsg,
    notifType: mediaReducer.notifType,
    openNoti: mediaReducer.openNoti,
    isFormReset: mediaReducer.isFormReset,
  });
};

const constDispatchToProps = dispatch => ({
  loading: () => dispatch(loadingAction()),
  add: () => dispatch(addMediaData()),
  close: () => dispatch(closeAction()),
  fetchMediaData: () => dispatch(getMediaData()),
  submitData: (data) => dispatch(submitMediaData(data)),
  deleteMedia: (dataId) => dispatch(deleteMediaData(dataId)),
  closeNotif: () => dispatch(closeNotifAction()),
});

const MediaProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(MediaProfile);

export default withStyles(styles)(MediaProfileMapped);
