import { ScaleBand } from './scale_band';

describe.only('Scale Band', () => {
  it('shall scale a numeric domain', () => {
    const scale = new ScaleBand([0, 1, 2, 3], [0, 100]);
    expect(scale.bandwidth).toBe(25);
    expect(scale.scale(0)).toBe(0);
    expect(scale.scale(1)).toBe(25);
    expect(scale.scale(2)).toBe(50);
    expect(scale.scale(3)).toBe(75);
  });
  it('shall scale a string domain', () => {
    const scale = new ScaleBand(['a', 'b', 'c', 'd'], [0, 100]);
    expect(scale.bandwidth).toBe(25);
    expect(scale.scale('a')).toBe(0);
    expect(scale.scale('b')).toBe(25);
    expect(scale.scale('c')).toBe(50);
    expect(scale.scale('d')).toBe(75);
  });
  it('shall scale a any domain', () => {
    const scale = new ScaleBand(['a', 1, null, 'd', undefined], [0, 100]);
    expect(scale.bandwidth).toBe(20);
    expect(scale.scale('a')).toBe(0);
    expect(scale.scale(1)).toBe(20);
    expect(scale.scale(null)).toBe(40);
    expect(scale.scale('d')).toBe(60);
    expect(scale.scale(undefined)).toBe(80);
  });
  it('shall scale remove domain duplicates', () => {
    const scale = new ScaleBand(['a', 'a', 'b', 'c', 'c', 'd'], [0, 100]);
    expect(scale.bandwidth).toBe(25);
    expect(scale.scale('a')).toBe(0);
    expect(scale.scale('b')).toBe(25);
    expect(scale.scale('c')).toBe(50);
    expect(scale.scale('d')).toBe(75);
  });
  it('shall scale a domain with inverted range', () => {
    const scale = new ScaleBand(['a', 'b', 'c', 'd'], [100, 0]);
    expect(scale.bandwidth).toBe(25);
    expect(scale.scale('a')).toBe(100);
    expect(scale.scale('b')).toBe(75);
    expect(scale.scale('c')).toBe(50);
    expect(scale.scale('d')).toBe(25);
  });
  it('shall return undefined for out of domain values', () => {
    const scale = new ScaleBand(['a', 'b', 'c', 'd'], [0, 100]);
    expect(scale.scale('e')).toBeUndefined();
    expect(scale.scale(0)).toBeUndefined();
    expect(scale.scale(null)).toBeUndefined();
  });
  it('shall scale a numeric domain with padding', () => {
    const scale = new ScaleBand([0, 1, 2], [0, 100], [0, 1]);
    expect(scale.bandwidth).toBe(20);
    expect(scale.step).toBe(20);
    // an empty 1 step place at the beginning
    expect(scale.scale(0)).toBe(20);
    expect(scale.scale(1)).toBe(40);
    expect(scale.scale(2)).toBe(60);
    // an empty 1 step place at the end

    const scale2 = new ScaleBand([0, 1, 2, 3], [0, 100], [0, 0.5]);
    expect(scale2.bandwidth).toBe(20);
    expect(scale2.step).toBe(20);
    // an empty 1/2 step place at the beginning
    expect(scale2.scale(0)).toBe(10);
    expect(scale2.scale(1)).toBe(30);
    expect(scale2.scale(2)).toBe(50);
    expect(scale2.scale(3)).toBe(70);
    // an empty 1/2 step place at the end
  });
  it('shall scale a numeric domain with rounding', () => {
    const scale = new ScaleBand([0, 1, 2, 3], [0, 100], [0, 1], true);
    expect(scale.bandwidth).toBe(16);
    expect(scale.step).toBe(16);
    // an empty 1 step place at the beginning
    expect(scale.scale(0)).toBe(18);
    expect(scale.scale(1)).toBe(34);
    expect(scale.scale(2)).toBe(50);
    // an empty 1 step place at the end
  });
});
