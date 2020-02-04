export const qualitativePropsInfo = {
  euiPaletteColorBlind: {
    __docgenInfo: {
      props: {
        rotations: {
          description: 'How many variations of the series is needed',
          required: false,
          type: { name: 'number' },
          defaultValue: { value: '1' },
        },
        order: {
          description:
            'Order similar colors as `group`s or just `append` each variation',
          required: false,
          type: { name: "'append' | 'group'" },
          defaultValue: { value: "'append'" },
        },
        direction: {
          description: 'Specifies if the direction of the color variations',
          required: false,
          type: { name: "'lighter' | 'darker' | 'both'" },
          defaultValue: { value: "'lighter'" },
        },
      },
    },
  },
};

export const palettePropsInfo = {
  colorPalette: {
    __docgenInfo: {
      props: {
        colors: {
          description: 'The main color code or array of codes',
          required: true,
          type: { name: 'string[]' },
        },
        len: {
          description: 'The number of colors in the resulting array',
          required: false,
          type: { name: 'number' },
          defaultValue: { value: '10' },
        },
        diverging: {
          description:
            'Forces color interpolation to be calculated separately for each half',
          required: false,
          type: { name: 'boolean' },
          defaultValue: { value: 'false' },
        },
        categorical: {
          description:
            'Uses a more static interpolation for non-continuous spectrums',
          required: false,
          type: { name: 'boolean' },
          defaultValue: { value: 'false' },
        },
      },
    },
  },
};
