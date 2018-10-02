function calculateLuminance(r, g, b) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateContrast(rgb1, rgb2) {
  let contrast =  (
    (calculateLuminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
      / (calculateLuminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
  );

  if (contrast < 1) {
    contrast = 1 / contrast;
  }
  return contrast;
}

export { calculateLuminance, calculateContrast };
