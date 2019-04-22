export const getEventPosition = (
  location: { x: number; y: number },
  container: HTMLElement
) => {
  const { x, y } = location;
  const { width, height, left, top } = container.getBoundingClientRect();
  let leftPos = x - (left + window.pageXOffset);
  let topPos = y - (top + window.pageYOffset);

  if (leftPos < 0) {
    leftPos = 0;
  } else if (leftPos > width) {
    leftPos = width;
  }

  if (topPos < 0) {
    topPos = 0;
  } else if (topPos > height) {
    topPos = height;
  }

  return { left: leftPos, top: topPos, width, height };
};

/* https://en.wikipedia.org/wiki/HSL_and_HSV: "HSV to HSL"*/
export const HSVtoHSL = ({ h, s, v }: HSV): HSL => {
  const l = v - (v * s) / 2;
  const lCheck = Math.min(l, l - 1);
  s = lCheck ? Math.abs((v - l) / lCheck) : 0;

  return {
    h,
    s,
    l,
  };
};

/* https://en.wikipedia.org/wiki/HSL_and_HSV: "HSV to HSL"*/
export const HSLtoHSV = ({ h, s, l }: HSL): HSV => {
  const v = s * Math.min(l, 1 - l) + l;
  s = v ? 2 - (2 * l) / v : 0;

  return {
    h,
    s,
    v,
  };
};

export interface HSL {
  h: number;
  s: number;
  l: number;
}
export interface HSV {
  h: number;
  s: number;
  v: number;
}
