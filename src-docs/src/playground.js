import React from 'react';

import {
  useView,
  Compiler,
  Error,
  ActionButtons,
  Placeholder,
} from 'react-view';

import { EuiCodeEditor, EuiSpacer } from '../../src/components';
import Knobs from './services/playground/knobs';

export default config => {
  const params = useView(config);
  return (
    <React.Fragment>
      <Compiler
        {...params.compilerProps}
        minHeight={62}
        placeholder={Placeholder}
      />
      <Error msg={params.errorProps.msg} isPopup />
      <Knobs {...params.knobProps} />
      <EuiSpacer />
      <EuiCodeEditor
        mode="javascript"
        theme="github"
        width="100%"
        value={params.editorProps.code}
        onChange={params.editorProps.onChange}
        setOptions={{
          fontSize: '14px',
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true,
        }}
        onBlur={() => {
          console.log('blur');
        }} // eslint-disable-line no-console
        aria-label="Code Editor"
      />
      <Error {...params.errorProps} />
      <ActionButtons {...params.actions} />
    </React.Fragment>
  );
};
