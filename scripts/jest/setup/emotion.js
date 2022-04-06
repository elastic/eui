
import { createSerializer } from "@emotion/jest";

module.exports = createSerializer({
    classNameReplacer: (className) => className,
    includeStyles: false,
});