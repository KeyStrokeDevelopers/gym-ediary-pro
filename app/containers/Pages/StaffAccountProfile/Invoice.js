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


const numToWords = (num) => {
  var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
  return str;
}


class Invoice extends React.Component {
  state = {
    header: 'INVOICE'
  };

  render() {
    const { classes, invoiceData, memberData } = this.props;
    const {
      header,
      note
    } = this.state;
    const getRow = (data) => (
      <tr className="item-row">
        <td className="description">
          {data.description}
        </td>
        <td>
          {data.paymentMode}
        </td>
        <td>
          {data.amount}
        </td>
      </tr>
    );

    return (
      <div className={classes.whitePaper}>
        <div id="page-wrap">
          <p id="header">{header} </p>
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
              {/* <div style={{ width: '100%', textAlign: 'center', fontSize: '17px' }}>
                {'info@keystrokedevelopers.com'}
              </div> */}
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70%' }}>
              <table id="fullMeta">
                <tbody>
                  <tr>
                    <td className="fullMetaHead">Name</td>
                    <td>{memberData.name}</td>
                  </tr>
                  <tr>
                    <td className="fullMetaHead">Mobile Number</td>
                    <td>{memberData.contact}</td>
                  </tr>
                  <tr>
                    <td className="fullMetaHead">Email</td>
                    <td>{memberData.email}</td>
                  </tr>
                  <tr>
                    <td className="fullMetaHead">Address</td>
                    <td>{memberData.address}</td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
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
                    <td>{new Date(invoiceData.transactionDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ clear: 'both' }} />
          <table id="items">
            <thead>
              <tr>
                <th>Description</th>
                <th>Mode</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {getRow(invoiceData)}
            </tbody>
            <thead>
              <tr>
                <th>Total</th>
                <th></th>
                <th>{invoiceData.amount}</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Amount (In Words)</th>

                <th colspan="2">{numToWords(invoiceData.amount)}</th>
              </tr>
            </thead>
          </table>

          <div style={{ width: '100%' }}>
            <table>
              <tbody>
                <tr style={{ display: 'flex' }}>
                  <td style={{ width: '30%', display: 'flex', alignItems: 'flex-end', height: '100px' }} >Member Signatory</td>
                  <td style={{ height: '100px', display: 'flex', width: '70%', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <div style={{ fontSize: '17px' }}>
                      FOR KEYSTROKE DEVELOPERS
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      DIGITALLY SIGNED BY KEYSTROKE DEVELOPERS
                    </div>
                  </td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <div id="terms">
            <h5>Terms</h5>
            {note}
          </div> */}
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(Invoice);
