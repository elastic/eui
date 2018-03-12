import React, {
  Fragment,
} from 'react';
import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss'
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss'
import { calculateContrast } from '../../../../src/services/color/luminance_and_contrast'

import {
  Link,
} from 'react-router';

import {
  GuidePage,
  GuideRule,
  GuideRuleTitle,
  GuideRuleExample
} from '../../components';

import {
  EuiText,
  EuiButton,
  EuiButtonIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiIcon,
  EuiImage,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiHorizontalRule,
  EuiBadge,
  EuiPanel,
  EuiToolTip,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiLink,
} from '../../../../src/components';

const allowedColors = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorWarning',
  'euiColorDanger',
  'euiColorAccent',
]

export default() => (
  <GuidePage title="Color guidelines">
    <EuiText>
      <h2>Accessible text contrast</h2>
      <p>
        <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
          WCAG specifications
        </EuiLink> defines specific contrast ratios between forground text and a background color.
        The grid below displays which color combinations pass that rating. In general you sould try to use
        a color combination that is <EuiBadge color="#333">AA</EuiBadge> or above except when using
        large text.
      </p>
      <h3>Rating definitions</h3>
      <ul>
        <li>
          <EuiBadge color="#000">AAA</EuiBadge>{' '}
          Passes with a contrast of 7+
        </li>
        <li>
          <EuiBadge color="#333">AA</EuiBadge>{' '}
          Passes with a contrast of 4.5+
        </li>
        <li>
          <EuiBadge color="#666">AA18</EuiBadge>{' '}
          Passes with a contrast of 3+, but only if the text displayed is 18px or larger
        </li>
      </ul>
    </EuiText>

    <EuiHorizontalRule />

    <div>
      {allowedColors.map(function(color, index) {
         return (
           <Fragment>
             <EuiFlexGroup gutterSize="none">
              {allowedColors.map(function(color2, index) {
                const contrast = (
                  calculateContrast(
                    [lightColors[color].r, lightColors[color].g, lightColors[color].b],
                    [lightColors[color2].r, lightColors[color2].g, lightColors[color2].b],
                  )
                );

                let contrastRating;
                if (contrast > 7) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      <EuiBadge color="#000">AAA</EuiBadge>
                    </div>
                  );
                } else if (contrast > 4.5) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      <EuiBadge color="#333">AA</EuiBadge>
                    </div>
                  );
                } else if (contrast > 3) {
                  contrastRating = (
                    <div>
                      <EuiSpacer size="xs" />
                      <EuiBadge color="#666">AA18</EuiBadge>
                    </div>
                  );
                }

                return (
                  <EuiFlexItem key={index} style={{ minHeight: 64, textAlign: 'center' }}>
                    <EuiToolTip
                      title={`Contrast is ${contrast.toFixed(1)}`}
                      content={
                        <EuiDescriptionList>
                          <EuiDescriptionListTitle>
                            Text
                          </EuiDescriptionListTitle>
                          <EuiDescriptionListDescription>
                            <EuiFlexGroup alignItems="center" gutterSize="s">
                              <EuiFlexItem grow={false}>
                                <div style={{ height: 12, width: 12, borderRadius: '50%', background: lightColors[color2].rgba }} />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false} style={{ color: 'white' }}>
                                {color2}
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          </EuiDescriptionListDescription>
                          <EuiDescriptionListTitle>
                            Background
                          </EuiDescriptionListTitle>
                          <EuiDescriptionListDescription>
                            <EuiFlexGroup alignItems="center" gutterSize="s">
                              <EuiFlexItem grow={false}>
                                <div style={{ height: 12, width: 12, borderRadius: '50%', background: lightColors[color].rgba }} />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false} style={{ color: 'white' }}>
                                {color}
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          </EuiDescriptionListDescription>
                        </EuiDescriptionList>
                      }
                    >
                      <div>
                        <div style={{ color: lightColors[color2].rgba, backgroundColor: lightColors[color].rgba, padding: 4 }}>
                          <div>Text</div>
                        </div>
                        {contrastRating}
                      </div>
                    </EuiToolTip>
                  </EuiFlexItem>
                );
              })}
             </EuiFlexGroup>
             <EuiSpacer />
           </Fragment>
         );
       })}
    </div>
  </GuidePage>
);
