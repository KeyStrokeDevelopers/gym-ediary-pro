import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import PermContactCalendar from '@material-ui/icons/PermContactCalendar';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Bookmark from '@material-ui/icons/Bookmark';
import Work from '@material-ui/icons/Work';
import Language from '@material-ui/icons/Language';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux, renderToggleInput } from '../Forms/ReduxFormMUI';
import { required } from '../Forms/helpers/formValidation'
import styles from './contact-jss';


class AddCategoryForm extends React.Component {
    state = {
        age: '',
        //name: 'hai',
    };
    saveRef = ref => {
        this.ref = ref;
        return this.ref;
    };
    handleChange = event => {
        this.setState({ age: event.target.value });
    };

    render() {
        const {
            classes,
            reset,
            pristine,
            submitting,
            handleSubmit
        } = this.props;
        const { age } = this.state;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <section className={css.bodyForm}>
                        <div>
                            <FormControl className={classes.formControl} style={{ width: '100%' }}>
                                <InputLabel>Select Category Type</InputLabel>
                                <Select
                                    value={age}
                                    onChange={this.handleChange}
                                    input={<Input name="categoryType" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Category 1</MenuItem>
                                    <MenuItem value={20}>Category 2</MenuItem>
                                    <MenuItem value={30}>Category 3</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Field
                                name="category"
                                component={TextFieldRedux}
                                placeholder="Category e.g Commission"
                                label="Category e.g Commission"
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

AddCategoryForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
};

const AddCategoryFormRedux = reduxForm({
    form: 'addCategoryForm',
    enableReinitialize: true,
})(AddCategoryForm);

const AddCategory = connect(
    state => ({
        initialValues: state.getIn(['contact', 'formValues'])
    })
)(AddCategoryFormRedux);

export default withStyles(styles)(AddCategory);
