import React from 'react';

import { EuiCode, EuiSpacer } from '../../../../src/components';
import { EuiMark } from '../../../../src/components/mark';
import { UtilityClassesSection } from './utility_classes_section';

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.25)',
};

export default () => (
  <>
    <UtilityClassesSection
      code="eui-displayBlock"
      description={
        <p>
          Changes the element’s display property to{' '}
          <EuiCode language="sass">display: block;</EuiCode>
        </p>
      }
      example={
        <EuiMark style={wrappingExampleStyle} className="eui-displayBlock">
          Displaying block
        </EuiMark>
      }
      snippet={`<span className="eui-displayBlock">
  /* Your content */
</span>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-displayInline"
      description={
        <p>
          Changes the element’s display property to{' '}
          <EuiCode language="sass">display: inline;</EuiCode>
        </p>
      }
      example={
        <EuiMark style={wrappingExampleStyle} className="eui-displayInline">
          Displaying inline
        </EuiMark>
      }
      snippet={`<div className="eui-displayInline">
  /* Your content */
</div>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-displayInlineBlock"
      description={
        <p>
          Changes the element’s display property to{' '}
          <EuiCode language="sass">display: inline-block;</EuiCode>
        </p>
      }
      example={
        <EuiMark
          style={wrappingExampleStyle}
          className="eui-displayInlineBlock"
        >
          Displaying inline block
        </EuiMark>
      }
      snippet={`<span className="eui-displayInlineBlock">
  /* Your content */
</span>`}
    />
    <EuiSpacer />
    <UtilityClassesSection
      code="eui-fullWidth"
      description={
        <p>
          Changes the element’s display property to{' '}
          <EuiCode language="sass">display: inline-block;</EuiCode> and adds{' '}
          <EuiCode language="sass">width: 100%;</EuiCode>
        </p>
      }
      example={
        <EuiMark style={wrappingExampleStyle} className="eui-fullWidth">
          Displaying full width
        </EuiMark>
      }
      snippet={`<span className="eui-fullWidth">
  /* Your content */
</span>`}
    />
  </>
);
