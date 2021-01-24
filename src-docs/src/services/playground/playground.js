import React, { useState, useEffect } from 'react';
import format from 'html-format';

import { useView, Compiler, Placeholder } from 'react-view';
import {
  EuiSpacer,
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiHorizontalRule,
} from '../../../../src/components';
import Knobs from './knobs';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

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

    return (
      <GuideSectionExample
        ghostBackground={isGhost}
        componentName={config.componentName}
        exampleCode={
          <>
            <div className={playgroundClassName}>
              <Compiler
                {...params.compilerProps}
                minHeight={62}
                placeholder={Placeholder}
              />
            </div>
            <EuiSpacer />
            <EuiCodeBlock
              language="html"
              fontSize="m"
              paddingSize="m"
              isCopyable>
              {getSnippet(params.editorProps.code)}
            </EuiCodeBlock>
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
