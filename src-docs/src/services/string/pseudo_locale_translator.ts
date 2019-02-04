const CHARS_FOR_PSEUDO_LOCALIZATION_REGEX = /[a-z]/ig;

/**
 * Replaces every latin char by pseudo char and repeats every third char twice.
 */
function replacer() {
  let count = 0;

  return (match: string) => {
    const pseudoChar = pseudoAccentCharMap[match] || match;
    return ++count % 3 === 0 ? pseudoChar.repeat(2) : pseudoChar;
  };
}

export function translateUsingPseudoLocale(message: string) {
  return message.replace(CHARS_FOR_PSEUDO_LOCALIZATION_REGEX, replacer());
}

const pseudoAccentCharMap: Record<string, string> = {
  a: 'à',
  b: 'ƀ',
  c: 'ç',
  d: 'ð',
  e: 'é',
  f: 'ƒ',
  g: 'ĝ',
  h: 'ĥ',
  i: 'î',
  l: 'ļ',
  k: 'ķ',
  j: 'ĵ',
  m: 'ɱ',
  n: 'ñ',
  o: 'ô',
  p: 'þ',
  q: 'ǫ',
  r: 'ŕ',
  s: 'š',
  t: 'ţ',
  u: 'û',
  v: 'ṽ',
  w: 'ŵ',
  x: 'ẋ',
  y: 'ý',
  z: 'ž',
  A: 'À',
  B: 'Ɓ',
  C: 'Ç',
  D: 'Ð',
  E: 'É',
  F: 'Ƒ',
  G: 'Ĝ',
  H: 'Ĥ',
  I: 'Î',
  L: 'Ļ',
  K: 'Ķ',
  J: 'Ĵ',
  M: 'Ṁ',
  N: 'Ñ',
  O: 'Ô',
  P: 'Þ',
  Q: 'Ǫ',
  R: 'Ŕ',
  S: 'Š',
  T: 'Ţ',
  U: 'Û',
  V: 'Ṽ',
  W: 'Ŵ',
  X: 'Ẋ',
  Y: 'Ý',
  Z: 'Ž',
};
