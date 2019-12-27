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


class AddPackageForm extends React.Component {
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
                                name="packName"
                                component={TextFieldRedux}
                                placeholder="Package Name e.g. Monthly, Yearly"
                                label="Package Name e.g. Monthly, Yearly"
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
                                name="packDuration"
                                component={TextFieldRedux}
                                placeholder="Duration Months- 1, 12"
                                label="Duration Months- 1, 12"
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
                                name="packPrice"
                                component={TextFieldRedux}
                                placeholder="Package Price - 1000, 3000"
                                label="Package Price - 1000, 3000"
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
                                name="packDetails"
                                component={TextFieldRedux}
                                placeholder="Package Details - If Any"
                                label="Package Details - If Any"
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

AddPackageForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
};

const AddPackageFormRedux = reduxForm({
    form: 'addPackageForm',
    enableReinitialize: true,
})(AddPackageForm);

const AddPackage = connect(
    state => ({
        initialValues: state.getIn(['contact', 'formValues'])
    })
)(AddPackageFormRedux);

export default withStyles(styles)(AddPackage);
