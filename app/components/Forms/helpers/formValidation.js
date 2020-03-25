/* eslint-disable */
// validation functions
const validate = values => {
  const errors = {};
  const requiredFields = [
    // Payment Method Form Field
    'paymentMethod',
    'shiftFrom1',
    'shiftTo1',
    'invoiceNumber',
    'purposeName',

    // Category Form Field
    'categoryType',
    'category',
    'state',

    // Package Form Field
    'packName',
    'packDuration',
    'packPrice',
    'durationIn',

    // staff
    'staffDob',
    'staffJoiningDate',
    'staffCode',
    'accessLevel',

    // enquiry
    'purpose',
    'response',

    // add member
    'name',
    'contact',
    'fTitle',
    'favourOf',
    'email',
    'address',

    // class
    'className',
    'classTakingBy',
    'classFrom',
    'classTo',
    'paymentMode',

    // purchase
    'product',
    'brand',
    'model',
    'modelNo',
    'minimumQty',
    'measuringUnit',
    'costPrice',
    'sellingPrice',
    'brandProduct',
    'quantity',
    'priceFormat',
    'price',
    'productType',
    'hsnCode',
    'gst',
    'entryType',
    'value',
    'registerNumber',
    'userNumber',
    'branchPin',
    'userName',
    'password',
    'staffName',
    'branchName',
    'branchAddress',
    'branchCity',
    'branchState',
    'staffContact',
    'gymContact',
    'branchContact',
    'branchEmail',
    'staffEmail',
    'confirmPassword'
  ];
  requiredFields.forEach(field => {
    if (!values.get(field)) {
      errors[field] = 'Required';
    }
  });
  if (values.get('confirmPassword') && values.get('password') !== values.get('confirmPassword')) {
    errors.confirmPassword = 'Password does\'t match';
  }

  if (!values.get('followUpDate') && values.get('followUp')) {
    errors.followUpDate = 'Required';
  }

  if (!values.get('dobWish') && values.get('birthdayWishes')) {
    errors.dobWish = 'Required';
  }

  if (!values.get('anniversaryWish') && values.get('anniversaryWishes')) {
    errors.anniversaryWish = 'Required';
  }

  if (!values.get('packageInfo')) {
    errors.addmPackage = 'Package selection is required';
  }

  if (values.get('isFingerRequired') && !values.get('fingerCode')) {
    errors.fingerCode = 'Required';
  }
  return errors;
};

const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined);

const phoneNumber = value => (value && !/^(0|[1-9][0-9]{9})$/i.test(value)
  ? 'Invalid phone number, must be 10 digits'
  : undefined);

const pinNumber = value => (value && !/^(0|[1-9][0-9]{5})$/i.test(value)
  ? 'Invalid pin number, must be 6 digits'
  : undefined);

const number = value => value && (isNaN(value) ? 'Invalid number, characters or symbols is not allow' : undefined);


export {
  email,
  phoneNumber,
  pinNumber,
  number,
  validate
};
