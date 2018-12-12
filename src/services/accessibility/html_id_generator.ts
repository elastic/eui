import uuid from 'uuid';

/**
 * This function returns a function to generate ids.
 * This can be used to generate unique, but predictable ids to pair labels
 * with their inputs. It takes an optional prefix as a parameter. If you don't
 * specify it, it generates a random id prefix. If you specify a custom prefix
 * it should begin with an letter to be HTML4 compliant.
 */
export function htmlIdGenerator(idPrefix?: string) {
  const prefix = idPrefix || `i${uuid.v1()}`;
  return (suffix?: string) => `${prefix}_${suffix || uuid.v1()}`;
}
