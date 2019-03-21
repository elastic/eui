import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type EuiCardGraphicColor = 'blue' | 'green' | 'purple';
interface EuiCardGraphicColorsToCode {
  color: EuiCardGraphicColor;
  start: string;
  end: string;
  path: string;
  pathLight: string;
}
const graphicColorsToCodes: EuiCardGraphicColorsToCode[] = [
  {
    color: 'blue',
    start: '#0079A5',
    end: '#3185FC',
    path:
      'M3.79856147e-10,22.9906998 C127.450324,22.9906998 159.656579,4 213.348797,4 C267.041016,4 288.265625,13.4882812 700,17.0470661 L700,40 L108.569037,40 L0,40 L3.79856147e-10,22.9906998 Z',
    pathLight:
      'M1.35371469e-08,7.95601173 C127.450324,7.95601173 102.647209,17.9667644 174.198268,17.9667644 C245.749327,17.9667644 298.768469,2.23349117e-13 700,1.42108547e-14 L700,37 C700,38.6568542 358.656854,40 357,40 L108.569037,40 L3,40 C1.34314575,40 -3.74826549e-09,38.6568543 -4.14273948e-09,37 L1.35371469e-08,7.95601173 Z',
  }, // eslint-disable-line  max-len
  {
    color: 'green',
    start: '#017F75',
    end: '#00B3A4',
    path:
      'M3.14689825e-06,13.6239758 C26.8316503,17.6239758 55.6152344,25 116.542969,25 C177.470703,25 263.972656,4 297.017578,4 C330.0625,4 348.589288,7.23392617 700.000003,9 L700.000003,40 L108.56904,40 L3.14689058e-06,40 L3.14689825e-06,13.6239758 Z',
    pathLight:
      'M3.1372994e-06,24.4746094 C127.450326,24.4746094 108.698941,3 180.25,3 C251.801058,3 298.76847,17.4941406 700,17.4941406 L700.000003,40 L108.569039,39.5058594 L3.01365718,39.9862837 C1.35682009,39.9938246 0.00757513054,38.6568059 3.42096185e-05,36.9999688 C1.34947659e-05,36.9954175 3.13729938e-06,36.9908661 3.13729938e-06,36.9863147 L3.1372994e-06,24.4746094 Z',
  }, // eslint-disable-line  max-len
  {
    color: 'purple',
    start: '#490092',
    end: '#DD0A73',
    path:
      'M0,5 C85.1894531,9 157.96592,25.9853066 223.281971,25.9853638 C288.598022,25.9854211 306.490234,12.5448566 700,12.5448566 L700,40 L108.569037,40 L0,40 L0,5 Z',
    pathLight:
      'M700,21.4746094 L700,40 L1.76214598e-12,40 L1.12746648e-08,18.4941406 C9.35694419,18.5359805 41.1418261,21.0181774 102.519531,21.4746094 C163.897236,21.9310414 216.210205,5 260.105102,5 C304,5 339.77443,21.6752984 700,21.4746094 Z',
  }, // eslint-disable-line  max-len
];

export const GRAPHIC_COLORS: EuiCardGraphicColor[] = graphicColorsToCodes.map(
  ({ color }) => color
);

export type EuiCardGraphicProps = HTMLAttributes<SVGElement> &
  CommonProps & {
    /**
     * Determines the brand-driven color codes used in the SVG
     */
    color?: EuiCardGraphicColor;
  };

export const EuiCardGraphic: FunctionComponent<EuiCardGraphicProps> = ({
  color = 'blue',
}) => {
  // Set the svg gradient colors
  const graphicStartColor: string = graphicColorsToCodes.find(
    w => w.color === color
  )!.start;
  const graphicEndColor: string = graphicColorsToCodes.find(
    x => x.color === color
  )!.end;
  const graphicSVGPath: string = graphicColorsToCodes.find(
    y => y.color === color
  )!.path;
  const graphicSVGPathLight: string = graphicColorsToCodes.find(
    z => z.color === color
  )!.pathLight;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="40"
      viewBox="0 0 300 40"
      preserveAspectRatio="none">
      <defs>
        <linearGradient id={`wave-${color}`} x1="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor={graphicStartColor} />
          <stop offset="40%" stopColor={graphicEndColor} />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#C4C4C4"
          fillOpacity=".13"
          fillRule="evenodd"
          d={graphicSVGPathLight}
        />
        <path
          fill={`url(#wave-${color})`}
          fillOpacity=".83"
          fillRule="evenodd"
          d={graphicSVGPath}
        />
      </g>
    </svg>
  );
};
