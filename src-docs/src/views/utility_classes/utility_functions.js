import React from 'react';

import { EuiCode } from '../../../../src';
import { UtilityClassesSection } from './utility_classes_section';

export default () => (
  <>
    <UtilityClassesSection
      code="logicalCSS()"
      description={
        <p>
          Returns the logical CSS property version for the given{' '}
          <EuiCode language="sass">side</EuiCode>
        </p>
      }
      // example={
      //   <EuiCode css={[logicalCSS('margin', 'left', '16px')]}>
      //     css[logicalCSS('margin', 'left', '16px')]
      //   </EuiCode>
      // }
      snippet={`<span css={[logicalCSS('margin', 'left', '16px')]}>
  /* Your content */
</span>`}
    />

    <UtilityClassesSection
      code="logicalProperty()"
      description={
        <p>
          Returns the logical side for the given{' '}
          <EuiCode language="sass">side</EuiCode>
        </p>
      }
      // example={
      //   <EuiCode
      //     css={css`
      //     margin-${logicalProperty('left')}: 16px;
      //   `}
      //   >
      //     csslogicalCSS('padding', 'left', '16px')
      //   </EuiCode>
      // }
      snippet={`<span
  css={css\`
    margin-\${logicalProperty('left')}: 16px;
  \`}
>
  /* Your content */
</span>`}
    />

    <UtilityClassesSection
      code="logicals{} map"
      description={
        <p>
          Returns the logical side for the given{' '}
          <EuiCode language="sass">side</EuiCode>
        </p>
      }
      // example={
      //   <EuiCode
      //     css={css`
      //     margin-${logicals.left}: 16px;
      //   `}
      //   >
      //     csslogicalCSS('padding', 'left', '16px')
      //   </EuiCode>
      // }
      snippet={`<span
  css={css\`
    margin-\${logicals.left}: 16px;
  \`}
>
  /* Your content */
</span>`}
    />
  </>
);
