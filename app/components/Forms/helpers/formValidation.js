// validation functions
const validate = values => {
    const errors = {}
    const requiredFields = [
        //Add Bank Form Field
        'accountNumber',
        'bankName',
        'ifsc',
        'accountHolder',

        //Payment Method Form Field
        'paymentMethod',

        //Category Form Field
        'categoryType',
        'category',

        //Package Form Field
        'packName',
        'packDuration',
        'packPrice',
        'packDetails',

        'registerNumber',
        'userNumber',
        'branchPin',
        'userName',
        'password',
        'empName',
        'branchName',
        'branchAddress',
        'branchCity',
        'branchState',
        'empContact',
        'gymContact',
        'branchContact',
        'branchEmail',
        'empEmail',
        'confirmPassword'
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = ' '
        }
    })
    if (values.confirmPassword && values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Password does\'t match'
    }
    if (!values.followUpDate && values.followUp) {
        errors['followUpDate'] = 'Required'
    }
    return errors
}

const email = value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
);
const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'Invalid phone number, must be 10 digits'
        : undefined

const pinNumber = value =>
    value && !/^(0|[1-9][0-9]{5})$/i.test(value)
        ? 'Invalid pin number, must be 6 digits'
        : undefined

const number = value =>
    isNaN(value) ? 'Invalid number, characters or symbols is not allow' : undefined


export {
    email,
    phoneNumber,
    pinNumber,
    number,
    validate
}