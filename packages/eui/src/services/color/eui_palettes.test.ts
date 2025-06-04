/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';

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
      euiColorVisAsTextLight0: customColor,
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
      euiColorVisAsTextDark0: customColor,
    };

    const result = euiPaletteForDarkBackground({
      colors,
    });

    expect(result[0]).toEqual(customColor);
  });
});

describe('euiPaletteForStatus', () => {
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
