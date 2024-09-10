export const toStartCase = (str?: string) =>
  str ? str[0].toUpperCase() + str.substring(1).toLowerCase() : "";
