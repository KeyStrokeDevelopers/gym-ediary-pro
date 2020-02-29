/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import styles from './settings-jss';
import {
  PaymentMethod, Package, Category, Staff, Class, Purpose, GymInfo, Sms, Subscription
} from '../../pageListAsync';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line
class DetailView extends React.Component {
  state = {
    checked: ['switch', 'check2'],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeSelection = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      open,
      handleClose,
      title,
      keyValue
    } = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              <CloseIcon />
            </Button>
          </Toolbar>
        </AppBar>

        {keyValue === 'payment_method'
          && <PaymentMethod />
        }
        {keyValue === 'package'
          && <Package />
        }
        {keyValue === 'category'
          && <Category />
        }
        {keyValue === 'staff'
          && <Staff />
        }
        {keyValue === 'class'
          && <Class />
        }
        {keyValue === 'purpose'
          && <Purpose />
        }
        {keyValue === 'gym_info'
          && <GymInfo />
        }
        {keyValue === 'sms'
          && <Sms />
        }
        {keyValue === 'subscription'
          && <Subscription />
        }
      </Dialog>
    );
  }
}

DetailView.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(DetailView);
