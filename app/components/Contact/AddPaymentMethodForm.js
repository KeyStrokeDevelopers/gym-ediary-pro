import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux } from '../Forms/ReduxFormMUI';
import { validate } from '../../components/Forms/helpers/formValidation';
import styles from './contact-jss';


class AddPaymentMethodForm extends React.Component {

    handleFormData = (data) => {
        this.props.addPaymentMethodData(data)
    }

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
                <form onSubmit={handleSubmit((data) => this.handleFormData(data))}>
                    <section className={css.bodyForm}>
                        <div>
                            <Field
                                name="paymentMethod"
                                component={TextFieldRedux}
                                placeholder="Payment Method"
                                label="Payment Method"
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

export default withStyles(styles)(reduxForm({
    form: 'addPaymentMethodForm',
    validate,
    enableReinitialize: true
})(AddPaymentMethodForm));
