/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import { mathWithUnits, logicalCSS } from '../../global_styling';

export const euiStepVariables = (euiTheme: UseEuiTheme['euiTheme']) => {
  return {
    numberSize: euiTheme.size.xl,
    numberXSSize: euiTheme.size.l,
    numberMargin: euiTheme.size.base,
  };
};

export const euiStepStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  // the vertical line is centered on the number, so we need to offset the line
  // by half of the number size & half of the line size to center it
  const lineStartPosition = mathWithUnits(
    [euiStep.numberSize, euiTheme.border.width.thick],
    (x, y) => x / 2 - y / 2
  );
  const lineEndPosition = mathWithUnits(
    [euiStep.numberSize, euiTheme.border.width.thick],
    (x, y) => x / 2 + y / 2
  );

  const lineGradient = `linear-gradient(to right,
    transparent 0,
    transparent ${lineStartPosition},
    ${euiTheme.border.color} ${lineStartPosition},
    ${euiTheme.border.color} ${lineEndPosition},
    transparent ${lineEndPosition},
    transparent 100%)`;

  return {
    euiStep: css`
      // Create border on all but the last step
      &:not(:last-of-type) {
        background-image: ${lineGradient};
        background-repeat: no-repeat;
      }
    `,
    // Sizes
    m: css`
      &:not(:last-of-type) {
        background-position: left ${euiTheme.size.xl};
      }
    `,
    s: css`
      &:not(:last-of-type) {
        background-position: left ${euiTheme.size.xl};
      }
    `,
    xs: css`
      &:not(:last-of-type) {
        // Adjust the line to be centered on the smaller number
        background-position: -${euiTheme.size.xs} ${euiTheme.size.l};
      }
    `,
  };
};

export const euiStepContentStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  const styles = {
    euiStep__content: css`
      ${logicalCSS('margin-top', euiTheme.size.s)}
      ${logicalCSS('padding-top', euiTheme.size.base)}
      ${logicalCSS(
        'padding-bottom',
        mathWithUnits([euiTheme.size.xl, euiTheme.size.s], (x, y) => x + y)
      )}
      ${logicalCSS('padding-right', euiTheme.size.base)}
    `,
    // Sizes
    m: css`
      // Align the content's contents with the title
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiStep.numberSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )
      )}
      // Align content border to horizontal center of step number
      ${logicalCSS(
        'margin-left',
        mathWithUnits(euiStep.numberSize, (x) => x / 2)
      )}
    `,
    s: css``, // s is the same as m, so we'll programmatically duplicate it below
    xs: css`
      // Align the content's contents with the title
      ${logicalCSS(
        'padding-left',
        mathWithUnits(
          [euiStep.numberXSSize, euiStep.numberMargin],
          (x, y) => x / 2 + y
        )
      )}
      // Align content border to horizontal center of step number
      ${logicalCSS(
        'margin-left',
        mathWithUnits(euiStep.numberXSSize, (x) => x / 2)
      )}
    `,
  };
  styles.s = styles.m;

  return styles;
};

export const euiStepTitleStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const euiStep = euiStepVariables(euiTheme);

  return {
    euiStep__titleWrapper: css`
      display: flex;
      gap: ${euiStep.numberMargin};
    `,
    euiStep__title: css``,
    isDisabled: css`
      color: ${euiTheme.colors.disabledText};
    `,
    // Sizes
    m: css``,
    s: css`
      ${logicalCSS('padding-top', euiTheme.size.xs)}
    `,
    xs: css``,
  };
};
