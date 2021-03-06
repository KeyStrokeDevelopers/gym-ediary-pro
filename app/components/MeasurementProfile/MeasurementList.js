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

class MeasurementList extends React.Component {
  state = {
    anchorElOpt: null,
    itemToMove: null
  };

  handleClickOpt = (event, item) => {
    this.setState({
      anchorElOpt: event.currentTarget,
      itemToMove: item
    });
  };

  render() {
    const {
      classes,
      measurementData,
      toggleStar
    } = this.props;
    const { anchorElOpt } = this.state;

    const getMeasurement = dataArray => dataArray.map((data, index) => (
      <ExpansionPanel className={classes.emailList} key={index + Math.random()}>
        <ExpansionPanelSummary className={classes.emailSummary} expandIcon={<ExpandMoreIcon />}>
          <div className={classes.fromHeading}>
            <Tooltip id="tooltip-mark" title="Stared">
              <IconButton onClick={() => toggleStar(data)} className={classes.starBtn}>{data.date ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
            </Tooltip>
            <Avatar alt="avatar" className={classes.avatar}><ReportIcon /></Avatar>
            <Typography className={classes.heading} display="block">
              <Typography variant="caption" display="block">{data.date}</Typography>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading} noWrap>Measurement Information</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <section>
            <div className={classes.topAction}>
              <Typography className={classes.headMail}>
                <Fragment>
                  {data.height}
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
                  <div>{`Measurement Date : ${new Date(data.date).toLocaleDateString()}`}</div>
                  <Divider />
                  <div>{`Weight : ${data.weight}`}</div>
                  <Divider />
                  <div>{`Height : ${data.height}`}</div>
                  <Divider />
                  <div>{`Neck : ${data.neck}`}</div>
                  <Divider />
                  <div>{`Shoulder : ${data.shoulder}`}</div>
                  <Divider />
                  <div>{`Chest Extended : ${data.chestExtended}`}</div>
                  <Divider />
                  <div>{`Chest Normal : ${data.chestNormal}`}</div>
                  <Divider />
                  <div>{`Forearms : ${data.forearms}`}</div>
                  <Divider />
                  <div>{`Biceps : ${data.biceps}`}</div>
                  <Divider />
                  <div>{`Wrist: ${data.wrist}`}</div>
                  <Divider />
                  <div>{`Upper : ${data.upper}`}</div>
                  <Divider />
                  <div>{`Chest Normal : ${data.chestNormal}`}</div>
                  <Divider />
                  <div>{`Lower : ${data.lower}`}</div>
                  <Divider />
                  <div>{`Waist : ${data.waist}`}</div>
                  <Divider />
                  <div>{`Hip : ${data.hip}`}</div>
                  <Divider />
                  <div>{`Thigh : ${data.thigh}`}</div>
                  <Divider />
                  <div>{`Calves : ${data.calves}`}</div>
                  <Divider />
                  <div>{`Ankles : ${data.ankles}`}</div>
                  <Divider />
                  <div>{`Blood : ${data.blood}`}</div>
                  <Divider />
                  <div>{`Sugar : ${data.sugar}`}</div>
                  <Divider />
                  <div>{`Fat : ${data.fat}`}</div>
                  <Divider />
                  <div>{`Bmi : ${data.bmi}`}</div>
                  <Divider />
                  <div>{`Bmr : ${data.bmr}`}</div>
                  <Divider />
                  <div>{`Medical History : ${data.medicalHistory}`}</div>
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
        {measurementData && measurementData.length >= 1 && getMeasurement(measurementData)}
      </main>
    );
  }
}

export default withStyles(styles)(MeasurementList);
