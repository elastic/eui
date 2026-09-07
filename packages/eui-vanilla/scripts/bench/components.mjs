/**
 * Per-component fixtures for `scripts/bench/index.mjs`.
 *
 * Add an entry when a new vanilla component is added. Keys match `src/<id>/`.
 */
export const components = {
  button: {
    vanilla: {
      from: 'src/button/mount.ts',
      mount: 'mountButton',
      props: { label: 'Button', display: 'fill' },
    },
    eui: {
      name: 'EuiButton',
      from: 'src/components/button',
      jsx: '<EuiButton fill>Button</EuiButton>',
    },
    css: ['base.css', 'button.css'],
  },
};
