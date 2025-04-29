/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n, useEuiI18n } from '../i18n';

import { euiHueStyles } from './hue.styles';
import { EuiToolTip } from '../tool_tip';

const HUE_RANGE = 359;

export type EuiHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  CommonProps & {
    hex?: string;
    hue?: string | number;
    onChange: (hue: number) => void;
  };

export const EuiHue: FunctionComponent<EuiHueProps> = ({
  className,
  hex,
  hue = 1,
  id,
  onChange,
  ...rest
}) => {
  const classes = classNames('euiHue', className);
  const styles = useEuiMemoizedStyles(euiHueStyles);

  const [ariaValueText, ariaRoleDescription] = useEuiI18n(
    ['euiHue.ariaValueText', 'euiHue.ariaRoleDescription'],
    ['Hue', 'Hue slider']
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  const hueValue = typeof hue === 'string' ? parseInt(hue) : hue;
  // align the tooltip contextually closer to the thumb
  const tooltipPosition =
    hueValue < Math.floor(HUE_RANGE / 2) ? 'left' : 'right';

  return (
    <div css={styles.euiHue} className={classes}>
      <EuiScreenReaderOnly>
        <label htmlFor={`${id}-hue`}>
          <EuiI18n
            token="euiHue.label"
            default="Select the HSV color mode 'hue' value"
          />
        </label>
      </EuiScreenReaderOnly>
      {/* we can only wrap the entire input because the input slider thumb is not a standalone element */}
      <EuiToolTip
        content={hex}
        anchorProps={{
          css: styles.euiHue__tooltip,
        }}
        disableScreenReaderOutput
        position={tooltipPosition}
      >
        <input
          id={`${id}-hue`}
          min={0}
          max={HUE_RANGE}
          step={1}
          type="range"
          css={styles.euiHue__range}
          className="euiHue__range"
          value={hue}
          onChange={handleChange}
          aria-roledescription={ariaRoleDescription}
          aria-valuetext={`${ariaValueText} ${hue}°`}
          {...rest}
        />
      </EuiToolTip>
    </div>
  );
};
