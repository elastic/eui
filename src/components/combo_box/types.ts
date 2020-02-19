import { RefObject } from 'react';
import { EuiComboBoxOptionOption } from '.';

export type UpdatePositionHandler = (
  listElement?: RefObject<HTMLDivElement>
) => void;
export type OptionHandler<T> = (option: EuiComboBoxOptionOption<T>) => void;

// See https://github.com/DefinitelyTyped/DefinitelyTyped/pull/42482/files
export type RefCallback<T> = {
  bivarianceHack(instance: T | null): void;
}['bivarianceHack'];
