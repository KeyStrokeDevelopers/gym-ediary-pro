/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import { renderToggle } from '../../../components/Forms/ReduxFormMUI';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';
import ReactToPrint from 'react-to-print';
import Invoice from './Invoice';
import PrintIcon from '@material-ui/icons/Print';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SmsIcon from '@material-ui/icons/Sms';
import EmailIcon from '@material-ui/icons/Email';
import styles from './product-jss';
import StyledNotif from '../../../components/Notification/StyledNotif';
import { closeNotifAction, sendEmail, sendSms } from 'dan-actions/messageActions';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class PrintDetail extends React.Component { // eslint-disable-line

  state = {
    isDigitallySign: true
  };

  componentDidMount() {
    this.props.initialize({ printLogo: true });
  }

  sendEmail = (data) => {
    const { sendEmailInvoice } = this.props;
    sendEmailInvoice(data);
  }

  sendSms = (data) => {
    const { sendSmsInvoice } = this.props;
    sendSmsInvoice(data);
  }


  handleToggle = (e, isDigitallySign) => {
    this.setState({ isDigitallySign })
  }
  render() {
    const {
      classes,
      open,
      close,
      printData,
      memberData,
      gymInfo,
      messageNotif,
      notifType,
      openNoti,
      closeNotif,
    } = this.props;
    const { isDigitallySign } = this.state;
    console.log('print data ---', printData);
    console.log('memberData', memberData)
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <StyledNotif close={() => closeNotif()} openNoti={openNoti} message={messageNotif} notifType={notifType} />
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap color="inherit" className={classes.flex}>
            </Typography>
            <IconButton color="inherit" onClick={() => close()} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.btnArea} style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactToPrint
            trigger={() => (
              <Button className={classes.button} size="small" variant="contained" color="secondary" style={{ margin: '10px' }}>
                <PrintIcon className={classes.extendedIcon} />
                PRINT
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Button className={classes.button} size="small" variant="contained" color="secondary" style={{ margin: '10px' }}>
            <ArrowDownwardIcon className={classes.extendedIcon} />
            IMAGE
          </Button>
          {memberData.contact &&
            <Button onClick={() => this.sendSms({ contact: memberData.contact, message: `${printData.description}_${printData.amount}_by_Paytm` })} className={classes.button} size="small" variant="contained" color="secondary" style={{ margin: '10px' }}>
              <SmsIcon className={classes.extendedIcon} />
              SMS!
          </Button>
          }
          {memberData.email &&
            <Button onClick={() => this.sendEmail({ invoice: <Invoice ref={(el) => { this.componentRef = el; }} invoiceData={printData} memberData={memberData} gymInfo={gymInfo} isDigitallySign={isDigitallySign} />, mailId: memberData.email, subject: 'Invoice' })} className={classes.button} size="small" variant="contained" color="secondary" style={{ margin: '10px' }}>
              <EmailIcon className={classes.extendedIcon} />
              EMAIL
          </Button>
          }
          <div className={classes.picker} style={{ margin: '10px' }}>
            <form>
              <Field
                name="printLogo"
                component={renderToggle}
                onChange={this.handleToggle}
                label='Is Digitally Signed ?'
              />
            </form>
          </div>
        </div>
        <section className={classes.wrapper}>
          <Invoice ref={(el) => { this.componentRef = el; }} invoiceData={printData} memberData={memberData} gymInfo={gymInfo} isDigitallySign={isDigitallySign} />
        </section>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  const messageReducer = state.get('message');
  return ({
    messageNotif: messageReducer.notifMsg,
    notifType: messageReducer.notifType,
    openNoti: messageReducer.openNoti
  });
};

const constDispatchToProps = dispatch => ({
  closeNotif: () => dispatch(closeNotifAction()),
  sendEmailInvoice: (data) => dispatch(sendEmail(data)),
  sendSmsInvoice: (data) => dispatch(sendSms(data))
});

const PrintDetailRedux = reduxForm({
  form: 'printForm',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(PrintDetail);

export default withStyles(styles)(connect(mapStateToProps, constDispatchToProps)(PrintDetailRedux));
