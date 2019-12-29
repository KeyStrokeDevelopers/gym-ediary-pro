import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Bookmark from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import Divider from '@material-ui/core/Divider';
import styles from './contact-jss';

const optionsOpt = [
    'Block Contact',
    'Delete Contact',
    'Option 1',
    'Option 2',
    'Option 3',
];

const ITEM_HEIGHT = 48;

class BankDetail extends React.Component {
    state = {
        anchorElOpt: null,
    };

    handleClickOpt = event => {
        this.setState({ anchorElOpt: event.currentTarget });
    };

    handleCloseOpt = () => {
        this.setState({ anchorElOpt: null });
    };

    deleteContact = (item) => {
        const { remove } = this.props;
        remove(item);
        this.setState({ anchorElOpt: null });
    }

    render() {
        const {
            classes,
            bankData,
            itemSelected,
            edit,
            favorite,
            showMobileDetail,
            hideDetail
        } = this.props;
        const { anchorElOpt } = this.state;
        return (
            <main className={classNames(classes.content, showMobileDetail ? classes.detailPopup : '')}>
                <section className={classes.cover}>
                    <div className={classes.opt}>
                        <IconButton className={classes.favorite} aria-label="Favorite" onClick={() => favorite(bankData.itemSelected)}>
                            {bankData[itemSelected]['accountHolder'] ? (<Star />) : <StarBorder />}
                        </IconButton>
                        <IconButton aria-label="Edit" onClick={() => edit(bankData[itemSelected]['accountHolder'])} >
                            <Edit />
                        </IconButton>
                        <IconButton
                            aria-label="More"
                            aria-owns={anchorElOpt ? 'long-menu' : null}
                            aria-haspopup="true"
                            className={classes.button}
                            onClick={this.handleClickOpt}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={anchorElOpt}
                            open={Boolean(anchorElOpt)}
                            onClose={this.handleCloseOpt}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: 200,
                                },
                            }}
                        >
                            {optionsOpt.map(option => {
                                if (option === 'Delete Contact') {
                                    return (
                                        <MenuItem key={option} selected={option === 'Edit Profile'} onClick={() => this.deleteContact(bankData[itemSelected]['accountHolder'])}>
                                            {option}
                                        </MenuItem>
                                    );
                                }
                                return (
                                    <MenuItem key={option} selected={option === 'Edit Profile'} onClick={this.handleCloseOpt}>
                                        {option}
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </div>
                    <IconButton
                        onClick={hideDetail}
                        className={classes.navIconHide}
                        aria-label="Back"
                    >
                        <ArrowBack />
                    </IconButton>
                    <Hidden xsDown>
                        <Avatar alt='V' src='' className={classes.avatar} />
                        <Typography className={classes.userName} variant="h6">
                            {bankData[0]['accountHolder']}
                            <Typography display="block" variant="caption">
                                {bankData[0]['accountNumber']}
                            </Typography>
                        </Typography>
                    </Hidden>
                </section>
                <div>
                    <Hidden smUp>
                        <Avatar alt='V' src='' className={classes.avatar} />
                        <Typography className={classes.userName} variant="h6">
                            {bankData[0]['accountHolder']}
                            <Typography display="block" variant="caption">
                                {bankData[0]['accountNumber']}
                            </Typography>
                        </Typography>
                    </Hidden>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.blueIcon}>
                                    <Bookmark />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bankData[itemSelected]['bankName']} secondary="BANK NAME" />
                        </ListItem>
                        <Divider variant="inset" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.blueIcon}>
                                    <Bookmark />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bankData[itemSelected]['ifsc']} secondary="IFSC" />
                        </ListItem>
                        <Divider variant="inset" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.amberIcon}>
                                    <Work />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bankData[itemSelected]['upi']} secondary="UPI" />
                        </ListItem>
                        <Divider variant="inset" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.amberIcon}>
                                    <Language />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bankData[itemSelected]['swipe']} secondary="SWIPE" />
                        </ListItem>
                        <Divider variant="inset" />
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={classes.amberIcon}>
                                    <Language />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={bankData[itemSelected]['status']} secondary="STATUS" />
                        </ListItem>
                        <Divider variant="inset" />
                    </List>
                </div>
            </main>
        );
    }
}

BankDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    showMobileDetail: PropTypes.bool.isRequired,
    bankData: PropTypes.object.isRequired,
    itemSelected: PropTypes.number.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    favorite: PropTypes.func.isRequired,
    hideDetail: PropTypes.func.isRequired,
};

export default withStyles(styles)(BankDetail);
