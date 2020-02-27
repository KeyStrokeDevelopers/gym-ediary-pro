/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Bookmark from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LabelIcon from '@material-ui/icons/Label';
import Star from '@material-ui/icons/Star';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import isImage from '../Forms/helpers/helpers.js';
import styles from './email-jss';

const ITEM_HEIGHT = 80;
class MediaList extends React.Component {
  state = {
    anchorElOpt: null,
    itemToMove: null,
    open: false,
    viewIndex: ''
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

  handleClose = () => {
    this.setState({ open: false, viewIndex: '' });
  }

  handleDeleteMedia = (dataId) => {
    const { deleteMedia } = this.props;
    deleteMedia(dataId);
    this.setState({ open: false, viewIndex: '' });
  }

  viewMedia = (index) => {
    this.setState({ open: true, viewIndex: index });
  }

  handleMoveTo = (item, category) => {
    const { moveTo } = this.props;
    moveTo(item, category);
    this.setState({ anchorElOpt: null });
  }

  render() {
    const {
      classes,
      mediaData,
      toggleStar
    } = this.props;
    const {
      anchorElOpt, itemToMove, open, viewIndex
    } = this.state;

    const getMedia = dataArray => dataArray.map((data, index) => (
      <div>
        <div>
          <Dialog
            open={index === viewIndex ? open : false}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <div style={{
                display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%'
              }}
              >
                <div>
                  {data.description}
                </div>
                <div>
                  <IconButton aria-label="close" onClick={this.handleClose}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <img src={`${SERVER_URL}${data.image}`} alt="image" />
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ color: '#f56049' }}>
              <Delete onClick={() => this.handleDeleteMedia(data._id)} style={{ cursor: 'pointer' }} />
            </DialogActions>
          </Dialog>
        </div>
        <ExpansionPanel className={classes.emailList} key={index + Math.random()}>
          <ExpansionPanelSummary className={classes.emailSummary} onClick={() => this.viewMedia(index)}>
            <div className={classes.fromHeading}>
              <Tooltip id="tooltip-mark" title="Stared">
                <IconButton onClick={() => toggleStar(data)} className={classes.starBtn}>{data.date ? (<Star className={classes.iconOrange} />) : (<StarBorder />)}</IconButton>
              </Tooltip>
              {data.image
                ? <Avatar alt="avatar" src={`${SERVER_URL}${data.image}`} className={classes.avatar} />
                : <Avatar alt="avatar" className={classes.avatar}><ReportIcon /></Avatar>
              }
              <Typography className={classes.heading} display="block">
                <Typography variant="caption" display="block">{data.date}</Typography>
              </Typography>
            </div>

            <div className={classes.column}>
              <Typography className={classes.secondaryHeading} noWrap>{data.description}</Typography>
            </div>
          </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>
    ));

    return (
      <main className={classes.content}>
        {mediaData && mediaData.length >= 1 && getMedia(mediaData)}
      </main>
    );
  }
}

MediaList.propTypes = {
  classes: PropTypes.object.isRequired,
  openMail: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleStar: PropTypes.func.isRequired,
  reply: PropTypes.func.isRequired,
  filterPage: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default withStyles(styles)(MediaList);
