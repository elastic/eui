import React, { useRef, useState, Fragment } from 'react';

import {
  EuiButton,
  EuiFilePicker,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [files, setFiles] = useState({});
  const filePickerRef = useRef();

  const filePickerID = htmlIdGenerator('filepicker')();

  const onChange = (files) => {
    setFiles(files.length > 0 ? files : {});
  };

  return (
    <Fragment>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFilePicker
            ref={filePickerRef}
            id={filePickerID}
            multiple
            initialPromptText="Select or drag and drop multiple files"
            onChange={onChange}
            display="default"
            aria-label="Use aria labels when no actual label is in use"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <div>
            <EuiButton
              color="danger"
              iconType="trash"
              disabled={files.length > 0 ? false : true}
              onClick={() => filePickerRef.current.removeFiles()}>
              <h3>Remove files</h3>
            </EuiButton>
          </div>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );
};
