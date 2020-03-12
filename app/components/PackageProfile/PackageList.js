/* eslint-disable */
import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Tooltip from '@material-ui/core/Tooltip';
import Bookmark from '@material-ui/icons/Bookmark';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportIcon from '@material-ui/icons/Report';
import Divider from '@material-ui/core/Divider';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import styles from './email-jss';

class PackageList extends React.Component {
  state = {
    anchorElOpt: null
  };

  render() {
    const {
      classes,
      subscribedPackageData,
      toggleStar,
    } = this.props;
    const { anchorElOpt } = this.state;
    const getPackage = dataArray => dataArray.map((data, index) => (
      <ExpansionPanel className={classes.emailList} key={index + Math.random()} >
        <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.fromHeading}>
            <Tooltip id="tooltip-mark" title="Stared">
              <IconButton onClick={() => toggleStar(data)} className={classes.starBtn}>{data.packageInfo.packName ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
            </Tooltip>
            <Avatar alt="avatar" className={classes.avatar}><ReportIcon /></Avatar>
            <Typography className={classes.heading} display="block">
              <Typography variant="caption" display="block">{data.packageInfo.packName}</Typography>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading} noWrap>Package Information</Typography>
          </div>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.details}>
          <section>
            <div className={classes.topAction}>
              <Typography className={classes.headMail}>
                <Fragment>
                  {data.packageInfo.packName}
                  {' '}
                  PACKAGE
                </Fragment>
              </Typography>
              <div className={classes.opt}>
                <Tooltip id="tooltip-mark" title="Stared">
                  <IconButton><Star className={classes.iconOrange} /></IconButton>
                </Tooltip>
                <Tooltip id="tooltip-mark" title="Mark message to">
                  <IconButton
                    className={classes.button}
                    aria-label="mark"
                    aria-owns={anchorElOpt ? 'long-menu' : null}
                    aria-haspopup="true"
                  >
                    <Bookmark />
                  </IconButton>
                </Tooltip>
                <Tooltip id="tooltip-mark" title="Remove mail">
                  <IconButton className={classes.button} aria-label="Delete"><Delete /></IconButton>
                </Tooltip>
              </div>
            </div>
            <div className={classes.emailContent}>
              <Typography variant="h6" gutterBottom>
                <div>
                  <div>{`Package Name : ${data.packageInfo.packName}`}</div>
                  <Divider />
                  <div>{`Package Price : ${data.packageInfo.packPrice}`}</div>
                  <Divider />
                  <div>{`Package Duration : ${data.packageInfo.packDuration}`}</div>
                  <Divider />
                  <div>{`Package Details : ${data.packageInfo.packDetails}`}</div>
                </div>
              </Typography>
              {/* <article dangerouslySetInnerHTML={renderHTML} /> */}
            </div>
          </section>
        </ExpansionPanelDetails>

        {/* <Divider />
          <ExpansionPanelActions>
            <div className={classes.action}>
              <Button size="small">Forwad</Button>
              <Button size="small" color="secondary" onClick={() => reply(mail)}>Reply</Button>
            </div>
          </ExpansionPanelActions> */}
      </ExpansionPanel>
    ));

    return (
      <main className={classes.content}>
        {subscribedPackageData && subscribedPackageData.length >= 1 && getPackage(subscribedPackageData)}
      </main>
    );
  }
}

export default withStyles(styles)(PackageList);
