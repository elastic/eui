import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { mergeDeep } from '../../../../src/services';
import { ExclusiveUnion } from '../../../../src/components/common';

type Base = ExclusiveUnion<{ property: string | string[] }, { base: string }>;

type Params = Base & {
  value: object;
  onUpdate: (args: object) => void;
  time?: number;
};

export const useDebouncedUpdate = ({
  base,
  property,
  value,
  onUpdate,
  time = 300,
}: Params) => {
  const [valueClone, setValueClone] = useState(value);

  useEffect(() => {
    setValueClone(value);
  }, [value]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((key: string, value: any) => {
      let obj = {
        [base ?? key]: value,
      };
      if (property) {
        obj = Array.isArray(property)
          ? {
              [property[0]]: {
                [property[1]]: {
                  [key]: value,
                },
              },
            }
          : {
              [property]: {
                [key]: value,
              },
            };
      }
      onUpdate(obj);
    }, time),
    [onUpdate]
  );
  const updateValue = (key: string, value: any) => {
    if (!property) {
      setValueClone(value);
      debouncedUpdate(key, value);
    } else {
      const obj = Array.isArray(property)
        ? {
            [property[1]]: {
              [key]: value,
            },
          }
        : {
            [key]: value,
          };
      setValueClone(mergeDeep(valueClone, obj));
      debouncedUpdate(key, value);
    }
  };

  return [valueClone, updateValue];
};
