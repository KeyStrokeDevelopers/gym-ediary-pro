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
import imgData from 'dan-api/images/imgData';
import 'dan-styles/vendors/slick-carousel/slick-carousel.css';
import 'dan-styles/vendors/slick-carousel/slick.css';
import 'dan-styles/vendors/slick-carousel/slick-theme.css';
import PrintIcon from '@material-ui/icons/Print';
import styles from './product-jss';

const getThumb = imgData.map(a => a.thumb);

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Slide direction="up" ref={ref} {...props} />;
});

class ProductDetail extends React.Component { // eslint-disable-line
  state = {
    qty: 1,
  }

  handleQtyChange = event => {
    this.setState({ qty: event.target.value });
  }

  submitToCart = itemAttr => {
    // const { handleAddToCart, close } = this.props;
    //  handleAddToCart(itemAttr);
    close();
  }

  render() {
    const {
      classes,
      open,
      close,
      invoiceData,
      cancelInvoice
    } = this.props;

    const { qty } = this.state;

    // const itemAttr = (item) => {
    //   if (item !== undefined) {
    //     return {
    //       id: detailContent.getIn([productIndex, 'id']),
    //       name: detailContent.getIn([productIndex, 'name']),
    //       thumbnail: detailContent.getIn([productIndex, 'thumbnail']),
    //       price: detailContent.getIn([productIndex, 'price']),
    //       quantity: qty
    //     };
    //   }
    //   return false;
    // };

    const settings = {
      customPaging: (i) => (
        <a>
          <img src={getThumb[i]} alt="thumb" />
        </a>
      ),
      infinite: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap color="inherit" className={classes.flex}>
              {/* {detailContent.getIn([productIndex, 'name'])} */}
            </Typography>
            <IconButton color="inherit" onClick={() => close()} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.btnArea} style={{ display: 'flex', justifyContent: 'center' }}>
          <ReactToPrint
            trigger={() => (
              <Button className={classes.button} size="small" variant="contained" color="secondary">
                <PrintIcon className={classes.extendedIcon} />
                Print this out!
              </Button>
            )}
            content={() => this.componentRef}
          />
          <Button className={classes.button} size="small" variant="contained" color="primary" style={{ marginLeft: '50px' }} onClick={() => cancelInvoice(invoiceData)}>
            {/* <PrintIcon className={classes.extendedIcon} /> */}
            Cancel invoice!
          </Button>
        </div>
        <section className={classes.wrapper}>
          <CommercialInvoice ref={(el) => { this.componentRef = el; }} invoiceData={invoiceData} />
        </section>
      </Dialog>
    );
  }
}


export default withStyles(styles)(ProductDetail);
