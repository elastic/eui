import React, { Component, Fragment } from 'react';

import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

export class FilePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: {},
    };
  }

  onChange = files => {
    this.setState({
      files: files,
    });
  };

  renderFiles() {
    if (this.state.files.length > 0) {
      return (
        <ul>
          {Object.keys(this.state.files).map((item, i) => (
            <li key={i}>
              <strong>{this.state.files[item].name}</strong> (
              {this.state.files[item].size} bytes)
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>Add some files to see a demo of retrieving from the FileList</p>
      );
    }
  }

  render() {
    return (
      <Fragment>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiFilePicker
              id="asdf2"
              multiple
              initialPromptText="Select or drag and drop multiple files"
              onChange={files => {
                this.onChange(files);
              }}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText>
              <h3>Files attached</h3>
              {this.renderFiles()}
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <EuiFilePicker disabled initialPromptText="Disabled" />

        <EuiSpacer size="m" />

        <EuiFilePicker
          id="asdf2"
          multiple
          compressed
          initialPromptText="Select some files"
          onChange={files => {
            this.onChange(files);
          }}
        />
      </Fragment>
    );
  }
}
