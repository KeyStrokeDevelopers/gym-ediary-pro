/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import uiReducer from './modules/ui';
import initval from './modules/initForm';
import login from './modules/login';
import socmed from './modules/socialMedia';
import ecommerce from './modules/ecommerce';
import contact from './modules/contact';
import chat from './modules/chat';
import email from './modules/email';
import calendar from './modules/calendar';
import taskboard from './modules/taskboard';
import register from './modules/signIn';
import bank from './modules/bank';
import paymentMethod from './modules/paymentMethod';
import packageInfo from './modules/package';
import classInfo from './modules/class';
import staff from './modules/staff';
import category from './modules/category';
import enquiry from './modules/enquiry';
import purpose from './modules/purpose';
import addMember from './modules/addMember';
import expenseIncome from './modules/expenseIncome';
import measurement from './modules/measurement';
import classSubscription from './modules/classSubscription';
import vendorPackageSubscription from './modules/vendorPackageSubscription';
import purposeSubscription from './modules/purposeSubscription';
import media from './modules/mediaProfile';
import brandUnit from './modules/brandUnit';
import product from './modules/product';
import productType from './modules/productType';
import purchase from './modules/purchase';
import workoutNutrition from './modules/workoutNutrition';
import accountInfo from './modules/accountInfo';
import orderSummary from './modules/orderSummary';
import invoiceIn from './modules/invoiceIn';
import account from './modules/account';
import reports from './modules/reports';
import sale from './modules/sale';

/**
 * Branching reducers to use one reducer for many components
 */

// function branchReducer(reducerFunction, reducerName) {
//   return (state, action) => {
//     const { branch } = action;
//     const isInitializationCall = state === undefined;
//     if (branch !== reducerName && !isInitializationCall) {
//       return state;
//     }
//     return reducerFunction(state, action);
//   };
// }

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const signIn = register;
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    // Login Register reducer
    login,
    register,
    signIn,
    // resetPassword        //TODO
    socmed,
    calendar,
    ecommerce,
    contact,
    // Bank, category, payment method, package reducer
    bank,
    category,
    paymentMethod,
    packageInfo,
    staff,
    classInfo,
    purpose,
    enquiry,
    addMember,
    expenseIncome,
    measurement,
    classSubscription,
    vendorPackageSubscription,
    media,
    purposeSubscription,
    brandUnit,
    product,
    productType,
    purchase,
    workoutNutrition,
    accountInfo,
    orderSummary,
    invoiceIn,
    account,
    reports,
    sale,

    chat,
    email,
    taskboard,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
