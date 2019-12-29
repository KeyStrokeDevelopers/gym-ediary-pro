import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Add from '@material-ui/icons/Add';
import Star from '@material-ui/icons/Star';
import IconButton from '@material-ui/core/IconButton';
import styles from './contact-jss';

class BankDataList extends React.Component {
    state = {
        filter: 'all',
    };

    handleChange = (event, value) => {
        this.setState({ filter: value });
    };

    render() {
        const {
            classes,
            dataContact,
            itemSelected,
            bankData,
            showDetail,
            search,
            keyword,
            clippedRight,
            addContact,
            addFn, total
        } = this.props;
        console.log('bank data----', bankData);
        const { filter } = this.state;
        // const favoriteData = dataContact.filter(item => item.get('favorited') === true);

        const getItem = dataArray => dataArray.map((data, ind) => {
            const index = bankData.indexOf(data);
            if (!data) {
                return false;
            }
            return (
                <ListItem
                    button
                    key={ind}
                    className={index === itemSelected ? classes.selected : ''}
                //  onClick={() => showDetail(data)}
                >
                    <ListItemAvatar>
                        <Avatar alt='Vfgf' src='' className={classes.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={data.accountNumber} secondary={data.accountHolder} />
                </ListItem>
            );
        });


        return (
            <Fragment>
                <Drawer
                    variant="permanent"
                    anchor="left"
                    open
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div>
                        <div className={classNames(classes.toolbar, clippedRight && classes.clippedRight)}>
                            <div className={classes.flex}>
                                <div className={classes.searchWrapper}>
                                    <div className={classes.search}>
                                        <SearchIcon />
                                    </div>
                                    <input className={classes.input} onChange={(event) => search(event)} placeholder="Search" />
                                </div>
                                {addFn && (
                                    <Tooltip title="Add New Contact">
                                        <IconButton className={classes.buttonAdd} onClick={() => addContact()} color="secondary" aria-label="Delete">
                                            <Add />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                        <div className={classes.total}>
                            {total}
                            &nbsp;
                            Contacts
            </div>
                        <List>
                            {filter === 'all' ? getItem(bankData) : getItem(bankData)}
                        </List>
                    </div>
                </Drawer>
                <BottomNavigation value={filter} onChange={this.handleChange} className={classes.bottomFilter}>
                    <BottomNavigationAction label="All" value="all" icon={<PermContactCalendar />} />
                    <BottomNavigationAction label="Favorites" value="favorites" icon={<Star />} />
                </BottomNavigation>
            </Fragment>
        );
    }
}

// BankDataList.propTypes = {
//   classes: PropTypes.object.isRequired,
//   total: PropTypes.number.isRequired,
//   dataContact: PropTypes.object.isRequired,
//   keyword: PropTypes.string.isRequired,
//   itemSelected: PropTypes.number.isRequired,
//   addContact: PropTypes.func,
//   addFn: PropTypes.bool,
//   showDetail: PropTypes.func.isRequired,
//   search: PropTypes.func.isRequired,
//   clippedRight: PropTypes.bool,
// };

BankDataList.defaultProps = {
    clippedRight: false,
    addContact: () => { },
    addFn: false,
};

export default withStyles(styles)(BankDataList);
