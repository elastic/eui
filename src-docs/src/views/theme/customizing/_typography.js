import React from 'react';
import { css } from '@emotion/react';

import {
  useEuiTheme,
  EuiText,
  EuiSpacer,
  EuiCode,
  EuiPanel,
  EuiTitle,
  logicalCSS,
  logicalTextAlignCSS,
} from '../../../../../src';

import {
  fontWeight,
  fontScale,
} from '../../../../../src/themes/amsterdam/global_styling/variables/_typography';

import { getPropsFromComponent } from '../../../services/props/get_props';
import { ThemeValue } from './_values';

import {
  EuiThemeFontBase,
  EuiThemeFontWeight,
  EuiThemeFontScale,
  EuiThemeBody,
} from '../_props';

import { useDebouncedUpdate } from '../hooks';

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

  const baseProps = getPropsFromComponent(EuiThemeFontBase);
  const weightProps = getPropsFromComponent(EuiThemeFontWeight);
  const scaleProps = getPropsFromComponent(EuiThemeFontScale);
  const bodyProps = getPropsFromComponent(EuiThemeBody);

  const fontFamilies = fontClone.family.split(',');
  const codeFontFamilies = fontClone.familyCode.split(',');
  const serifFontFamilies = fontClone.familySerif.split(',');

  return (
    <div>
      <EuiText>
        <h2>
          Typography &emsp;
          <small>
            <code>EuiThemeFont</code>
          </small>
        </h2>
      </EuiText>
      <EuiSpacer size="l" />
      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeFontBase</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            The font stacks contain progressive fallbacks dependent on
            availability of the families. We encourage only customizing the
            first family of the font stacks.
          </p>
        </EuiText>

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.family}
          name={'family'}
          value={fontFamilies[0]}
          onUpdate={(value) => {
            const out = [...fontFamilies];
            out.splice(0, 1, value);
            updateFont('family', out.join(','));
          }}
          stringProps={{
            style: { width: 200 },
          }}
        />

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.familyCode}
          name={'familyCode'}
          value={codeFontFamilies[0]}
          onUpdate={(value) => {
            const out = [...codeFontFamilies];
            out.splice(0, 1, value);
            updateFont('familyCode', out.join(','));
          }}
          stringProps={{
            style: { width: 200 },
          }}
        />

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.familySerif}
          name={'familySerif'}
          value={serifFontFamilies[0]}
          onUpdate={(value) => {
            const out = [...serifFontFamilies];
            out.splice(0, 1, value);
            updateFont('familySerif', out.join(','));
          }}
          stringProps={{
            style: { width: 200 },
          }}
        />

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.featureSettings}
          value={font.featureSettings}
          name={'featureSettings'}
          onUpdate={(value) => updateFont('featureSettings', value)}
          stringProps={{
            style: { width: 200 },
          }}
        />

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.baseline}
          name={'baseline'}
          value={fontClone.baseline}
          onUpdate={(value) => updateFont('baseline', value)}
        />

        <EuiSpacer />

        <ThemeValue
          property={'font'}
          type={baseProps.lineHeightMultiplier}
          name={'lineHeightMultiplier'}
          value={font.lineHeightMultiplier}
          onUpdate={(value) => updateFont('lineHeightMultiplier', value)}
          numberProps={{ step: 0.1 }}
        />
      </EuiPanel>

      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeFontWeight</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            These default weights are what is manually pulled from Google fonts.
            If you intend to change these numbers, switch to a variable font or
            change your font import to include those you&apos;ve selected.
          </p>
        </EuiText>

        <EuiSpacer />

        {weightKeys.map((key) => (
          <ThemeValue
            key={key}
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
        ))}
      </EuiPanel>

      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeFontScale</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            This typographic scale is used to calculate the font sizes which are
            multiplied against the <EuiCode>base</EuiCode> value and converted
            to pixel and/or rem values.
          </p>
        </EuiText>

        <EuiSpacer />

        {scaleKeys.map((key) => (
          <ThemeValue
            key={key}
            property="font.scale"
            type={scaleProps[key]}
            name={key}
            value={scaleClone.scale[key]}
            buttonStyle={css`
              font-size: ${scaleClone.scale[key] * euiTheme.base}px;
              ${logicalCSS(
                'min-width',
                `${parseFloat(euiTheme.size.xxl) * 3}px`
              )}
              ${logicalTextAlignCSS('left')}
            `}
            example={`${scaleClone.scale[key] * euiTheme.base}px`}
            onUpdate={(value) => updateScale(key, value)}
            numberProps={{ step: 0.1, style: { width: '6em' } }}
            groupProps={{ alignItems: 'center' }}
          />
        ))}
      </EuiPanel>

      <EuiSpacer size="xl" />

      <EuiPanel color="subdued">
        <EuiTitle size="xs">
          <h3>
            <code>_EuiThemeFontBody</code>
          </h3>
        </EuiTitle>
        <EuiSpacer size="s" />
        <EuiText size="s" grow={false}>
          <p>
            The <EuiCode>body.scale</EuiCode> value determines the base
            font-size at which every font-size is calculated against.
          </p>
        </EuiText>

        <EuiSpacer />

        <ThemeValue
          property="font.body"
          type={bodyProps.scale}
          name={'scale'}
          value={fontClone.body.scale}
          buttonStyle={css`
            font-size: ${scaleClone.scale[fontClone.body.scale] *
            euiTheme.base}px;
            ${logicalCSS('min-width', `${parseFloat(euiTheme.size.xxl) * 3}px`)}
            ${logicalTextAlignCSS('left')}
          `}
          example={`${
            scaleClone.scale[fontClone.body.scale] * euiTheme.base
          }px`}
          groupProps={{ alignItems: 'center' }}
        />
        <EuiSpacer />

        <ThemeValue
          property="font.body"
          type={bodyProps.weight}
          name={'weight'}
          value={fontClone.body.weight}
          buttonStyle={css`
            font-weight: ${weightClone.weight[fontClone.body.weight]};
            ${logicalCSS('min-width', `${parseFloat(euiTheme.size.xxl) * 3}px`)}
            ${logicalTextAlignCSS('left')}
          `}
          example={weightClone.weight[fontClone.body.weight]}
          groupProps={{ alignItems: 'center' }}
        />
      </EuiPanel>
    </div>
  );
};
