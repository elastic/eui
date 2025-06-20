/**
 * Addresses NVDA pronunciation issue
 */
export const pronounceVersion = (version: string): string => {
  return `version ${version.replaceAll('.', ' point ')}`;
};
