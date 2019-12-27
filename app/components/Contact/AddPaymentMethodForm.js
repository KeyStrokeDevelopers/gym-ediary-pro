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


class AddPaymentMethodForm extends React.Component {
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
                                name="paymentMethod"
                                component={TextFieldRedux}
                                placeholder="Payment Method"
                                label="Payment Method"
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

AddPaymentMethodForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
};

const AddPaymentMethodFormRedux = reduxForm({
    form: 'addPaymentMethodForm',
    enableReinitialize: true,
})(AddPaymentMethodForm);

const AddPaymentMethod = connect(
    state => ({
        initialValues: state.getIn(['contact', 'formValues'])
    })
)(AddPaymentMethodFormRedux);

export default withStyles(styles)(AddPaymentMethod);
