import React, { useContext } from 'react';

import { ThemeContext } from '../../components/with_theme';

import { EuiPanel, EuiCode } from '../../../../src';
import { ThemeExample } from '../theme/_components/_theme_example';

const maxWidth = 300;
const longLink =
  'http://www.hithereimalongurl.com/dave_will_just_ramble_on_in_a_long_sentence_like_this/?ok=cool';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      <ThemeExample
        title={<code>.eui-textNoWrap</code>}
        description={<p>Forces text not to wrap even in small containers.</p>}
        example={
          <EuiPanel
            color="warning"
            style={{ maxWidth }}
            className="eui-textNoWrap"
          >
            This text will not to wrap but extend beyond the boundaries of the
            yellow box.
          </EuiPanel>
        }
        snippet={`<div className="eui-textNoWrap">
  /* Your content */
</div>`}
      />

      <ThemeExample
        title={<code>.eui-textTruncate</code>}
        description={
          <>
            <p>
              Truncates text at 100% width of its parent and will display an
              ellipsis.
            </p>
            <p>
              <strong>Tip:</strong> When truncating text, it is recommended to
              include the full text within an HTML <EuiCode>title</EuiCode>{' '}
              attribute or by wrapping the element within an{' '}
              <strong>EuiToolTip</strong>.
            </p>
          </>
        }
        example={
          <EuiPanel
            color="warning"
            style={{ maxWidth }}
            className="eui-textTruncate"
          >
            This text will not to wrap but truncate beyond the boundaries of the
            yellow box.
          </EuiPanel>
        }
        snippet={`<div
  className="eui-textTruncate"
  title={Your content}>
  /* Your content */
</div>`}
      />
      {/* Mixin */}
      {!showSass ? (
        <ThemeExample
          title={<code>euiTextTruncate()</code>}
          description={
            <>
              <p>
                Use this style function to apply{' '}
                <EuiCode>.eui-textTruncate</EuiCode> within your CSS-in-JS
                styling.
              </p>
              <p>
                This utility accepts a single optional parameter for customizing
                the width of the truncated text. If not passed, it defaults to{' '}
                <EuiCode language="css">max-width: 100%;</EuiCode>.
              </p>
            </>
          }
          snippet={`\${euiTextTruncate()}
  \${euiTextTruncate('150px')}`}
          snippetLanguage="emotion"
        />
      ) : (
        <ThemeExample
          title={<code>Mixin</code>}
          description={
            <p>
              Use this Sass mixin to apply <EuiCode>.eui-textTruncate</EuiCode>{' '}
              within your classes. No parameters are taken for this utility.
            </p>
          }
          snippet={'@include euiTextTruncate;'}
          snippetLanguage="scss"
        />
      )}

      <ThemeExample
        title={<code>.eui-textBreakWord</code>}
        description={
          <p>
            Wraps the text across lines like normal, but forces long words like
            URLs to break.
          </p>
        }
        example={
          <EuiPanel
            color="warning"
            style={{ maxWidth }}
            className="eui-textBreakWord"
          >
            This text will wrap like normal but this long link {longLink} will
            break mid-word.
          </EuiPanel>
        }
        snippet={`<div
  className="eui-textTruncate"
  title={Your content}>
  /* Your content */
</div>`}
      />
      {/* Mixin */}
      {!showSass ? (
        <ThemeExample
          title={<code>euiTextBreakWord()</code>}
          description={
            <p>
              Use this style function to apply{' '}
              <EuiCode>.eui-textBreakWord</EuiCode> within your CSS-in-JS
              styling. No parameters are taken for this utility.
            </p>
          }
          snippet={'${euiTextBreakWord()}'}
          snippetLanguage="emotion"
        />
      ) : (
        <ThemeExample
          title={<code>Mixin</code>}
          description={
            <p>
              Use this Sass mixin to apply <EuiCode>.eui-textBreakWord</EuiCode>{' '}
              within your classes. No parameters are taken for this utility.
            </p>
          }
          snippet={'@include euiTextBreakWord;'}
          snippetLanguage="scss"
        />
      )}

      <ThemeExample
        title={<code>.eui-textBreakAll</code>}
        description={
          <p>
            Wraps the text across lines always forcing the last word on the line
            to break.
          </p>
        }
        example={
          <EuiPanel
            color="warning"
            style={{ maxWidth }}
            className="eui-textBreakAll"
          >
            This text block will wrap, breaking up anything including long URLs{' '}
            {longLink} and run on strings like this
            --------------------------------------------------------------------------.
          </EuiPanel>
        }
        snippet={`<div className="eui-textBreakAll">
  /* Your content */
</div>`}
      />

      <ThemeExample
        title={<code>.eui-textBreakNormal</code>}
        description={
          <p>
            Reverts the text back to the normal wrapping scheme of not forcing
            word breaks.
          </p>
        }
        example={
          <EuiPanel
            color="warning"
            style={{ maxWidth }}
            className="eui-textBreakNormal"
          >
            This text block will wrap normally, but will not break long URLs{' '}
            {longLink} but may break run on strings like this
            ---------------------------------------------------------------.
          </EuiPanel>
        }
        snippet={`<div className="eui-textBreakNormal">
  /* Your content */
</div>`}
      />
    </>
  );
};
