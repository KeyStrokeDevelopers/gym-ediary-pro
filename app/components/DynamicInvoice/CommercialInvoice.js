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
import 'dan-styles/vendors/invoice/style.css';

const styles = {
  whitePaper: {
    background: '#FFF',
    color: '#000',
    minWidth: 800,
    border: '1px solid #dedede'
  }
};


class CommercialInvoice extends React.Component {
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
          <textarea value={data.brandProduct} />
        </td>
        <td>
          <textarea value={data.selectedProductType} />
        </td>
        <td>
          <textarea value={data.price} />
        </td>
        <td>
          <textarea value={data.quantity} />
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
          <textarea id="header" value={header} />
          <div id="identity">
            <textarea id="address" value={`${invoiceData.accountData.name} ${invoiceData.accountData.state} ${invoiceData.accountData.address} ${invoiceData.accountData.contact}`} />
            <div id="logo">
              {/* <img id="image" src="/images/print_logo.jpg" alt="logo" /> */}
            </div>

          </div>

          <div style={{ clear: 'both' }} />

          <div id="customer">
            <textarea id="customer-title" value={invoiceData.customer} />
            <table id="meta">
              <tbody>
                <tr>
                  <td className="meta-head">Invoice #</td>
                  <td><textarea value={invoiceData.invoice} /></td>
                </tr>
                <tr>
                  <td className="meta-head">Date</td>
                  <td><textarea value={new Date(invoiceData.date).toLocaleDateString()} /></td>
                </tr>
                <tr>
                  {/* <td className="meta-head">Amount Due</td>
                  <td>
                    <div className="due">
                      $
                      {total - paid}
                    </div>
                  </td> */}
                </tr>
              </tbody>
            </table>

          </div>

          <table id="items">
            <thead>
              <tr>
                <th>Item</th>
                <th>Description</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {getRow(invoiceData.orderSummary)}
              {/* <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Subtotal</td>
                <td className="total-value">
                  <div id="subtotal">
                    $
                    {total}
                    .00
                  </div>
                </td>
              </tr> */}

              {/* <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Total</td>
                <td className="total-value">
                  <div id="total">
                    $
                    {total}
                    .00
                  </div>
                </td>
              </tr> */}

              {/* <tr>
                <td colSpan="2" className="blank">&nbsp;</td>
                <td colSpan="2" className="total-line">Amount Paid</td>
                <td className="total-value"><textarea value={paid} /></td>
              </tr> */}

              {/* <tr>
                <td colSpan="2" className="blank-last">&nbsp;</td>
                <td colSpan="2" className="total-line balance">Balance Due</td>
                <td className="total-value balance">
                  <div className="due">
                    $
                    {total - paid}
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>

          <div id="terms">
            <h5>Terms</h5>
            <textarea value={note} />
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(CommercialInvoice);
