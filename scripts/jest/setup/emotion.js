import { createSerializer, matchers } from "@emotion/jest";

expect.extend(matchers);

module.exports = createSerializer({
  classNameReplacer: (className) => className,
  includeStyles: false,
});
