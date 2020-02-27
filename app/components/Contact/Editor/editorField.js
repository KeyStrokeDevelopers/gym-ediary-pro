import React from 'react';
import { Field } from 'redux-form/immutable';
import EditorFieldComponent from './editorFieldComponent';

const EditorField = props => <Field {...props} component={EditorFieldComponent} />;

export default EditorField;
