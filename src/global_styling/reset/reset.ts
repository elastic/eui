/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const resetStyles = `
/* // Adapted from Eric Meyer's reset (http://meyerweb.com/eric/tools/css/reset/, v2.0 | 20110126). */


*, *:before, *:after {
  box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: baseline;
}

h1, h2, h3, h4, h5, h6, p {
  font-family: inherit;
  font-weight: inherit;
  font-size: inherit;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

a[href],
button,
[role='button'] {
  cursor: pointer;
}

button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  color: inherit;
  border-radius: 0;
  font-size: inherit;
}

input {
  margin: 0;
  padding: 0;
}

input:disabled {
  opacity: 1; /* required on iOS */
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

hr {
  margin: 0;
}

fieldset {
  min-inline-size: auto;
}

/* Chrome has an issue around RTL languages in SVGs when letter-spacing is negative
 * https://bugs.chromium.org/p/chromium/issues/detail?id=966480
 */
svg text {
  letter-spacing: normal !important;
}`;
