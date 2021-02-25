import React from 'react';
import IllustrationBg from './home_illustration_parts/illustration_bg';
import IllustrationDots from './home_illustration_parts/illustration_dots';
import IllustrationComponents from './home_illustration_parts/illustration_components';

function Icon() {
  return (
    <div className="guideHomePage__illustration">
      <div className="guideHomePage__illustrationEffect">
        <div className="guideHomePage__illustrationTopLeftCorner" />
        <div className="guideHomePage__illustrationTopRightCorner" />
        <div className="guideHomePage__illustrationBottomLeftCorner" />
        <div className="guideHomePage__illustrationBottomRightCorner" />

        <div className="guideHomePage__illustrationEffectParts">
          <div className="guideHomePage__illustrationEffectPartsDots">
            <IllustrationDots />
          </div>

          <div className="guideHomePage__illustrationEffectPartsComps">
            <IllustrationComponents />
          </div>

          <IllustrationBg />
        </div>
      </div>
    </div>
  );
}

export default Icon;
