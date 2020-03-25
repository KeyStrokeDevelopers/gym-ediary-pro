/* eslint-disable */
import React, { Component } from 'react';
import {
  EditorState, convertToRaw, ContentState, convertFromHTML
} from 'draft-js';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { withStyles } from '@material-ui/core/styles';
import 'dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css';
import { unemojify } from 'node-emoji';
import styles from '../email-jss';

class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isEditorChange: false,
      reset: false

    };
    this.props.onChange(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
  }

  componentDidMount() {
    const { initValue, onChange } = this.props;
    const { value, resetEditor } = this.props;
    if (!(encodeURIComponent(initValue) === '%3Cp%3E%3C%2Fp%3E%0A') && initValue) {
      const stateValue = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${initValue}</p>`)
        ));

      const stateV = unemojify(
        draftToHtml(convertToRaw(stateValue.getCurrentContent()))
      );
      onChange(stateV);

      if (encodeURIComponent(stateV) === '%3Cp%3Eundefined%3C%2Fp%3E%0A') {
        this.setState({ editorState: EditorState.createEmpty() });
        return;
      }
      this.setState({ editorState: stateValue });
    }
  }

  componentDidUpdate() {
    const { value, initValue, resetEditor } = this.props;
    if (resetEditor) {
      this.setState({ editorState: EditorState.createEmpty() });
      return;
    }
    const { editorState, isEditorChange } = this.state;
    if ((initValue && (!(encodeURIComponent(initValue) === '%3Cp%3Eundefined%3C%2Fp%3E%0A'))) && !(isEditorChange)
      && !(encodeURIComponent(initValue) === '%3Cp%3E%3C%2Fp%3E%0A')) {
      const stateNewValue = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(`<p>${initValue}</p>`)
        ));

      const stateValue = unemojify(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      );
      const updateState = unemojify(
        draftToHtml(convertToRaw(stateNewValue.getCurrentContent()))
      );
      if (updateState !== stateValue) {
        const updatedValue = EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(`<p>${updateState}</p>`)
          ));
        this.setState({ editorState: updatedValue });
      }
    }
  }

  onEditorStateChange = editorState => {
    const { onChange, value } = this.props;
    const newValue = unemojify(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    if (value !== newValue) {
      onChange(newValue);
    }
    this.setState({
      editorState, isEditorChange: true
    });
  };

  render() {
    const { classes } = this.props;
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorClassName={classes.textEditor}
          toolbarClassName={classes.toolbarEditor}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: ['inline', 'fontSize', 'colorPicker', 'image', 'emoji', 'list', 'textAlign'],
            inline: { inDropdown: true },
            color: true,
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
          }}
        />
      </div>
    );
  }
}


const mapStateToProps = state => {
  const purposeReducer = state.get('purpose');
  return ({
    initialFormValue: purposeReducer.formValues
  });
};

const constDispatchToProps = dispatch => ({
});

const ControlledEditorMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(ControlledEditor);

export default withStyles(styles)(ControlledEditorMapped);
