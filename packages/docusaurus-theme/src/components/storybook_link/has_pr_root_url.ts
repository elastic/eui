export const hasPrRootUrl = (
  obj: unknown
): obj is { customFields: { prRootUrl: string } } => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'customFields' in obj &&
    typeof obj.customFields === 'object' &&
    obj.customFields !== null &&
    'prRootUrl' in obj.customFields &&
    typeof obj.customFields.prRootUrl === 'string'
  );
};
