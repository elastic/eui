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
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [files, setFiles] = useState({});
  const [large, setLarge] = useState(true);

  const filePickerId = useGeneratedHtmlId({ prefix: 'filePicker' });

  const onChange = (files) => {
    setFiles(files.length > 0 ? Array.from(files) : []);
  };

  const renderFiles = () => {
    if (files.length > 0) {
      return (
        <ul>
          {files.map((file, i) => (
            <li key={i}>
              <strong>{file.name}</strong> ({file.size} bytes)
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
            ]}
          >
            <EuiFilePicker
              id={filePickerId}
              multiple
              initialPromptText="Select or drag and drop multiple files"
              onChange={onChange}
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
