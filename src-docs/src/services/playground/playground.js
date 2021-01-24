import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiFlexItem,
  EuiCodeBlock,
  EuiErrorBoundary,
} from '../../../../src/components';
import Knobs from './knobs';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';
import { EuiHorizontalRule } from '../../../../src/components/horizontal_rule';

export default ({
  config,
  setGhostBackground,
  playgroundClassName,
  playgroundToggle,
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

    return format(newCode.trim(), ' '.repeat(4));
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

    const compilerClasses = classNames(
      'playgroundCompiler',
      {
        playgroundCompiler__ghostBackground: isGhost,
      },
      playgroundClassName
    );

    return (
      <GuideSectionExample
        componentName={config.componentName}
        exampleCode={
          <>
            <EuiFlexItem className={compilerClasses}>
              <Compiler
                {...params.compilerProps}
                minHeight={62}
                placeholder={Placeholder}
              />
            </EuiFlexItem>
            <EuiFlexItem className="eui-fullWidth" grow={true}>
              <EuiCodeBlock
                language="html"
                fontSize="m"
                paddingSize="m"
                isCopyable>
                {getSnippet(params.editorProps.code)}
              </EuiCodeBlock>
            </EuiFlexItem>
          </>
        }
        tabs={tabs}
        tabContent={
          <EuiErrorBoundary>
            <EuiHorizontalRule margin="none" />
            {description}
            <Knobs {...params.knobProps} />
          </EuiErrorBoundary>
        }
        playground={playgroundToggle}
      />
    );
  };

  return <Playground />;
};
