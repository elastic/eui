import React from 'react';

import {
  useView,
  Compiler,
  Error,
  ActionButtons,
  Placeholder,
  PropTypes,
} from 'react-view';

// import "brace/theme/github";
import {
  EuiButton,
  EuiCodeEditor,
  EuiSpacer,
} from '../../../../src/components/';
import Knobs from '../../services/playground/knobs';

const testProps = {
  color: {
    defaultValue: {
      computed: false,
      value: 'primary',
    },
    description: '`text` color is set for deprecation',
    required: false,
    type: {
      name: 'enum',
      value: [
        { value: 'ghost', computed: false },
        { value: 'text', computed: false },
      ],
    },
  },
  fullWidth: {
    description: '',
    required: false,
    type: { name: 'bool' },
  },
};

const modifiedProps = {
  children: {
    value: `<div>One</div>
    <div>Two</div>
    <div>Three</div>`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  },
  color: {
    defaultValue: 'primary',
    description: '`text` color is set for deprecation',
    required: false,
    options: { ghost: 'ghost', primary: 'primary', text: 'text' },
    type: PropTypes.Enum,
  },
  href: {
    description: '`href` color is set for deprecation',
    value: 'Jane Doe',
    type: PropTypes.String,
  },
  fullWidth: {
    description: '',
    value: false,
    type: PropTypes.Boolean,
    stateful: true,
  },
  setFullWidth: {
    value: 'e => setFullWidth(e)',
    type: PropTypes.Function,
    description: 'Called when fullWidth value is changed.',
    propHook: {
      what: 'e',
      into: 'fullWidth',
    },
  },
};

// const checkboxProps = require('!!extract-react-types-loader!../../../../src/components/button/button.tsx');

export default () => {
  // console.log('checkboxProps', checkboxProps);
  const params = useView({
    componentName: 'EuiButton',
    props: modifiedProps,
    scope: {
      EuiButton,
    },
    imports: {
      '@elastic/eui': {
        named: ['EuiButton'],
      },
    },
  });

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
