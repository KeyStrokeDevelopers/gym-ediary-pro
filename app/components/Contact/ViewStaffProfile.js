/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import imgData from 'dan-api/images/imgData';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';
import styles from './product-jss';
import StaffProfile from '../../containers/Pages/StaffProfile';

const getThumb = imgData.map(a => a.thumb);

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
    return <Slide direction="up" ref={ref} {...props} />;
});

class ViewStaffProfile extends React.Component { // eslint-disable-line

    render() {
        const {
            classes,
            open,
            close,
            staffData,
            paymentMethodData
        } = this.props;

        return (
            <Dialog
                fullScreen
                open={open}
                onClose={close}
                TransitionComponent={Transition}
            >
                <div style={{ width: '100%', overflowX: 'hidden' }}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap color="inherit" className={classes.flex}>
                                {'Staff Profile'}
                            </Typography>
                            <IconButton color="inherit" onClick={() => close()} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <section className={classes.wrapper}>
                        <StaffProfile staffData={staffData} />
                    </section>
                </div>
            </Dialog>
        );
    }
}


export default withStyles(styles)(ViewStaffProfile);
