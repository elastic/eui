/*
 * PropTable titles are React runtime headings and never enter Docusaurus' TOC.
 * Inject markdown h3s (and hide the PropTable title) so each table is listed
 * under ## Props.
 */

// CJS interop: the module itself is the visit function
const visit = require('unist-util-visit');

const getDefinitionName = (node) => {
  const definition = node.attributes?.find((attr) => attr.name === 'definition');
  if (!definition || typeof definition.value === 'string' || !definition.value) {
    return null;
  }

  const expression = definition.value.value?.trim();
  if (!expression) {
    return null;
  }

  const match = expression.match(/\.([A-Za-z_][\w]*)$/);
  return match?.[1] ?? null;
};

const previousSiblingIsMatchingHeading = (siblings, index, name) => {
  for (let i = index - 1; i >= 0; i--) {
    const sibling = siblings[i];
    if (!sibling) continue;

    if (sibling.type === 'paragraph') {
      const text = sibling.children
        ?.map((child) => (child.value != null ? String(child.value) : ''))
        .join('');
      if (!text?.trim()) continue;
    }

    if (sibling.type === 'heading' && sibling.depth === 3) {
      const text = sibling.children
        ?.map((child) => (child.value != null ? String(child.value) : ''))
        .join('');
      return text?.trim() === name;
    }

    break;
  }

  return false;
};

function remarkPropTableTocHeadings() {
  return (tree) => {
    const targets = [];

    visit(tree, 'mdxJsxFlowElement', (node, index, parent) => {
      if (node.name !== 'PropTable' || index == null || !parent) {
        return;
      }

      const name = getDefinitionName(node);
      if (!name) {
        return;
      }

      targets.push({ parent, index, node, name });
    });

    // PropTable showTitle defaults to false; only inject the markdown h3 for TOC
    for (let i = targets.length - 1; i >= 0; i--) {
      const { parent, index, name } = targets[i];

      if (previousSiblingIsMatchingHeading(parent.children, index, name)) {
        continue;
      }

      parent.children.splice(index, 0, {
        type: 'heading',
        depth: 3,
        children: [{ type: 'text', value: name }],
      });
    }
  };
}

module.exports = remarkPropTableTocHeadings;
