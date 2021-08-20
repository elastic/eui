import React, { useState, Fragment } from 'react';
import { DisplayToggles } from './display_toggles';

import {
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [files, setFiles] = useState({});
  const [large, setLarge] = useState(true);

  const onChange = (files) => {
    setFiles(files.length > 0 ? files : {});
  };

  const renderFiles = () => {
    if (files.length > 0) {
      return (
        <ul>
          {Object.keys(files).map((item, i) => (
            <li key={i}>
              <strong>{files[item].name}</strong> ({files[item].size} bytes)
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>Add some files to see a demo of retrieving from the FileList</p>
      );
    }
  };

  return (
    <Fragment>
      <EuiFlexGroup>
        <EuiFlexItem grow={2}>
          {/* DisplayToggles wrapper for Docs only */}
          <DisplayToggles
            canReadOnly={false}
            extras={[
              <EuiSwitch
                compressed
                label={'large'}
                checked={large}
                onChange={(e) => {
                  setLarge(e.target.checked);
                }}
              />,
            ]}>
            <EuiFilePicker
              id="asdf2"
              multiple
              initialPromptText="Select or drag and drop multiple files"
              onChange={(files) => {
                onChange(files);
              }}
              display={large ? 'large' : 'default'}
              aria-label="Use aria labels when no actual label is in use"
            />
          </DisplayToggles>
          <EuiSpacer />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText>
            <h3>Files attached</h3>
            {renderFiles()}
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
