import React from 'react';
import illustrationDarkMode from '../../images/illustration-eui-hero-500-darkmode-shadow.svg';
import illustrationLightMode from '../../images/illustration-eui-hero-500-shadow.svg';
import { EuiImage, useEuiTheme } from '../../../../src';

function Icon() {
  const { colorMode } = useEuiTheme();

  const illustration =
    colorMode === 'DARK' ? (
      <EuiImage alt="Elastic UI" url={illustrationDarkMode} />
    ) : (
      <EuiImage alt="Elastic UI" url={illustrationLightMode} />
    );

  return (
    <div className="guideHomePage__illustration">
      <div className="guideHomePage__illustrationEffect">
        <div className="guideHomePage__illustrationTopLeftCorner" />
        <div className="guideHomePage__illustrationTopRightCorner" />
        <div className="guideHomePage__illustrationBottomLeftCorner" />
        <div className="guideHomePage__illustrationBottomRightCorner" />

        <div className="guideHomePage__illustrationEffectSVG">
          {illustration}
        </div>
      </div>
    </div>
  );
}

export default Icon;
