import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiSpacer,
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiTitle,
} from '../../../../src/components';
import Knobs from './knobs';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

export default ({
  config,
  setGhostBackground,
  playgroundClassName,
  description,
  tabs,
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
      formatted = format(newCode.trim(), ' '.repeat(4));
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
      <GuideSectionExample
        ghostBackground={isGhost}
        example={
          <>
            <div
              className={classNames('playgroundWrapper', playgroundClassName)}>
              <Compiler
                {...params.compilerProps}
                minHeight={0}
                placeholder={Placeholder}
                className={playgroundClassName}
              />
            </div>
            <EuiSpacer />
            <EuiCodeBlock
              language="jsx"
              fontSize="m"
              paddingSize="m"
              isCopyable>
              {getSnippet(params.editorProps.code)}
            </EuiCodeBlock>
          </>
        }
        tabs={tabs}
        tabContent={
          <>
            {description ? (
              description
            ) : (
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
        }
      />
    );
  };

  return <Playground />;
};
