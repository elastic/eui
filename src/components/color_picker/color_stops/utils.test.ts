import { addStop, removeStop, isInvalid } from './utils';

const colorStops = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

describe('isInvalid', () => {
  test('Should not mark valid colorStops as invalid', () => {
    expect(isInvalid(colorStops)).toBe(false);
  });

  test('Should mark colorStops missing color as invalid', () => {
    const colorStops = [{ stop: 0, color: '' }];
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops with invalid color as invalid', () => {
    const colorStops = [{ stop: 0, color: 'not color' }];
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops missing stop as invalid', () => {
    const colorStops = [{ stop: null, color: '#FF0000' }];
    // Intentionally wrong
    // @ts-ignore
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops with invalid stop as invalid', () => {
    const colorStops = [{ stop: 'I am not a number', color: '#FF0000' }];
    // Intentionally wrong
    // @ts-ignore
    expect(isInvalid(colorStops)).toBe(true);
  });

  test('Should mark colorStops with descending stops as invalid', () => {
    const colorStops = [
      { stop: 10, color: '#FF0000' },
      { stop: 0, color: '#00FF00' },
    ];
    expect(isInvalid(colorStops)).toBe(true);
  });
});

describe('addStop', () => {
  test('Should add row when there is only a single row', () => {
    const colorStops = [{ stop: 0, color: '#FF0000' }];
    expect(addStop(colorStops, 0)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 1, color: '#FF0000' },
    ]);
  });

  describe('to middle of list', () => {
    test('Should add row after first item', () => {
      expect(addStop(colorStops, 0)).toEqual([
        { stop: 0, color: '#FF0000' },
        { stop: 12.5, color: '#FF0000' },
        { stop: 25, color: '#00FF00' },
        { stop: 35, color: '#0000FF' },
      ]);
    });

    test('Should add row after second item', () => {
      expect(addStop(colorStops, 1)).toEqual([
        { stop: 0, color: '#FF0000' },
        { stop: 25, color: '#00FF00' },
        { stop: 30, color: '#FF0000' },
        { stop: 35, color: '#0000FF' },
      ]);
    });
  });

  test('Should add row to end of list', () => {
    expect(addStop(colorStops, 2)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 25, color: '#00FF00' },
      { stop: 35, color: '#0000FF' },
      { stop: 45, color: '#FF0000' },
    ]);
  });
});

describe('removeStop', () => {
  test('Should not remove last row', () => {
    const colorStops = [{ stop: 0, color: '#FF0000' }];
    expect(removeStop(colorStops, 0)).toEqual(colorStops);
  });

  test('Should remove row at index', () => {
    const colorStops = [
      { stop: 0, color: '#FF0000' },
      { stop: 25, color: '#00FF00' },
      { stop: 35, color: '#0000FF' },
    ];
    expect(removeStop(colorStops, 1)).toEqual([
      { stop: 0, color: '#FF0000' },
      { stop: 35, color: '#0000FF' },
    ]);
  });
});
