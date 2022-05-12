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

export default ({
  config,
  setGhostBackground,
  playgroundClassName,
  playgroundPanelProps,
}) => {
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
            className="playground__title"
            componentName={config.componentName}
            component={config.scope[config.componentName]}
          />
        </EuiFlyoutHeader>
        <EuiFlyoutHeader className="playground__demoWrapper" hasBorder>
          <EuiPanel
            hasBorder={false}
            color="transparent"
            borderRadius="none"
            className={classNames('playground__panel', {
              guideDemo__ghostBackground: isGhost,
            })}
            {...playgroundPanelProps}
          >
            <Compiler
              {...params.compilerProps}
              placeholder={Placeholder}
              className={classNames('playground__demo', playgroundClassName)}
            />
          </EuiPanel>
        </EuiFlyoutHeader>
        <EuiFlyoutHeader className="playground__codeWrapper" hasBorder>
          <EuiCodeBlock
            overflowHeight={'100%'}
            language="jsx"
            fontSize="m"
            paddingSize="m"
            isCopyable
          >
            {getSnippet(params.editorProps.code)}
          </EuiCodeBlock>
        </EuiFlyoutHeader>
        <EuiFlyoutBody className="playground__tableWrapper">
          <EuiErrorBoundary>
            <Knobs {...params.knobProps} />
          </EuiErrorBoundary>
        </EuiFlyoutBody>
      </>
    );
  };

  return <Playground />;
};
