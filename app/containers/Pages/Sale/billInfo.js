/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BillInfo extends Component {
  render() {
    const { cartData, gymInfoData, paidAmount, accountData } = this.props;
    let taxableAmount = 0;
    let totalDiscount = 0;
    let gstValue = 0;
    let totalAmount = 0;
    let amountAfterDiscount = 0;
    (cartData && cartData.length >= 1) && cartData.map((data) => {
      taxableAmount += data.basicPrice;
      totalDiscount += data.discount;
      gstValue += data.gstValue;
      totalAmount += data.costPrice;
      amountAfterDiscount += data.priceAfterDiscount;
      return null;
    });
    totalAmount = parseFloat(totalAmount.toFixed(2));
    const netPayableAmount = Math.round(totalAmount);
    let roundOff = parseFloat((netPayableAmount - totalAmount).toFixed(2));
    let roundOffLabel;
    if (roundOff >= 0) {
      roundOff = `+ ${roundOff}`;
      roundOffLabel = '+';
    } else {
      let r = parseFloat((roundOff + 1).toFixed(2));
      r = parseFloat((1 - r).toFixed(2));
      roundOff = `- ${r}`;
      roundOffLabel = '-';
    }


    let gstLabel = '';
    let gymInfoState;
    if (gymInfoData && Object.keys(gymInfoData).length >= 1) {
      gymInfoState = gymInfoData.branchState;
      if (gymInfoState === 'Chandigarh' || gymInfoState === 'Dadra and Nagar Haveli' || gymInfoState === 'Lakshadweep' || gymInfoState === 'Daman and Diu' || gymInfoState === 'Puducherry' || gymInfoState === 'Delhi' || gymInfoState === 'Andaman and Nicobar Islands') {
        gstLabel = 'UGST';
      }
      else if (gymInfoState === accountData.get('state')) {
        gstLabel = 'SGST+CGST';
      }
      else {
        gstLabel = 'IGST';
      }
    }

    return (
      <div style={{
        minHeight: '200px', backgroundColor: '#2196F3', width: '100%', color: '#ffffff'
      }}
      >
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            BASIC AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {taxableAmount.toFixed(3)}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            DISCOUNT AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {totalDiscount.toFixed(3)}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            TAXABLE AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {amountAfterDiscount.toFixed(3)}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            {gstLabel}
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {gstValue.toFixed(3)}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            TOTAL AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        <div style={{
          width: '100%', display: 'flex', padding: '10px 20px', backgroundColor: '#ffffff', color: '#000000',
        }}
        >
          <div style={{ width: '70%' }}>
            ROUNDED OF [
            {roundOffLabel}
            ]
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: 'green', color: '#ffffff'
            }}
            >
              {roundOff}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            NET PAYABLE AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {netPayableAmount}
            </span>
          </div>
        </div>

        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            PAID AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {paidAmount}
            </span>
          </div>
        </div>
        <div style={{ width: '100%', display: 'flex', padding: '10px 20px' }}>
          <div style={{ width: '70%' }}>
            BALANCE AMOUNT
          </div>
          <div style={{ width: '100px', textAlign: 'right', paddingRight: '5px' }}>
            <span style={{
              borderRadius: '10px', padding: '2px 10px', backgroundColor: '#ffffff', color: '#2196F3'
            }}
            >
              {netPayableAmount - paidAmount}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const saleReducer = state.get('sale');
  return ({
    billData: saleReducer.billInfoData,
    cartData: saleReducer.cartList,
    accountData: saleReducer.customerData,
    discount: saleReducer.discount,
    discountInValue: saleReducer.discountInValue,
    gymInfoData: saleReducer.gymInfoData,
    paidAmount: saleReducer.paidAmount
  });
};


const BillInfoMapped = connect(
  mapStateToProps,
  null
)(BillInfo);


export default (BillInfoMapped);
