import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form/immutable';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Bookmark from '@material-ui/icons/Bookmark';
import css from 'dan-styles/Form.scss';
import { TextFieldRedux } from '../Forms/ReduxFormMUI';
import { validate } from '../../components/Forms/helpers/formValidation';
import styles from './contact-jss';


class AddCategoryForm extends React.Component {
    state = {
        age: '',
        //name: 'hai',
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
                                    required
                                    input={<Input name="categoryType" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='expenditure'>EXPENDITURE CATEGORY</MenuItem>
                                    <MenuItem value='income'>EXTRA INCOME CATEGORY</MenuItem>
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
                                required
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

export default withStyles(styles)(reduxForm({
    form: 'addCategoryForm',
    validate,
    enableReinitialize: true
})(AddCategoryForm));
