/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { colorVis } from '@elastic/eui-theme-borealis';

import { renderHook } from '../../test/rtl';

import { EuiProvider } from '../../components/provider';
import {
  useEuiPaletteColorBlind,
  useEuiPaletteColorBlindBehindText,
  useEuiPaletteComplementary,
  useEuiPaletteForStatus,
  useEuiPaletteForTemperature,
  useEuiPaletteGreen,
  useEuiPaletteOrange,
  useEuiPaletteRed,
  useEuiPaletteSkyBlue,
  useEuiPaletteYellow,
} from './eui_palettes_hooks';
import { euiPaletteCool, euiPaletteGray, euiPaletteWarm } from './eui_palettes';

// wrapper container to ensure hooks are rendered in specific test provider context
const RenderContainer = ({ children }: PropsWithChildren) => (
  <EuiProvider>{children}</EuiProvider>
);

describe('useEuiPaletteColorBlind', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteColorBlind(), {
      wrapper: RenderContainer,
    });

    expect(result.current).toEqual([
      colorVis.euiColorVis0,
      colorVis.euiColorVis1,
      colorVis.euiColorVis2,
      colorVis.euiColorVis3,
      colorVis.euiColorVis4,
      colorVis.euiColorVis5,
      colorVis.euiColorVis6,
      colorVis.euiColorVis7,
      colorVis.euiColorVis8,
      colorVis.euiColorVis9,
    ]);
  });
});

describe('useEuiPaletteColorBlindBehindText', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteColorBlindBehindText(), {
      wrapper: RenderContainer,
    });

    expect(result.current).toEqual([
      colorVis.euiColorVisBehindText0,
      colorVis.euiColorVisBehindText1,
      colorVis.euiColorVisBehindText2,
      colorVis.euiColorVisBehindText3,
      colorVis.euiColorVisBehindText4,
      colorVis.euiColorVisBehindText5,
      colorVis.euiColorVisBehindText6,
      colorVis.euiColorVisBehindText7,
      colorVis.euiColorVisBehindText8,
      colorVis.euiColorVisBehindText9,
    ]);
  });
});

describe('useEuiPaletteForStatus', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteForStatus(3), {
      wrapper: RenderContainer,
    });

    expect(result.current).toEqual([
      colorVis.euiColorVisSuccess0.toLowerCase(),
      colorVis.euiColorVisWarning1.toLowerCase(),
      colorVis.euiColorVisDanger0.toLowerCase(),
    ]);
  });
});

describe('useEuiPaletteForTemperature', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteForTemperature(3), {
      wrapper: RenderContainer,
    });

    // testing static start/end colors only as the rest is generated
    expect(result.current[0]).toEqual(colorVis.euiColorVisCool2.toLowerCase());
    expect(result.current[2]).toEqual(colorVis.euiColorVisWarm2.toLowerCase());
  });
});

describe('useEuiPaletteComplementary', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteComplementary(3), {
      wrapper: RenderContainer,
    });

    // testing static start/end colors only as the rest is generated
    expect(result.current[0]).toEqual(
      colorVis.euiColorVisComplementary0.toLowerCase()
    );
    expect(result.current[2]).toEqual(
      colorVis.euiColorVisComplementary1.toLowerCase()
    );
  });
});

// NOTE: asserting last position palette colors only as the rest is generated based on input
describe('useEuiPaletteRed', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteRed(5), {
      wrapper: RenderContainer,
    });

    expect(result.current[4]).toBe(colorVis.euiColorVisDanger0.toLowerCase());
  });
});

describe('useEuiPaletteGreen', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteGreen(5), {
      wrapper: RenderContainer,
    });

    expect(result.current[4]).toBe(colorVis.euiColorVisSuccess0.toLowerCase());
  });
});

describe('useEuiPaletteSkyBlue', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteSkyBlue(5), {
      wrapper: RenderContainer,
    });

    expect(result.current[4]).toBe(colorVis.euiColorVisNeutral0.toLowerCase());
  });
});

describe('useEuiPaletteYellow', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteYellow(5), {
      wrapper: RenderContainer,
    });

    expect(result.current[4]).toBe(colorVis.euiColorVisWarning0.toLowerCase());
  });
});

describe('useEuiPaletteOrange', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => useEuiPaletteOrange(5), {
      wrapper: RenderContainer,
    });

    expect(result.current[4]).toBe(colorVis.euiColorVisRisk0.toLowerCase());
  });
});

describe('euiPaletteCool', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => euiPaletteCool(3), {
      wrapper: RenderContainer,
    });

    expect(result.current[2]).toEqual(colorVis.euiColorVisCool2.toLowerCase());
  });
});

describe('euiPaletteWarm', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => euiPaletteWarm(3), {
      wrapper: RenderContainer,
    });

    expect(result.current[2]).toEqual(colorVis.euiColorVisWarm2.toLowerCase());
  });
});

describe('euiPaletteGray', () => {
  it('should return default colors', () => {
    const { result } = renderHook(() => euiPaletteGray(4), {
      wrapper: RenderContainer,
    });

    expect(result.current[3]).toEqual(colorVis.euiColorVisGrey3.toLowerCase());
  });
});
