/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl/render_hook';

import {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  euiPaletteComplementary,
  euiPaletteCool,
  euiPaletteForDarkBackground,
  euiPaletteForLightBackground,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
  euiPaletteGreen,
  euiPaletteOrange,
  euiPaletteRed,
  euiPaletteSkyBlue,
  euiPaletteWarm,
  euiPaletteYellow,
} from './eui_palettes';
import { useEuiTheme } from '../theme';

const colorVis = renderHook(() => {
  const { euiTheme } = useEuiTheme();
  return euiTheme.colors.vis;
}).result.current;

describe('euiPaletteColorBlind', () => {
  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = { ...colorVis, euiColorVis0: customColor };

    const result = euiPaletteColorBlind({ colors });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteColorBlindBehindText', () => {
  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVis0: customColor,
    };

    const result = euiPaletteColorBlindBehindText({
      colors,
      hasVisColorAdjustment: false,
    });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteForLightBackground', () => {
  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisText0: customColor,
    };

    const result = euiPaletteForLightBackground({
      colors,
    });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteForDarkBackground', () => {
  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisText0: customColor,
    };

    const result = euiPaletteForDarkBackground({
      colors,
    });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteForStatus', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteForStatus(6, { colors });

    expect(resultLong[2]).toEqual('#c8e3b8');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisSuccess0: customColor,
    };

    const result = euiPaletteForStatus(3, { colors });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteForTemperature', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteForTemperature(6, { colors });

    expect(resultLong[2]).toEqual('#e8f1ff');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisWarm2: customColor,
    };

    const result = euiPaletteForTemperature(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteComplementary', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteComplementary(6, { colors });

    expect(resultLong[2]).toEqual('#c4dcfd');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisComplementary0: customColor,
    };

    const result = euiPaletteComplementary(3, { colors });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteRed', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteRed(6, { colors });

    expect(resultLong[2]).toEqual('#feb7b0');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisDanger0: customColor,
    };

    const result = euiPaletteRed(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteGreen', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteGreen(6, { colors });

    expect(resultLong[2]).toEqual('#9fdfc6');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisSuccess0: customColor,
    };

    const result = euiPaletteGreen(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteSkyBlue', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteSkyBlue(6, { colors });

    expect(resultLong[2]).toEqual('#a6d8ec');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisNeutral0: customColor,
    };

    const result = euiPaletteSkyBlue(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteYellow', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteYellow(6, { colors });

    expect(resultLong[2]).toEqual('#f9d290');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisWarning0: customColor,
    };

    const result = euiPaletteYellow(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteOrange', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteOrange(6, { colors });

    expect(resultLong[2]).toEqual('#ffc1a1');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisRisk0: customColor,
    };

    const result = euiPaletteOrange(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteCool', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteCool(6, { colors });

    expect(resultLong[2]).toEqual('#a8caff');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisCool2: customColor,
    };

    const result = euiPaletteCool(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteWarm', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteWarm(6, { colors });

    expect(resultLong[2]).toEqual('#ffafa6');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisWarm2: customColor,
    };

    const result = euiPaletteWarm(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});

describe('euiPaletteGray', () => {
  it('should return correct colors', () => {
    const colors = colorVis;
    const resultLong = euiPaletteGray(6, { colors });

    expect(resultLong[2]).toEqual('#7b8aa4');
  });

  it('should return custom colors', () => {
    const customColor = '#00ff00';
    const colors = {
      ...colorVis,
      euiColorVisGrey3: customColor,
    };

    const result = euiPaletteGray(3, { colors });

    expect(result[2]).toEqual(customColor);
  });
});
