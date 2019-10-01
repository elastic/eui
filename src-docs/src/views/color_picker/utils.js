import { useMemo, useState } from 'react';
import { isValidHex } from '../../../../src/services';

const generateRandomColor = () =>
  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const useColorStop = (useRandomColor = false) => {
  const [addColor, setAddColor] = useState(generateRandomColor());
  const [colorStops, setColorStops] = useState([
    {
      stop: 20,
      color: '#00B3A4',
    },
    {
      stop: 50,
      color: '#DB1374',
    },
    {
      stop: 65,
      color: '#490092',
    },
  ]);

  const updateColorStops = colorStops => {
    setColorStops(colorStops);
    if (useRandomColor) {
      setAddColor(generateRandomColor());
    }
  };
  return [colorStops, updateColorStops, addColor];
};

export const useColorPicker = (initialColor = '') => {
  const [color, setColor] = useState(initialColor);
  const errors = useMemo(() => {
    const hasErrors = !isValidHex(color) && color !== '';
    return hasErrors ? ['Provide a valid hex value'] : null;
  }, [color]);

  return [color, setColor, errors];
};
