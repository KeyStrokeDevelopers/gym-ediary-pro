/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { updateGymInfoData, setFilterValue, getGymInfoData, closeNotifAction } from 'dan-actions/addMemberActions';
import styles from 'dan-components/Contact/contact-jss';
import GymInfoEdit from './GymInfoEdit';
import gymInfoField from './gymInfoField';
import StyledNotif from '../../../components/Notification/StyledNotif';

class GymInfo extends React.Component {
  componentDidMount() {
    const { fetchGymInfoData
    } = this.props;
    fetchGymInfoData();
  }

  updateGymInfoData = (data, avatar) => {
    const { updateData } = this.props;
    const formData = new FormData();
    formData.append('branchLogo', avatar);
    gymInfoField.map((gymInfoData) => {
      if (data.get(gymInfoData.primary || gymInfoData.primary === 'regFee' || gymInfoData.primary === 'autoBirth' || gymInfoData.primary === 'autoAnniv' || gymInfoData.primary === 'autoExpiring' || gymInfoData.primary === 'autoExpired' || gymInfoData.primary === 'isStaffAttendance' || gymInfoData.primary === 'isMemberAttendance' || gymInfoData.primary === 'printLogo')) {
        formData.set(gymInfoData.primary, data.get(gymInfoData.primary));
      }
    });
    updateData(formData);
  }

  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      avatarInit,
      gymInfoData,
      isLoading,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
    } = this.props;
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
        {Object.keys(gymInfoData).length >= 1 &&
          <GymInfoEdit
            gymInfoData={gymInfoData}
            submit={this.updateGymInfoData}
            avatarInit={avatarInit}
            isLoading={isLoading}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const addMemberReducer = state.get('addMember');
  return ({
    // force: state, // force state from reducer
    avatarInit: addMemberReducer.gymBranchLogo,
    gymInfoData: addMemberReducer.gymInfo,
    messageNotif: addMemberReducer.notifMsg,
    notifType: addMemberReducer.notifType,
    openNoti: addMemberReducer.openNoti,
  });
};

const constDispatchToProps = dispatch => ({
  updateData: (data) => dispatch(updateGymInfoData(data)),
  fetchGymInfoData: () => dispatch(getGymInfoData()),
  filterValue: (value) => dispatch(setFilterValue(value)),
  closeNotif: () => dispatch(closeNotifAction())
});


const GymInfoMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(GymInfo);

export default withStyles(styles)(GymInfoMapped);
