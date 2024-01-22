/**
 * Stringify a single argument to Storybook embed compatible format.
 *
 * Please note that the embed view (`iframe.html`) uses a slightly different
 * format than the docs view (`index.html`) and it does **not** support `true`,
 * `false` and `null` exclamation mark prefixing (e.g. `!null`).
 */
const stringifyArg = (key: string | number, value: any): string => {
  if (value === undefined) return '';
  if (value === null) return `${key}:null`;

  if (Array.isArray(value)) {
    return value
      .map((item, index) => stringifyArg(`${key}[${index}]`, item))
      .join(';');
  }

  switch (typeof value) {
    case 'string':
    case 'number':
    case 'bigint':
      return `${key}:${value}`;
    case 'boolean':
      return `${key}:${value ? 'true' : 'false'}`;
    case 'object':
      const prefix = key === '' ? '' : `${key}.`;
      return Object.keys(value)
        .map((objectKey) =>
          stringifyArg(`${prefix}${objectKey}`, value[objectKey])
        )
        .join(';');
  }

  throw new Error(`Unknown value type ${typeof value}`);
};

export const stringifyArgsObject = <TArgs extends object = Record<string, any>>(
  args: TArgs
): string => {
  return stringifyArg('', args);
};
