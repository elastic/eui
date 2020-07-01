import React from 'react';

import { useView, Compiler, Error, Placeholder } from 'react-view';
import 'brace/mode/jsx';
import 'brace/theme/github';

import { EuiSpacer, EuiTitle, EuiCodeBlock } from '../../src/components';
import Knobs from './services/playground/knobs';

export default config => {
  const getSnippet = code => {
    const regex = /return \(([\S\s]*?)(;)$/gm;
    let newCode = code.match(regex)[0];

    if (newCode.startsWith('return ('))
      newCode = newCode.replace('return (', '');

    if (newCode.endsWith(');')) {
      newCode = newCode.replace(/(\);)$/m, '');
    }

    // console.log('newCode', newCode);
    return newCode.trim();
  };

  const Playground = () => {
    // if (config.props) {
    //   if (config.props.className) config.props.className.hidden = true;
    //   if (config.props['data-test-subj'])
    //     config.props['data-test-subj'].hidden = true;
    //   if (config.props['aria-label']) config.props['aria-label'].hidden = true;
    // }

    const params = useView(config);
    return (
      <React.Fragment>
        <EuiTitle>
          <h3>{config.componentName}</h3>
        </EuiTitle>
        {/* <EuiSpacer /> */}

        <Compiler
          {...params.compilerProps}
          minHeight={62}
          placeholder={Placeholder}
        />
        <Error msg={params.errorProps.msg} isPopup />
        <EuiSpacer />

        <EuiCodeBlock
          language="js"
          fontSize="m"
          paddingSize="m"
          overflowHeight={300}
          isCopyable>
          {getSnippet(params.editorProps.code)}
        </EuiCodeBlock>
        <EuiSpacer />

        <Knobs {...params.knobProps} />
        <EuiSpacer />
      </React.Fragment>
    );
  };

  return <Playground />;
};
