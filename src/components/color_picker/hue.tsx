import React, {
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../common';

import { EuiScreenReaderOnly } from '../accessibility';
import { EuiI18n } from '../i18n';

const HUE_RANGE = 360;

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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  const classes = classNames('euiHue', className);
  return (
    <React.Fragment>
      <EuiScreenReaderOnly>
        <label htmlFor={`${id}-hue`}>
          <EuiI18n
            token="euiHue.label"
            default="Select the HSV color mode 'hue' value"
          />
        </label>
      </EuiScreenReaderOnly>
      <EuiScreenReaderOnly>
        <p aria-live="polite">{hex}</p>
      </EuiScreenReaderOnly>
      <div className={classes}>
        <input
          id={`${id}-hue`}
          min={0}
          max={HUE_RANGE}
          step={1}
          type="range"
          className="euiHue__range"
          value={hue}
          onChange={handleChange}
          {...rest}
        />
      </div>
    </React.Fragment>
  );
};
