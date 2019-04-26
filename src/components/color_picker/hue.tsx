import React, {
  ChangeEvent,
  InputHTMLAttributes,
  FunctionComponent,
} from 'react';
import { CommonProps, Omit } from '../common';

const HUE_RANGE = 360;

export type EuiHueProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> &
  CommonProps & {
    hue?: string | number;
    onChange: (hue: number) => void;
  };

const numberOfStops = 10;
const colorStops = [...Array(numberOfStops).keys()].map(val => {
  const stop = val * (100 / numberOfStops);
  return `hsl(${(stop / 100) * HUE_RANGE}, 100%, 50%) ${stop}%`;
});

export const EuiHue: FunctionComponent<EuiHueProps> = ({
  hue,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };
  return (
    <React.Fragment>
      <input
        min={0}
        max={360}
        step={1}
        type="range"
        className="euiHue"
        value={hue}
        onChange={handleChange}
        style={{
          background: `linear-gradient(to right, ${colorStops.join(',')})`,
        }}
        {...rest}
      />
    </React.Fragment>
  );
};
