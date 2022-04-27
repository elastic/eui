import React from 'react';

import { EuiCode, euiPaddingStyles, useEuiPadding } from '../../../../src';
import { useEuiTheme } from '../../../../src/services';
import { UtilityClassesSection } from './utility_classes_section';

export default () => {
  const euiTheme = useEuiTheme();

  return (
    <>
      <UtilityClassesSection
        code="euiPaddingStyles(euiTheme, side?)"
        description={
          <p>
            Returns an object of the available sizing keys containing the css
            string of the logical CSS property version for the given{' '}
            <EuiCode language="sass">side</EuiCode>.
          </p>
        }
        example={
          <p
            css={[
              `background: ${euiTheme.euiTheme.colors.lightShade}`,
              euiPaddingStyles(euiTheme).l,
            ]}
          >
            <code>{euiPaddingStyles(euiTheme).l}</code>
          </p>
        }
        snippet={`<span css={[euiPaddingStyles(euiTheme, 'left').l]}>
  /* Your content */
</span>`}
      />

      <UtilityClassesSection
        code="useEuiPadding(size, side?)"
        description={
          <p>
            Returns the logical CSS property version for the given{' '}
            <EuiCode language="sass">side</EuiCode> and the value for the given{' '}
            <EuiCode>size</EuiCode>.
          </p>
        }
        example={
          <p
            css={[
              `background: ${euiTheme.euiTheme.colors.lightShade}`,
              useEuiPadding('l'),
            ]}
          >
            <code>{useEuiPadding('l')}</code>
          </p>
        }
        snippet={`<span css={[useEuiPadding('l')]}>
  /* Your content */
</span>`}
      />
    </>
  );
};
