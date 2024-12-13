import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiCodeBlock,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  useEuiTheme,
} from '../../../../src';
import {
  EuiErrorMessage,
  EuiErrorBoundary,
} from '../../../../src/components/error_boundary/error_boundary';
import Knobs from './knobs';
import { GuideSectionPropsDescription } from '../../components/guide_section/guide_section_parts/guide_section_props_description';

export default ({
  config,
  setGhostBackground,
  playgroundClassName,
  playgroundCssStyles,
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
    const euiTheme = useEuiTheme();
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

    // react-view swallows errors thrown in the Compiler, so we need to grab
    // them via errorProps and pass them to our own EUI component
    const thrownError = params.errorProps.msg; // string or null

    return (
      <>
        <EuiFlyoutHeader hasBorder>
          <GuideSectionPropsDescription
            className="playground__title"
            componentName={config.componentName}
            component={config.scope[config.componentName]}
          />
        </EuiFlyoutHeader>
        <EuiFlyoutHeader
          className={classNames('playground__demoWrapper', {
            guideDemo__ghostBackground: isGhost,
          })}
          hasBorder
        >
          <Compiler
            css={css([
              !thrownError
                ? { padding: euiTheme.euiTheme.size.base }
                : undefined,
              playgroundCssStyles?.(euiTheme),
            ])}
            {...params.compilerProps}
            placeholder={Placeholder}
            className={classNames('playground__demo', playgroundClassName)}
          />
          {thrownError && <EuiErrorMessage errorMessage={thrownError} />}
        </EuiFlyoutHeader>
        <EuiFlyoutHeader className="playground__codeWrapper" hasBorder>
          <EuiCodeBlock
            overflowHeight={'100%'}
            language="jsx"
            fontSize="m"
            paddingSize="m"
            isCopyable
            css={{ border: 'none' }} // Avoid duplicate borders in high contrast mode
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
