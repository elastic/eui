import { isNil } from '../predicate';

interface FormatTextOptions {
  nil: string;
}

export const formatText = (value?: any, options: Partial<FormatTextOptions> = { nil: '' }) => {
  return isNil(value) ? options.nil : value.toString();
};
