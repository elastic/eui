import React from 'react';

import {
  euiBackgroundColorStyles,
  EuiCode,
  euiPaddingStyles,
  useEuiPadding,
  useEuiBackgroundColor,
} from '../../../../src';
import { useEuiTheme } from '../../../../src/services';
import { UtilityClassesSection } from './utility_classes_section';

export default () => {
  const euiTheme = useEuiTheme();

  return (
    <>
      <UtilityClassesSection
        code="euiBackgroundColorStyles(euiTheme)[color]"
        description={
          <p>
            Returns an object of the available color keys containing the css
            string of the computed background version for the given{' '}
            <EuiCode language="sass">color</EuiCode>.
          </p>
        }
        example={
          <p
            css={[
              euiBackgroundColorStyles(euiTheme).accent,
              euiPaddingStyles(euiTheme).l,
            ]}
          >
            <code>{euiBackgroundColorStyles(euiTheme).accent}</code>
          </p>
        }
        snippet={`const colorStyles = euiBackgroundColorStyles(euiTheme);
const cssStyles = [colorStyles['accent']];

<span css={cssStyles}>
  /* Your content */
</span>`}
      />

      <UtilityClassesSection
        code="useEuiBackgroundColor(color)"
        description={
          <p>
            Returns the background-color CSS property and computed color for the
            given <EuiCode language="sass">color</EuiCode>.
          </p>
        }
        example={
          <p css={[useEuiBackgroundColor('subdued'), useEuiPadding('l')]}>
            <code>{useEuiBackgroundColor('subdued')}</code>
          </p>
        }
        snippet={`<span css={[useEuiBackgroundColor('subdued')]}>
  /* Your content */
</span>`}
      />
    </>
  );
};
