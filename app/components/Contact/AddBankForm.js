import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import Bookmark from '@material-ui/icons/Bookmark';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux, renderToggleInput } from '../Forms/ReduxFormMUI';
import { required } from '../Forms/helpers/formValidation'
import styles from './contact-jss';


class AddBankForm extends React.Component {
    saveRef = ref => {
        this.ref = ref;
        return this.ref;
    };

    render() {
        const {
            classes,
            reset,
            pristine,
            submitting,
            handleSubmit
        } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <section className={css.bodyForm}>
                        <div>
                            <Field
                                name="accountNumber"
                                component={TextFieldRedux}
                                placeholder="Account Number"
                                label="Account Number"
                                validate={required}
                                required
                                ref={this.saveRef}
                                className={classes.field}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PermContactCalendar />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="bankName"
                                component={TextFieldRedux}
                                placeholder="Bank Name"
                                label="Bank Name"
                                className={classes.field}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Bookmark />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="ifsc"
                                component={TextFieldRedux}
                                placeholder="IFSC e.g HDFC001"
                                label="IFSC e.g HDFC001"
                                className={classes.field}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Bookmark />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="upi"
                                component={TextFieldRedux}
                                placeholder="UPI e.g. 000121"
                                label="UPI e.g. 000121"
                                className={classes.field}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Work />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="accountHolder"
                                component={TextFieldRedux}
                                placeholder="Account Holder"
                                label="Account Holder"
                                className={classes.field}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Language />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div>
                            <Field
                                name="swipe"
                                component={renderToggleInput}
                            />
                        </div>


                    </section>
                    <div className={css.buttonArea}>
                        <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                            Submit
                    </Button>
                        <Button
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                        > Reset
                    </Button>
                    </div>
                </form>
            </div>
        );
    }
}

AddBankForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
};

const AddBankFormRedux = reduxForm({
    form: 'addBankForm',
    enableReinitialize: true,
})(AddBankForm);

const AddBank = connect(
    state => ({
        initialValues: state.getIn(['contact', 'formValues'])
    })
)(AddBankFormRedux);

export default withStyles(styles)(AddBank);
