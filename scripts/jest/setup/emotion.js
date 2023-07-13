import { createSerializer, matchers } from '@emotion/jest';
import { replaceEmotionPrefix } from '../../../src/test';

expect.extend(matchers);

const emotionSerializer = createSerializer({
  classNameReplacer: replaceEmotionPrefix,
  includeStyles: false,
});

function replaceNodeClasses(node) {
  if (node.attribs && node.attribs.class) {
    node.attribs.class = node.attribs.class
      .split(' ')
      .map((className) => replaceEmotionPrefix(className))
      .join(' ');
  }

  if (node.children) {
    node.children.forEach((childNode) => replaceNodeClasses(childNode));
  }
}

// Emotion serializer looks up for class name prefixes in <style> data-emotion
// attribute values. Sometimes the style elements are not available
// in the document when running Enzyme with the hacky React 18 adapter,
// but the serialize function is still being called. We need to find the emotion
// class names manually and replace them using the replaceEmotionPrefix()
// function used in earlier versions of React.
export default {
  serialize: (val, config, indentation, depth, refs, printer) => {
    if (
      val &&
      val.node &&
      val.node.type === 'tag' &&
      (val.node.attribs || val.node.children)
    ) {
      replaceNodeClasses(val.node);
    }

    return emotionSerializer.serialize(
      val,
      config,
      indentation,
      depth,
      refs,
      printer
    );
  },
  test: emotionSerializer.test,
};
