import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiTitle,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiPanel,
} from '../../../../src/components';
import Knobs from './knobs';

export default ({
  config,
  setGhostBackground,
  playgroundClassName,
  description,
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
        <EuiFlyoutHeader hasBorder aria-label={config.componentName}>
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
          <EuiCodeBlock language="jsx" fontSize="m" paddingSize="m" isCopyable>
            {getSnippet(params.editorProps.code)}
          </EuiCodeBlock>
        </EuiFlyoutHeader>
        <EuiFlyoutBody className="playgroundTableWrapper">
          <>
            {description || (
              <div className="guideSection__propsTableIntro">
                <EuiTitle size="s">
                  <h2>{config.componentName}</h2>
                </EuiTitle>
              </div>
            )}
            <EuiErrorBoundary>
              <Knobs {...params.knobProps} />
            </EuiErrorBoundary>
          </>
        </EuiFlyoutBody>
      </>
    );
  };

  return <Playground />;
};
