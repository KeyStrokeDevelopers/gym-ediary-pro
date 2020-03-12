/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Star from '@material-ui/icons/Star';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Delete from '@material-ui/icons/Delete';
import styles from './email-jss';
import { SERVER_URL } from '../Common/constant';

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

  render() {
    const {
      classes,
      mediaData,
      toggleStar
    } = this.props;
    const { open, viewIndex
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

export default withStyles(styles)(MediaList);
