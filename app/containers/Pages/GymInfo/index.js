/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { updateGymInfoData, setFilterValue, getGymInfoData } from 'dan-actions/addMemberActions';
import styles from 'dan-components/Contact/contact-jss';
import GymInfoEdit from './GymInfoEdit';
import gymInfoField from './gymInfoField';

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
      if (data.get(gymInfoData.primary)) {
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
      isLoading
    } = this.props;
    console.log('gym info data ---in main index ---', gymInfoData)
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
    avatarInit: addMemberReducer.avatarInit,
    gymInfoData: addMemberReducer.gymInfo,
  });
};

const constDispatchToProps = dispatch => ({
  updateData: (data) => dispatch(updateGymInfoData(data)),
  fetchGymInfoData: () => dispatch(getGymInfoData()),
  filterValue: (value) => dispatch(setFilterValue(value))
});

const GymInfoMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(GymInfo);

export default withStyles(styles)(GymInfoMapped);
