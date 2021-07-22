import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { useEuiTheme } from '../../../../src/services';

import {
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiCode,
  EuiLink,
  EuiTabbedContent,
} from '../../../../src/components';

import {
  fontWeight,
  fontScale,
} from '../../../../src/global_styling/variables/_typography';

import { ThemeValue } from './_values';
import { ThemeSection } from './_theme_section';

import {
  getPropsFromThemeKey,
  EuiThemeFontBase,
  EuiThemeFontWeight,
  EuiThemeFontScale,
} from './_props';

import { useDebouncedUpdate } from './hooks';

const weightKeys = Object.keys(fontWeight);
const scaleKeys = Object.keys(fontScale);

export default ({ onThemeUpdate }) => {
  const { euiTheme } = useEuiTheme();
  const font = euiTheme.font;

  const [fontClone, updateFont] = useDebouncedUpdate({
    property: 'font',
    value: font,
    onUpdate: onThemeUpdate,
  });
  const [scaleClone, updateScale] = useDebouncedUpdate({
    property: ['font', 'scale'],
    value: font,
    onUpdate: onThemeUpdate,
  });
  const [weightClone, updateWeight] = useDebouncedUpdate({
    property: ['font', 'weight'],
    value: font,
    onUpdate: onThemeUpdate,
  });

  const baseProps = getPropsFromThemeKey(EuiThemeFontBase);
  const weightProps = getPropsFromThemeKey(EuiThemeFontWeight);
  const scaleProps = getPropsFromThemeKey(EuiThemeFontScale);

  const fontFamilies = font.family.split(',');
  const codeFontFamilies = font.familyCode.split(',');

  return (
    <div>
      <EuiText>
        <h2>Typography</h2>
        <p>
          The typography specific theme keys start with the{' '}
          <EuiCode>font</EuiCode> key.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiTabbedContent
        tabs={[
          {
            id: 'themeTypographyTabValues',
            name: 'Values',
            content: (
              <>
                <EuiSpacer />

                <ThemeSection
                  code="_EuiThemeFontBase"
                  description={
                    <>
                      <p>
                        The base font settings determine things like{' '}
                        <EuiCode>family</EuiCode> and{' '}
                        <EuiCode>featureSettings</EuiCode>.
                      </p>
                      <p>
                        The <EuiCode>lineHeightMultiplier</EuiCode> established
                        the line-height in percentages compared to the
                        font-size, but it is the <EuiCode>baseline</EuiCode>{' '}
                        integer that establishes the final pixel/rem value by
                        ensuring it falls on a multiplier of this baseline.
                      </p>
                    </>
                  }
                  property="font"
                  themeValues={
                    <>
                      <EuiFlexItem>
                        <ThemeValue
                          property={'font'}
                          type={baseProps.family}
                          name={'family'}
                          // value={fontFamilies[0]}
                          // onUpdate={(value) => updateFont('family', value)}
                        />
                        <EuiSpacer size="s" />
                        {/* The loop below renders each font family applied to a span. */}
                        <EuiText size="s" color="subdued" textAlign="right">
                          {fontFamilies.map((family, i) => (
                            <span
                              key={family}
                              css={css`
                                font-family: ${family};
                              `}>
                              {family}
                              {i < fontFamilies.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <ThemeValue
                          property={'font'}
                          type={baseProps.familyCode}
                          name={'familyCode'}
                          // value={codeFontFamilies[0]}
                          // onUpdate={(value) => updateFont('familyCode', value)}
                        />
                        <EuiSpacer size="s" />
                        {/* The loop below renders each font family applied to a span. */}
                        <EuiText size="s" color="subdued" textAlign="right">
                          {codeFontFamilies.map((family, i) => (
                            <span
                              key={family}
                              css={css`
                                font-family: ${family};
                              `}>
                              {family}
                              {i < codeFontFamilies.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <ThemeValue
                          property={'font'}
                          type={baseProps.featureSettings}
                          name={'featureSettings'}
                        />
                        <EuiSpacer size="s" />
                        <EuiText size="s" color="subdued" textAlign="right">
                          <code>{font.featureSettings}</code>
                        </EuiText>
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <ThemeValue
                          property={'font'}
                          type={baseProps.baseline}
                          name={'baseline'}
                          value={fontClone.baseline}
                          onUpdate={(value) => updateFont('baseline', value)}
                        />
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <ThemeValue
                          property={'font'}
                          type={baseProps.lineHeightMultiplier}
                          name={'lineHeightMultiplier'}
                          value={font.lineHeightMultiplier}
                          onUpdate={(value) =>
                            updateFont('lineHeightMultiplier', value)
                          }
                          numberProps={{ step: 0.1 }}
                        />
                      </EuiFlexItem>
                    </>
                  }
                />

                <EuiSpacer size="xxl" />

                <ThemeSection
                  code="_EuiThemeFontWeight"
                  description={
                    <>
                      <p>
                        Matches up colloqual weight names with their appropriate
                        number values.
                      </p>
                      <p>
                        These default weights are what is manually pulled from
                        Google fonts. If you intend to change these numbers,
                        switch to a variable font or change your font import to
                        include those you&apos;ve selected.
                      </p>
                    </>
                  }
                  property="font"
                  themeValues={weightKeys.map((key) => (
                    <EuiFlexItem key={key}>
                      <ThemeValue
                        property="font.weight"
                        type={weightProps[key]}
                        name={key}
                        value={weightClone.weight[key]}
                        buttonStyle={css`
                          font-weight: ${weightClone.weight[key]};
                        `}
                        example={'Aa'}
                        groupProps={{ alignItems: 'center' }}
                        onUpdate={(value) => updateWeight(key, value)}
                        numberProps={{ step: 10 }}
                      />
                    </EuiFlexItem>
                  ))}
                />

                <EuiSpacer size="xxl" />

                <ThemeSection
                  code="_EuiThemeFontScale"
                  description={
                    <>
                      <p>
                        The typographic scale that is used to calculate the font
                        size variables. These are multipliers applied the{' '}
                        <EuiCode>euiTheme.base</EuiCode> value.
                      </p>
                      <p>
                        The default scale is loosely based on the{' '}
                        <EuiLink href="https://type-scale.com/?size=16&scale=1.250&text=A%20Visual%20Type%20Scale&font=Inter&fontweight=400&bodyfont=body_font_default&bodyfontweight=400&lineheight=1.75&backgroundcolor=%23ffffff&fontcolor=%23000000&preview=false">
                          Major Third (1.250) typographic scale
                        </EuiLink>
                        .
                      </p>
                      <p>
                        You do not want to consume this scale directly. Instead,
                        you will want to use the calculated font sizing keys
                        such as <EuiCode>font.s</EuiCode> or{' '}
                        <EuiCode>font.s.fontSize</EuiCode>. See the{' '}
                        <strong>Usage</strong> tab for more details.
                      </p>
                    </>
                  }
                  property="font"
                  themeValues={scaleKeys.map((key) => (
                    <EuiFlexItem key={key}>
                      <ThemeValue
                        property="font.scale"
                        type={scaleProps[key]}
                        name={key}
                        value={scaleClone.scale[key]}
                        buttonStyle={css`
                          font-size: ${scaleClone.scale[key] * euiTheme.base}px;
                          min-width: calc(${euiTheme.size.xxl} * 3);
                          text-align: left;
                        `}
                        example={`${scaleClone.scale[key] * euiTheme.base}px`}
                        onUpdate={(value) => updateScale(key, value)}
                        numberProps={{ step: 0.1, style: { width: '6em' } }}
                        groupProps={{ alignItems: 'center' }}
                      />
                    </EuiFlexItem>
                  ))}
                />
              </>
            ),
          },
          {
            id: 'themeTypographyTabUsage',
            name: 'Usage',
            content: (
              <>
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.font[]"
                  description={
                    <p>
                      All of EUI defaults to this base font family. However, you
                      can use it to override a custom component that is not
                      inheriting this family.
                    </p>
                  }
                  example={
                    <code
                      css={css`
                        font-family: ${euiTheme.font.family};
                      `}>
                      {'I am a code element forced to default font family'}
                    </code>
                  }
                  snippet={'font-family: ${euiTheme.font.family};'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.font.weight[]"
                  description={
                    <p>
                      To maintain consistency, EUI established the font weight
                      patterns directly in the text and title components.
                      However, we recommend using the theme keys instead of
                      `font-weight: bold` in your css to ensure proper alignment
                      with the imported font family.
                    </p>
                  }
                  example={
                    <div
                      css={css`
                        font-weight: ${euiTheme.font.weight.bold};
                      `}>
                      {'I am proper bold'}
                    </div>
                  }
                  snippet={'font-weight: ${euiTheme.font.weight.bold};'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.font[size]"
                  description={
                    <>
                      <p>
                        To ensure proper baseline alignment and readable
                        line-height, the theme&apos;s font sizing keys come with
                        both font-size <strong>and</strong> line-height. Because
                        of this, we recommend the array approach to applying
                        with Emotion.
                      </p>
                      <p>
                        While this works well, we still recommend using the{' '}
                        <Link to="/display/text">
                          <strong>EuiText</strong>
                        </Link>{' '}
                        component directly and sticking to the sizing props
                        provided.
                      </p>
                    </>
                  }
                  example={
                    <div css={[euiTheme.font.s]}>
                      <p>
                        Orbiting this at a distance of roughly ninety-two
                        million miles is an utterly insignificant little blue
                        green planet whose ape- descended life forms are so
                        amazingly primitive that they still think digital
                        watches are a pretty neat idea.
                      </p>
                    </div>
                  }
                  customSnippet={'css={[euiTheme.font.s]}'}
                />
                <EuiSpacer />
                <ThemeSection
                  code="euiTheme.font[size].fontSize"
                  description={
                    <>
                      <p>
                        You can still grab just the font-size value if need be.
                      </p>
                    </>
                  }
                  example={
                    <div
                      css={css`
                        font-size: ${euiTheme.font.s.fontSize};
                      `}>
                      <p>
                        Orbiting this at a distance of roughly ninety-two
                        million miles is an utterly insignificant little blue
                        green planet whose ape- descended life forms are so
                        amazingly primitive that they still think digital
                        watches are a pretty neat idea.
                      </p>
                    </div>
                  }
                  snippet={'font-size: ${euiTheme.font.s.fontSize};'}
                />
                <EuiSpacer />
              </>
            ),
          },
        ]}
      />
    </div>
  );
};
