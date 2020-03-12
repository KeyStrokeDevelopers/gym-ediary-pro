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

class ClassList extends React.Component {
  state = {
    anchorElOpt: null,
    itemToMove: null
  };

  render() {
    const {
      classes,
      subscribedClassData,
      toggleStar
    } = this.props;
    const { anchorElOpt } = this.state;

    const getPackage = dataArray => dataArray.map((data, index) => (
      <ExpansionPanel className={classes.emailList} key={index + Math.random()}>
        <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.fromHeading}>
            <Tooltip id="tooltip-mark" title="Stared">
              <IconButton onClick={() => toggleStar(data)} className={classes.starBtn}>{data.classInfo.className ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
            </Tooltip>
            <Avatar alt="avatar" className={classes.avatar}><ReportIcon /></Avatar>
            <Typography className={classes.heading} display="block">
              <Typography variant="caption" display="block">{data.classInfo.className}</Typography>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading} noWrap>Class Information</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <section>
            <div className={classes.topAction}>
              <Typography className={classes.headMail}>
                <Fragment>
                  {data.classInfo.className}
                  {' '}
                  CLASS
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
                  <div>{`Class Name : ${data.classInfo.className}`}</div>
                  <Divider />
                  <div>{`Class Price : ${data.classInfo.classPrice}`}</div>
                  <Divider />
                  <div>{`Class Duration : ${data.classInfo.classDuration} ${data.classInfo.durationIn}`}</div>
                  <Divider />
                  <div>{`Class Details : ${data.classInfo.classDetail}`}</div>
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
        {subscribedClassData && subscribedClassData.length >= 1 && getPackage(subscribedClassData)}
      </main>
    );
  }
}

export default withStyles(styles)(ClassList);
