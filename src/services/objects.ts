import _get from 'lodash/get';
import _omit from 'lodash/omit';

// wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

export const get = (object: {}, path: string[] | string, defaultValue?: any) =>
  _get(object, path, defaultValue);

export const omit = (object: {} | null | undefined, paths: string[]) =>
  _omit(object, paths);
