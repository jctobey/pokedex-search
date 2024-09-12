export const toTitleCase = (str: string, splitChar: string): string => {
  const parts = str.split(splitChar);
  return parts
    .map((part) => part[0].toUpperCase() + part.substring(1).toLowerCase())
    .join(splitChar);
};
