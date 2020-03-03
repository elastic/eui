import React from 'react';

import { EuiScreenReaderOnly } from '../../../../src/components/accessibility/screen_reader';
import { EuiCode } from '../../../../src/components/code';
import { EuiText } from '../../../../src/components/text';
import { EuiTitle } from '../../../../src/components/title';

export default () => (
  <div>
    <EuiText>
      <p>
        <em>
          Use a screenreader to verify that there is a second paragraph in this
          example:
        </em>
      </p>
      <p>This is the first paragraph. It is visible to all.</p>
      <EuiScreenReaderOnly>
        <p>
          This is the second paragraph. It is hidden for sighted users but
          visible to screen readers.
        </p>
      </EuiScreenReaderOnly>
      <p>This is the third paragraph. It is visible to all.</p>
      <EuiTitle size="xxs">
        <h4>Show on focus</h4>
      </EuiTitle>
      <p>
        <em>
          In certain cases, such as a <strong>Skip to content</strong> link, you
          can use the <EuiCode>showOnFocus</EuiCode> prop to display
          screenreader content upon focus. For example, tabbing to this section
          with your keyboard will display a link.
        </em>
      </p>
      <p>
        This link is visible to all on focus:{' '}
        <EuiScreenReaderOnly showOnFocus>
          <a href="#">Skip content</a>
        </EuiScreenReaderOnly>
      </p>
    </EuiText>
  </div>
);
