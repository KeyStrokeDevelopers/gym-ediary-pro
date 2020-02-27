/* eslint-disable */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Flag from '@material-ui/icons/Flag';
import People from '@material-ui/icons/People';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import ReportIcon from '@material-ui/icons/Report';
import LabelIcon from '@material-ui/icons/Label';
import Divider from '@material-ui/core/Divider';
import StarBorder from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import styles from './email-jss';

const ITEM_HEIGHT = 80;
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

  handleCloseOpt = () => {
    this.setState({ anchorElOpt: null });
  };

  handleMoveTo = (item, category) => {
    const { moveTo } = this.props;
    moveTo(item, category);
    this.setState({ anchorElOpt: null });
  }

  render() {
    const {
      classes,
      measurementData,
      emailData,
      openMail,
      filterPage,
      keyword,
      remove,
      toggleStar,
      reply
    } = this.props;
    const { anchorElOpt, itemToMove } = this.state;

    const getMeasurement = dataArray => dataArray.map((data, index) => (
      <ExpansionPanel className={classes.emailList} key={index + Math.random()} onChange={() => openMail(mail)}>
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
                  //   onClick={(event) => this.handleClickOpt(event, data)}
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
                  <div>{`Measurement Date : ${data.date}`}</div>
                  <Divider />
                  <div>{`Weight : ${data.weight}`}</div>
                  <Divider />
                  <div>{`Height : ${data.height}`}</div>
                  <Divider />
                  <div>{`Neck : ${data.neck}`}</div>
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
        <Menu
          id="long-menu"
          anchorEl={anchorElOpt}
          open={Boolean(anchorElOpt)}
          onClose={this.handleCloseOpt}
          className={classes.markMenu}
          PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 200 } }}
        >
          <List
            component="nav"
            subheader={<ListSubheader component="div">Mark to... </ListSubheader>}
          />
          <MenuItem selected onClick={() => this.handleMoveTo(itemToMove, 'updates')}>
            <Flag className={classes.iconOrange} />
            &nbsp;Updates
          </MenuItem>
          <MenuItem onClick={() => this.handleMoveTo(itemToMove, 'social')}>
            <People className={classes.iconRed} />
            &nbsp;Social
          </MenuItem>
          <MenuItem onClick={() => this.handleMoveTo(itemToMove, 'promos')}>
            <LabelIcon className={classes.iconBlue} />
            &nbsp;Promos
          </MenuItem>
          <MenuItem onClick={() => this.handleMoveTo(itemToMove, 'forums')}>
            <QuestionAnswer className={classes.iconCyan} />
            &nbsp;Forums
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => this.handleMoveTo(itemToMove, 'spam')}>
            <ReportIcon />
            &nbsp;Spam
          </MenuItem>
        </Menu>
        {measurementData && measurementData.length >= 1 && getMeasurement(measurementData)}
      </main>
    );
  }
}

MeasurementList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default withStyles(styles)(MeasurementList);
