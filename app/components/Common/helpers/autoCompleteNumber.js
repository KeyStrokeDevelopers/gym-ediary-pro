/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AutoSuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


function renderInput(inputProps) {
  const {
    label, touched, error, classes, ref, ...other
  } = inputProps;
  return (
    <>
      <TextField
        fullWidth
        label={label}
        InputProps={{
          inputRef: ref,
          classes: {
            input: classes.input,
          },
          ...other,
        }}
      />
      {
        touched
        && (
          <div style={{
            textAlign: 'left', fontSize: '10px', color: 'red', paddingLeft: '10px'
          }}
          >
            {error}
          </div>
        )
      }
    </>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(`${suggestion.contact}/${suggestion.name}`, query);
  const parts = parse(`${suggestion.contact}/${suggestion.name}`, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            )
        ))}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;
  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}


function getSuggestions(value, enquiryData) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength <= 2 ? [] : enquiryData.filter(suggestion => {
    const keep = count < 5 && suggestion.contact && suggestion.contact.toLowerCase().slice(0, inputLength) === inputValue;

    if (keep) {
      count += 1;
    }
    return keep;
  });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class NumberSuggest extends React.PureComponent {
  state = {
    filteredSuggestions: [],
  };

  handleSuggestionSelected = (event, { suggestionValue, method }) => {
    const { input } = this.props;
    input.onChange(suggestionValue);
    if (method === 'enter') {
      event.preventDefault();
    }
  };

  getSuggestionValue = (suggestion) => {
    this.props.fillData(suggestion);
    return suggestion.contact;
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    const { enquiryData } = this.props;
    this.setState({
      filteredSuggestions: getSuggestions(value, enquiryData),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      filteredSuggestions: [],
    });
  };

  render() {
    const {
      input, classes, placeholder, label, meta: { touched, error }
    } = this.props;
    const { filteredSuggestions } = this.state;
    input.placeholder = placeholder;
    input.classes = classes;
    input.label = label;
    input.touched = touched;
    input.error = error;
    return (
      <>
        <AutoSuggest
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          suggestions={filteredSuggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          renderInputComponent={renderInput}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.handleSuggestionSelected}
          inputProps={input}
        />
      </>
    );
  }
}

NumberSuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NumberSuggest);
