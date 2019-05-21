export function VisualizationColorType(props, propName) {
  const color = props[propName];
  if (color === undefined) {
    return;
  }
  // TODO upgrade this to check all possible color string formats
  // using libs like colorjs
  if (
    !(typeof color === 'string' || color instanceof String) ||
    !color.startsWith('#')
  ) {
    return new Error(
      'Color must be a valid hex color string in the form #RRGGBB'
    );
  }
}
