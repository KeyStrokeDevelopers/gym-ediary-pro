// '''''''''''''''''''''''*
/*
  This is an example app without redux implementation, may little bit messy.
  If your prefer use redux architecture you can change it.
  And We recommend to following this app pattern of redux.
*/
// '''''''''''''''''''''''*
/* eslint-disable */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import logo from 'dan-images/logo.png';
import 'dan-styles/vendors/invoice/style.css';

const styles = {
  whitePaper: {
    background: '#FFF',
    color: '#000',
    minWidth: 800,
    border: '1px solid #dedede'
  }
};





// invoiceId: "5e58c04fb7ea5e17c68245c3"
// date: "2020-02-10T00:00:00.000Z"
// invoice: "2"
// customer: "Virender"
// quantity: 4
// taxableAmount: 93333
// preDiscount: 1904.762
// sgst: 2333.3335
// cgst: 2333.3335
// igst: 0
// ugst: 0
// adCharge: 0
// netAmount: 98000
// accountData:
// status: 1
// _id: "5e58bfbfb51ca917a78ed8d0"
// contact: "9466051803"
// bloodGroup: "A+"
// anniversaryWishes: true
// name: "Virender"
// state: "Haryana"
// gstNumber: "GST001"
// birthdayWishes: true
// address: "Hisar"
// anniversaryWish: "2020-02-10T00:00:00.000Z"
// email: "virender@gmail.com"
// dobWish: "2020-02-10T00:00:00.000Z"
// accountType: "Customer"
// __v: 0
// __proto__: Object
// orderSummary: Array(1)
// 0:
// _id: "5e58c04fb7ea5e17c68245c4"
// product: "5e58bed7b51ca917a78ed8ca"
// productType: "5e58b03d160ce51654d510c1"
// priceFormat: "includingGST"
// quantity: 4
// price: 25000
// gst: 5
// costPrice: 98000
// basicPrice: 95238.095
// gstValue: 4666.667
// priceAfterDiscount: 93333.333
// discountP: 2
// discount: 1904.762
// selectedProductType: "Smart Phone"
// brandProduct: "Samsung=>SSMM-001"
// __proto__: Object
// length: 1
// __proto__: Array(0)
// transactionId: "5e58c04fb7ea5e17c68245c1"








class PrintInvoice extends React.Component {
  state = {
    header: 'INVOICE'
  };

  render() {
    const { classes, invoiceData } = this.props;
    const {
      header,
      note
    } = this.state;
    const getRow = dataArray => dataArray.map((data, index) => (
      <tr className="item-row" key={index.toString()}>
        <td className="description">
          {data.brandProduct}
        </td>
        <td>
          {data.selectedProductType}
        </td>
        <td>
          {data.price}
        </td>
        <td>
          {data.quantity}
        </td>
        <td>
          <span className="price">
            {data.costPrice}
          </span>
        </td>
      </tr>
    ));

    return (
      <div className={classes.whitePaper}>
        <div id="page-wrap">
          <p id="header" value={header} />
          <div id="identity" style={{ display: 'flex' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                  <img src={logo} alt={'logo'} style={{ width: '100%' }} />
                </div>
                <div style={{ width: '80%' }}>
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '35px' }}>
                    {'Keystroke Developers'}
                  </div>
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '22px' }}>
                    {'Website, Software'}
                  </div>
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '16px' }}>
                    {'E-309, 5th Floor, Sector 75 Industrial Area, Phase 8A Mohali Chandigarh'}
                  </div>
                  <div style={{ width: '100%', textAlign: 'center', fontSize: '12px' }}>
                    {'Mob: 9780824448, 9780824448  Email: info@keystrokedevelopers.com'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70%' }}>
              <table id="fullMeta">
                <div>
                  To
                </div>
                <div style={{ marginLeft: '13px' }}>
                  <div>
                    {invoiceData.accountData.name}
                  </div>
                  <div>
                    {invoiceData.accountData.contact}
                  </div>
                  <div>
                    {invoiceData.accountData.email}
                  </div>
                  <div>
                    {invoiceData.accountData.address}
                  </div>
                </div>
              </table>
            </div>
            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <table id="meta">
                <tbody>
                  <tr>
                    <td className="meta-head">Invoice No</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="meta-head">Date</td>
                    <td>{new Date(invoiceData.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <table id="items" style={{ minHeight: '350px' }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody style={{ height: '500px' }}>
              {getRow(invoiceData.orderSummary)}
              {getRow(invoiceData.orderSummary)}
              {getRow(invoiceData.orderSummary)}
            </tbody>
          </table>
          <div id="terms">
            <h5>Terms</h5>
            {note}
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(PrintInvoice);
