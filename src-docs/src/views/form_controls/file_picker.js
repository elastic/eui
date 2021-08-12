import React, { useRef, useState, Fragment } from 'react';
import { DisplayToggles } from './display_toggles';

import {
  EuiButton,
  EuiCode,
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

export default () => {
  const [files, setFiles] = useState({});
  const [files2, setFiles2] = useState({});
  const [large, setLarge] = useState(true);
  const filePickerRef = useRef();

  const onChange = (files) => {
    setFiles(files.length > 0 ? files : {});
  };

  const onChange2 = (files) => {
    setFiles2(files.length > 0 ? files : {});
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
      <EuiSpacer />
      <EuiText>
        <h3>Remove files programmatically</h3>
        <p>
          The current file selection can be cleared programmatically by calling
          the <EuiCode>removeFiles</EuiCode> method, which can be accessed on a
          component instance via React <EuiCode>ref</EuiCode>:{' '}
          <EuiCode>filePickerRef.current.removeFiles()</EuiCode>.
        </p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup>
        <EuiFlexItem grow={2}>
          <EuiFilePicker
            ref={filePickerRef}
            id="programmatic"
            multiple
            initialPromptText="Select or drag and drop multiple files"
            onChange={onChange2}
            display="default"
            aria-label="Use aria labels when no actual label is in use"
          />
          <EuiSpacer />
        </EuiFlexItem>
        <EuiFlexItem>
          {files2.length > 0 ? (
            <EuiButton
              color="danger"
              iconType="trash"
              onClick={() => filePickerRef.current.removeFiles()}>
              <h3>Remove files</h3>
            </EuiButton>
          ) : null}
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
