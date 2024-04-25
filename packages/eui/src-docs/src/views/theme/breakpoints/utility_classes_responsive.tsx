import React from 'react';

import { EuiCode, EuiSpacer } from '../../../../../src/components';
import { ThemeExample } from '../_components/_theme_example';

const wrappingExampleStyle = {
  background: 'rgba(254, 228, 181, 0.5)',
};

const wrappingDivExampleStyle = {
  maxWidth: 300,
  padding: 16,
  ...wrappingExampleStyle,
};

export default () => (
  <>
    <ThemeExample
      title={<code>.eui-hideFor--[size]</code>}
      type="className"
      description={
        <>
          <p>
            Hides the element for the specified breakpoint size with
            <EuiCode language="sass">display: none;</EuiCode>. The element will
            still render and exist in the DOM.
          </p>
        </>
      }
      example={
        <>
          <EuiCode className="eui-hideFor--xs">.eui-hideFor--xs</EuiCode>
          <EuiSpacer />
          <EuiCode className="eui-hideFor--s">.eui-hideFor--s</EuiCode>
          <EuiSpacer />
          <EuiCode className="eui-hideFor--m">.eui-hideFor--m</EuiCode>
          <EuiSpacer />
          <EuiCode className="eui-hideFor--l">.eui-hideFor--l</EuiCode>
          <EuiSpacer />
          <EuiCode className="eui-hideFor--xl">.eui-hideFor--xl</EuiCode>
        </>
      }
      snippet={`<span className="eui-hideFor--xs">
  <!-- Your content -->
</span>`}
    />
    <ThemeExample
      title={<code>.eui-showFor--[size]</code>}
      type="className"
      description={
        <>
          <p>
            Shows the element only for the specified breakpoint by applying
            <EuiCode language="sass">display: none;</EuiCode> for all, then
            applying <EuiCode language="sass">display: inline;</EuiCode> when
            within the breakpoint size. The element will still render and exist
            in the DOM.
          </p>
        </>
      }
      example={
        <>
          <EuiCode className="eui-showFor--xs">.eui-showFor--xs</EuiCode>
          <EuiCode className="eui-showFor--s">.eui-showFor--s</EuiCode>
          <EuiCode className="eui-showFor--m">.eui-showFor--m</EuiCode>
          <EuiCode className="eui-showFor--l">.eui-showFor--l</EuiCode>
          <EuiCode className="eui-showFor--xl">.eui-showFor--xl</EuiCode>
        </>
      }
      snippet={`<span className="eui-showFor--xs">
  <!-- Your content -->
</span>`}
    />
    <ThemeExample
      title={<code>.eui-showFor--[size]--[display]</code>}
      type="className"
      description={
        <>
          <p>
            The <EuiCode language="html">eui-showFor--[size]</EuiCode> classes
            will force display of <EuiCode>inline</EuiCode> when showing the
            element. You can modify this display property by appending one of
            the following display properties <EuiCode>block</EuiCode>,{' '}
            <EuiCode>inlineBlock</EuiCode>, or <EuiCode>flex</EuiCode>.
          </p>
        </>
      }
      example={
        <div
          style={{ background: wrappingDivExampleStyle.background }}
          className="eui-showFor--xs eui-showFor--s eui-showFor--m--block eui-showFor--l--inlineBlock eui-showFor--xl--flex"
        >
          <span style={wrappingDivExampleStyle}>span</span>
          <span style={wrappingDivExampleStyle}>span</span>
          <span style={wrappingDivExampleStyle}>span</span>
        </div>
      }
      snippet={`<span className="eui-showFor--xs--flex">
  <!-- Your content -->
</span>`}
    />
  </>
);
