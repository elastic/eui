import React from 'react';

import { EuiCode, EuiMark } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => (
  <>
    <ThemeExample
      title={<code>.eui-textLeft</code>}
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: left;</EuiCode>
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
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: center;</EuiCode>
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
      description={
        <p>
          Changes the element’s text alignment property to{' '}
          <EuiCode language="sass">text-align: right;</EuiCode>
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
