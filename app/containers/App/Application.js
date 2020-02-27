/* eslint-disable */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import {
  PersonalDashboard,
  Contact,
  NotFound,
  Bank,
  PaymentMethod, Package, Category, Staff, Class, Purpose,
  Enquiry, AddMember, ExpenseIncome, Profile, TaskBoard, Product, ProductType, BrandUnit, Purchase,
  PendingPayments, PurchaseReport, SaleReport, Attendance, MembershipReport, Wishes, Classes, RegistrationReport, RenewalReport, Sale,
  Ecommerce, ProductPage, CheckoutPage
} from '../pageListAsync';

class Application extends React.Component {
  render() {
    const { changeMode, history, match } = this.props;
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path={`${match.url}`} component={PersonalDashboard} />
          <Route path={`${match.url}/enquiry`} component={Enquiry} />
          <Route path={`${match.url}/expenseIncome`} component={ExpenseIncome} />
          <Route path={`${match.url}/pages/bank`} component={Bank} />
          <Route path={`${match.url}/pages/paymentMethod`} component={PaymentMethod} />
          <Route path={`${match.url}/pages/package`} component={Package} />
          <Route path={`${match.url}/pages/category`} component={Category} />
          <Route path={`${match.url}/pages/staff`} component={Staff} />
          <Route path={`${match.url}/pages/class`} component={Class} />
          <Route path={`${match.url}/pages/purpose`} component={Purpose} />
          <Route path={`${match.url}/pages/contact`} component={Contact} />
          <Route path={`${match.url}/addMember`} component={AddMember} />
          <Route path={`${match.url}/taskboard`} component={TaskBoard} />
          <Route path={`${match.url}/profile`} component={Profile} />
          <Route path={`${match.url}/shoping/productType`} component={ProductType} />
          <Route path={`${match.url}/shoping/brandUnit`} component={BrandUnit} />
          <Route path={`${match.url}/shoping/product`} component={Product} />
          <Route path={`${match.url}/shoping/purchase/:type`} render={({ match }) => <Purchase match={match} />} />
          <Route path={`${match.url}/shoping/sale/:type`} render={({ match }) => <Sale match={match} />} />
          <Route path={`${match.url}/reports/pendingPayments`} component={PendingPayments} />
          <Route path={`${match.url}/reports/membershipReport`} component={MembershipReport} />
          <Route path={`${match.url}/reports/registrationReport`} component={RegistrationReport} />
          <Route path={`${match.url}/reports/renewalReport`} component={RenewalReport} />
          <Route path={`${match.url}/reports/birthdayAnniversaryWishes`} component={Wishes} />
          <Route path={`${match.url}/reports/attendance`} component={Attendance} />
          <Route path={`${match.url}/reports/purchase`} component={PurchaseReport} />
          <Route path={`${match.url}/reports/sale`} component={SaleReport} />

          <Route path="/app/pages/invoice" component={Ecommerce} />
          <Route path="/app/pages/product-detail" component={ProductPage} />
          <Route path="/app/pages/checkout" component={CheckoutPage} />

          {/*
          Todo following four route need to be change, now it is unused */}
          <Route path={`${match.url}/reports/classes`} component={Classes} />


          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Application;
