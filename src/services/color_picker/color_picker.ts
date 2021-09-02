/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo, useState } from 'react';

interface colorStopsType {
  stop: number;
  color: string;
}

const generateRandomColor = () =>
  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const useColorStopsState = (
  useRandomColor: boolean = false,
  initialColorStops: colorStopsType[] = [
    {
      stop: 20,
      color: '#54B399',
    },
    {
      stop: 50,
      color: '#D36086',
    },
    {
      stop: 65,
      color: '#9170B8',
    },
  ]
) => {
  const [addColor, setAddColor] = useState(generateRandomColor());
  const [colorStops, setColorStops] = useState(initialColorStops);

  const updateColorStops = (colorStops: colorStopsType[]) => {
    setColorStops(colorStops);
    if (useRandomColor) {
      setAddColor(generateRandomColor());
    }
  };
  return [colorStops, updateColorStops, addColor];
};

export type EuiSetColorMethod = (
  text: string,
  { hex, isValid }: { hex: string; isValid: boolean }
) => void;
export const useColorPickerState = (
  initialColor = ''
): [color: string, setColor: EuiSetColorMethod, errors: string[] | null] => {
  const [color, setColorValue] = useState(initialColor);
  const [isValid, setIsValid] = useState(true);
  const setColor: EuiSetColorMethod = (text, { isValid }) => {
    setColorValue(text);
    setIsValid(isValid);
  };
  const errors = useMemo(() => {
    const hasErrors = !isValid;
    return hasErrors ? ['Provide a valid color value'] : null;
  }, [isValid]);

  return [color, setColor, errors];
};
