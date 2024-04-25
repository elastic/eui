import React from 'react';

import { EuiMark } from '../../../../../src';
import { ThemeExample } from '../_components/_theme_example';

export default () => (
  <>
    <ThemeExample
      title={<code>.eui-textLeft</code>}
      type="className"
      description={
        <p>
          Changes the element’s text alignment to the left/starting side of its
          container.
        </p>
      }
      example={
        <div className="eui-textLeft">
          <EuiMark>Left align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textLeft">
  /* Your content */
</div>`}
    />

    <ThemeExample
      title={<code>.eui-textCenter</code>}
      type="className"
      description={
        <p>
          Changes the element’s text alignment to the center of its container.
        </p>
      }
      example={
        <div className="eui-textCenter">
          <EuiMark>Center align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textCenter">
  /* Your content */
</div>`}
    />

    <ThemeExample
      title={<code>.eui-textRight</code>}
      type="className"
      description={
        <p>
          Changes the element’s text alignment to the right/ending side of its
          container.
        </p>
      }
      example={
        <div className="eui-textRight">
          <EuiMark>Right align text</EuiMark>
        </div>
      }
      snippet={`<div className="eui-textRight">
  /* Your content */
</div>`}
    />
  </>
);
