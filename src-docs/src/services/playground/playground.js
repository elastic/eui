import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiPanel,
} from '../../../../src/components';
import Knobs from './knobs';
import { GuideSectionPropsDescription } from '../../components/guide_section/guide_section_parts/guide_section_props_description';

export default ({ config, setGhostBackground, playgroundClassName }) => {
  const getSnippet = (code) => {
    let regex = /return \(([\S\s]*?)(;)$/gm;
    let newCode = code.match(regex);

    if (newCode) {
      newCode = newCode[0];
      if (newCode.startsWith('return ('))
        newCode = newCode.replace('return (', '');
    } else {
      regex = /return ([\S\s]*?)(;)$/gm;
      newCode = code.match(regex)[0];
      if (newCode.startsWith('return '))
        newCode = newCode.replace('return ', '');
    }

    if (newCode.endsWith(');')) {
      newCode = newCode.replace(/(\);)$/m, '');
    }

    let formatted;
    // TODO: Replace `html-format` with something better.
    // Notably, something more jsx-friendly
    try {
      formatted = format(newCode.trim(), '  '.repeat(1));
    } catch {
      formatted = newCode.trim();
    }
    return formatted;
  };

  const Playground = () => {
    const [isGhost, setGhost] = useState(false);
    const params = useView(config);

    useEffect(() => {
      const { state } = params.knobProps;
      if (setGhostBackground) {
        let needGhostTheme = false;
        Object.keys(setGhostBackground).forEach((name) => {
          if (state[name].value === setGhostBackground[name])
            needGhostTheme = true;
        });
        setGhost(needGhostTheme);
      }
    }, [params.knobProps]);

    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <GuideSectionPropsDescription
            className="playgroundTitle"
            componentName={config.componentName}
            component={config.scope[config.componentName]}
          />
        </EuiFlyoutHeader>
        <EuiFlyoutHeader hasBorder>
          <EuiPanel
            color="transparent"
            borderRadius="none"
            className={classNames('playgroundWrapper', playgroundClassName, {
              guideDemo__ghostBackground: isGhost,
            })}
          >
            <Compiler
              {...params.compilerProps}
              minHeight={0}
              placeholder={Placeholder}
              className={playgroundClassName}
            />
          </EuiPanel>
        </EuiFlyoutHeader>
        <EuiFlyoutHeader hasBorder>
          <EuiCodeBlock
            style={{ maxHeight: '25vh' }}
            language="jsx"
            fontSize="m"
            paddingSize="m"
            isCopyable
          >
            {getSnippet(params.editorProps.code)}
          </EuiCodeBlock>
        </EuiFlyoutHeader>
        <EuiFlyoutBody className="playgroundTableWrapper">
          <EuiErrorBoundary>
            <Knobs {...params.knobProps} />
          </EuiErrorBoundary>
        </EuiFlyoutBody>
      </>
    );
  };

  return <Playground />;
};
