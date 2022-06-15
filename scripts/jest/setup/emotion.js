import { createSerializer, matchers } from "@emotion/jest";
import { replaceEmotionPrefix } from '../../../src/test'

expect.extend(matchers);

module.exports = createSerializer({
  classNameReplacer: replaceEmotionPrefix,
  includeStyles: false,
});
