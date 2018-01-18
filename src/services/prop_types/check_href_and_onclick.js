export default function checkHrefAndOnClick(props, propName, componentName) {
  if (props.href && props.onClick) {
    throw new Error(
      `${componentName} must either specify an href property (if it should be a link) ` +
      `or an onClick property (if it should be a button), but not both.`
    );
  }
}
