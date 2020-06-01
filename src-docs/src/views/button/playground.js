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
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiButton.__docgenInfo)
    ? EuiButton.__docgenInfo[0]
    : EuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  // console.log('docgenInfo', docgenInfo.props);
  // console.log('propsToUse', propsToUse);
  propsToUse.children = {
    value: 'Button',
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  };
  // console.log('modifiedProps', modifiedProps);
  const params = useView({
    componentName: 'EuiButton',
    props: propsToUse,
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
