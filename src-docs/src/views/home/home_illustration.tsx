import React, { useContext } from 'react';
import { ThemeContext } from '../../components/with_theme';
import illustrationDarkMode from '../../images/illustration-eui-hero-500-darkmode-shadow.svg';
import illustrationLightMode from '../../images/illustration-eui-hero-500-shadow.svg';
import { EuiImage } from '../../../../src/components/image';

function Icon() {
  const themeContext: any = useContext(ThemeContext);

  const illustration = themeContext.theme.includes('dark') ? (
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
