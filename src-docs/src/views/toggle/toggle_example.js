import React from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiToggle, EuiCallOut } from '../../../../src/components';

import Toggle from './toggle';
const toggleSource = require('!!raw-loader!./toggle');
const toggleHtml = renderToHtml(Toggle);

export const ToggleExample = {
  title: 'Toggle',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toggleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toggleHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>EuiToggle</EuiCode> component is a very simplified
            utility for creating toggle-able elements. There is only an on/off
            (checked/unchecked) state. All this creates is a visibly hidden
            input (checkbox or radio) overtop of the children provided.
          </p>
          <p>
            By default, the children will be wrapped in a block element. To
            change the display you can simply use one of the{' '}
            <Link to="/utilities/css-utility-classes">utility classes</Link>{' '}
            like <EuiCode>.eui-displayInlineBlock</EuiCode>.
          </p>
          <EuiCallOut title="Accessibility">
            <p>
              This utility is just a helper component and comes with no inherit
              styles including no <EuiCode>:hover</EuiCode> or{' '}
              <EuiCode>:focus</EuiCode> states. If you use this utility
              directly, be sure to add these states. Otherwise, you may just
              want to utilize the{' '}
              <Link to="/navigation/button">EuiButtonToggle</Link> component.
            </p>
          </EuiCallOut>
        </div>
      ),
      components: { EuiToggle },
      demo: <Toggle />,
      props: { EuiToggle },
    },
  ],
};
