import React from 'react';
import { Link } from 'react-router-dom';

import { EuiCode, EuiTextColor } from '../../../../../src';
import { ThemeExample } from '../_components/_theme_example';

export default () => (
  <ThemeExample
    title={<code>.eui-textInheritColor</code>}
    type="className"
    description={
      <>
        <p>Forces the component to inherit its text color from its parent.</p>
        <p>
          For changing the color of your text to on of the named colors,{' '}
          <Link to="/display/text#coloring-text">
            use <strong>EuiText</strong> or <strong>EuiTextColor</strong>
          </Link>
          .
        </p>
      </>
    }
    example={
      <EuiTextColor color="danger">
        <EuiCode className="eui-textInheritColor">I am code</EuiCode> that
        matches the EuiTextColor
      </EuiTextColor>
    }
    snippet={`<EuiTextColor color="danger">
  <EuiCode className="eui-textInheritColor">I am danger code</EuiCode>
</EuiTextColor>`}
  />
);
