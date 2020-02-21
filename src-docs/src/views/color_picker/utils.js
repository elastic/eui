import { useMemo, useState } from 'react';
import { chromaValid } from '../../../../src/components/color_picker/utils';

const generateRandomColor = () =>
  // https://www.paulirish.com/2009/random-hex-color-code-snippets/
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const useColorStop = (useRandomColor = false) => {
  const [addColor, setAddColor] = useState(generateRandomColor());
  const [colorStops, setColorStops] = useState([
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
    const hasErrors = !chromaValid(color) && color !== '';
    return hasErrors ? ['Provide a valid color value'] : null;
  }, [color]);

  return [color, setColor, errors];
};
