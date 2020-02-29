/* eslint-disable */

import React from 'react';
import Loading from 'dan-components/Loading';
import loadable from '../utils/loadable';

// Dashboard
export const PersonalDashboard = loadable(() =>
  import('./Dashboard/PersonalDashboard'), {
  fallback: <Loading />,
});

export const Contact = loadable(() =>
  import('./Pages/Contact'), {
  fallback: <Loading />,
});


// Other
export const NotFound = loadable(() =>
  import('./NotFound/NotFound'), {
  fallback: <Loading />,
});

//Bank Page

export const Bank = loadable(() =>
  import('./Pages/Bank'), {
  fallback: <Loading />
});

export const PaymentMethod = loadable(() =>
  import('./Pages/PaymentMethod'), {
  fallback: <Loading />
});

export const Package = loadable(() =>
  import('./Pages/Package'), {
  fallback: <Loading />
});

export const Category = loadable(() =>
  import('./Pages/Category'), {
  fallback: <Loading />
});

export const Staff = loadable(() =>
  import('./Pages/Staff'), {
  fallback: <Loading />
})

export const Class = loadable(() =>
  import('./Pages/Class'), {
  fallback: <Loading />
})

export const Purpose = loadable(() =>
  import('./Pages/Purpose'), {
  fallback: <Loading />
})

export const Enquiry = loadable(() =>
  import('./Pages/Enquiry'), {
  fallback: <Loading />
})

export const GymInfo = loadable(() =>
  import('./Pages/GymInfo'), {
  fallback: <Loading />
})

export const Sms = loadable(() =>
  import('./Pages/Sms'), {
  fallback: <Loading />
})

export const Subscription = loadable(() =>
  import('./Pages/Subscription'), {
  fallback: <Loading />
})

export const AddMember = loadable(() =>
  import('./Pages/AddMember'), {
  fallback: <Loading />
})

export const ExpenseIncome = loadable(() =>
  import('./Pages/ExpenseIncome'), {
  fallback: <Loading />
})

export const TaskBoard = loadable(() =>
  import('./Pages/TaskBoard'), {
  fallback: <Loading />,
});

export const Profile = loadable(() =>
  import('./Pages/UserProfile'), {
  fallback: <Loading />,
});

export const Product = loadable(() =>
  import('./Pages/Product'), {
  fallback: <Loading />,
});
export const ProductType = loadable(() =>
  import('./Pages/ProductType'), {
  fallback: <Loading />,
});
export const BrandUnit = loadable(() =>
  import('./Pages/BrandUnit'), {
  fallback: <Loading />,
});
export const Purchase = loadable(() =>
  import('./Pages/Purchase'), {
  fallback: <Loading />,
});
export const Sale = loadable(() =>
  import('./Pages/Sale'), {
  fallback: <Loading />,
});

export const PendingPayments = loadable(() =>
  import('./Pages/Reports/pendingPayments'), {
  fallback: <Loading />,
});

export const PurchaseReport = loadable(() =>
  import('./Pages/Reports/purchase'), {
  fallback: <Loading />,
});

export const SaleReport = loadable(() =>
  import('./Pages/Reports/sale'), {
  fallback: <Loading />,
});

export const Attendance = loadable(() =>
  import('./Pages/Reports/attendance'), {
  fallback: <Loading />,
});
export const MembershipReport = loadable(() =>
  import('./Pages/Reports/membershipReport'), {
  fallback: <Loading />,
});


export const CheckoutPage = loadable(() =>
  import('./Pages/Ecommerce/CheckoutPage'), {
  fallback: <Loading />,
});

export const Ecommerce = loadable(() =>
  import('./Pages/Ecommerce'), {
  fallback: <Loading />,
});

export const Wishes = loadable(() =>
  import('./Pages/Reports/wishes'), {
  fallback: <Loading />,
});
export const Classes = loadable(() =>
  import('./Pages/Reports/classes'), {
  fallback: <Loading />,
});
export const RegistrationReport = loadable(() =>
  import('./Pages/Reports/registrationReport'), {
  fallback: <Loading />,
});
export const RenewalReport = loadable(() =>
  import('./Pages/Reports/renewalReport'), {
  fallback: <Loading />,
});

export const ProductPage = loadable(() =>
  import('./Pages/Ecommerce/ProductPage'), {
  fallback: <Loading />,
});

export const Login = loadable(() =>
  import('./Pages/Users/Login'), {
  fallback: <Loading />,
});

export const Register = loadable(() =>
  import('./Pages/Users/Register'), {
  fallback: <Loading />,
});

export const Master = loadable(() =>
  import('./Pages/Master'), {
  fallback: <Loading />,
});