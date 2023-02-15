const dedent = require('dedent');
const { renderJsSourceCode } = require('./_utils.js');

describe('renderJsSourceCode', () => {
  describe('EUI imports', () => {
    it('automatically converts relative `src` imports to `@elastic/eui`', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiButton } from '../src/components';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`),
        })
      ).toEqual(
        dedent(`
            import { EuiButton } from '@elastic/eui';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`)
      );
    });

    it('combines multiple relative EUI imports into a single absolute import', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiCode } from '../../../src/components/code';
            import { EuiCallOut } from '../../../src/components/callout';
            import { useGeneratedHtmlId } from '../../../src/services';
  
            export default () => <EuiCode>{useGeneratedHtmlId()}</EuiCode>;`),
        })
      ).toEqual(
        dedent(`
            import { EuiCode, EuiCallOut, useGeneratedHtmlId } from '@elastic/eui';
  
            export default () => <EuiCode>{useGeneratedHtmlId()}</EuiCode>;`)
      );
    });

    it('sets each import on a new line if the line would have been longer than 81 characters', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiButton, EuiFlexGroup, EuiFlexItem } from '../../../src/components';
            import { useGeneratedHtmlId } from '../../../src/services';
  
            export default () => <EuiCode>{useGeneratedHtmlId()}</EuiCode>;`),
        })
      ).toEqual(
        dedent(`
            import {
              EuiButton,
              EuiFlexGroup,
              EuiFlexItem,
              useGeneratedHtmlId,
            } from '@elastic/eui';
  
            export default () => <EuiCode>{useGeneratedHtmlId()}</EuiCode>;`)
      );
    });

    it('keeps underscores in Elastic imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EUI_CHARTS_THEME_DARK } from '@elastic/eui';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
          import { EUI_CHARTS_THEME_DARK } from '@elastic/eui';
  
          export default () => 'Hello world!';`)
      );
    });

    it('handles aliased imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiPageTemplate_Deprecated as EuiPageTemplate } from '@elastic/eui';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
          import { EuiPageTemplate_Deprecated as EuiPageTemplate } from '@elastic/eui';
  
          export default () => 'Hello world!';`)
      );
    });
  });

  describe('React import', () => {
    it('always moves the React import to the top of the file', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiButton } from '../../src/components';
            import React, { useState } from 'react';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`),
        })
      ).toEqual(
        dedent(`
            import React, { useState } from 'react';
            import { EuiButton } from '@elastic/eui';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`)
      );
    });
  });

  describe('remaining imports', () => {
    it('moves all remaining imports below React/EUI but otherwise leaves them intact', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { css } from '@emotion/react';
            import classNames from 'classnames';
            import React, { useState } from 'react';
            import { EuiButton } from '../../src/components';
            import { data } from '../data_store';
            import mockDepA from 'fake-dep';
            import mockDepB from 'fake_dep';
            import mockDepC from 'fake.dep';
            import {
              _mockDepMultiline,
              mockDepMultiline,
            } from 'fakeDep000';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`),
        })
      ).toEqual(
        dedent(`
            import React, { useState } from 'react';
            import { EuiButton } from '@elastic/eui';
            import { css } from '@emotion/react';
            import classNames from 'classnames';
            import { data } from '../data_store';
            import mockDepA from 'fake-dep';
            import mockDepB from 'fake_dep';
            import mockDepC from 'fake.dep';
            import {
              _mockDepMultiline,
              mockDepMultiline,
            } from 'fakeDep000';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`)
      );
    });

    it('keeps // comments preceding an import line together with its import', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React, { useState } from 'react';
            import { EuiButton } from '@elastic/eui';
            // @ts-ignore no types definitions
            import hello from 'world';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`),
        })
      ).toEqual(
        dedent(`
            import React, { useState } from 'react';
            import { EuiButton } from '@elastic/eui';
            // @ts-ignore no types definitions
            import hello from 'world';

            export default () => <EuiButton>Hello world!</EuiButton>;`)
      );
    });
  });

  describe('newline behavior', () => {
    it('normalizes newlines between all imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React, { useState } from 'react';
  
            import { EuiButton } from '../../src/components';
  
            import { useGeneratedHtmlId } from '../../../src/services';
  
            import hello from 'world';
  
            import { data } from '../data_store';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`),
        })
      ).toEqual(
        dedent(`
            import React, { useState } from 'react';
            import { EuiButton, useGeneratedHtmlId } from '@elastic/eui';
            import hello from 'world';
            import { data } from '../data_store';
  
            export default () => <EuiButton>Hello world!</EuiButton>;`)
      );
    });
  });

  describe('import permutations', () => {
    // These seem dumb but are here primarily to catch newline regressions

    it('handles only EUI imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { EuiButton } from '@elastic/eui';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import { EuiButton } from '@elastic/eui';
  
            export default () => 'Hello world!';`)
      );
    });

    it('handles only React imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React from 'react';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import React from 'react';
  
            export default () => 'Hello world!';`)
      );
    });

    it('handles only non-React/EUI imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import hello from 'world';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import hello from 'world';
  
            export default () => 'Hello world!';`)
      );
    });

    it('handles code with no EUI imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React from 'react';
            import hello from 'world';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import React from 'react';
            import hello from 'world';
  
            export default () => 'Hello world!';`)
      );
    });

    it('handles code with no React imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import { is } from '@elastic/eui';
            import hello from 'world';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import { is } from '@elastic/eui';
            import hello from 'world';
  
            export default () => 'Hello world!';`)
      );
    });

    it('handles code with no non-EUI/React imports', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React, {
              useState,
            } from 'react';
            import {
              EuiButton,
              EuiCode,
            } from '@elastic/eui';
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
          import React, {
            useState,
          } from 'react';
          import { EuiButton, EuiCode } from '@elastic/eui';

          export default () => 'Hello world!';`)
      );
    });

    it('does not handle import statements within template literal backticks', () => {
      expect(
        renderJsSourceCode({
          default: dedent(`
            import React from 'react';

            import { v4 } from '@uuid/v4';

            const jsCode = \`/* I'm an example of JS */
            import React from 'react';
            const hello = 'world';\`;
  
            export default () => 'Hello world!';`),
        })
      ).toEqual(
        dedent(`
            import React from 'react';
            import { v4 } from '@uuid/v4';

            const jsCode = \`/* I'm an example of JS */
            import React from 'react';
            const hello = 'world';\`;
  
            export default () => 'Hello world!';`)
      );
    });
  });
});
