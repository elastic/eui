import _isFunction from 'lodash/isFunction';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _isBoolean from 'lodash/isBoolean';
import _isNumber from 'lodash/isNumber';
import _isNaN from 'lodash/isNaN';

// wrap the lodash functions to avoid having lodash's TS type definition from being
// exported, which can conflict with the lodash namespace if other versions are used

// tslint:disable-next-line:ban-types
export const isFunction = (value: any): value is (...args: any[]) => any =>
  _isFunction(value);
export const isArray = (value: any): value is any[] => _isArray(value);
export const isString = (value: any): value is string => _isString(value);
export const isBoolean = (value: any): value is boolean => _isBoolean(value);
export const isNumber = (value: any): value is number => _isNumber(value);
export const isNaN = (value: any) => _isNaN(value);
