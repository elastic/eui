const themes = {};

export function registerTheme(theme, cssFiles) {
  themes[theme] = cssFiles;
}

export function applyTheme(newTheme, colorMode = 'LIGHT') {
  Object.keys(themes).forEach((theme) =>
    Object.values(themes[theme]).forEach((cssFile) => cssFile.unuse())
  );

  themes[newTheme]?.[colorMode]?.use();

  if (newTheme.toLowerCase().includes('borealis')) {
    document?.body.classList.add('euiTheme--borealis');
  } else {
    document?.body.classList.remove('euiTheme--borealis');
  }
}
