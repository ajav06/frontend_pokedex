/**
 * Converts a snake_case string to camelCase.
 *
 * @param str - The snake_case string to be converted.
 * @returns The camelCase version of the input string.
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Recursively converts all object keys from snake_case to camelCase.
 * Works with nested objects and arrays.
 *
 * @param obj - The object or array to be transformed.
 * @returns A new object or array with all keys in camelCase.
 */
export const transformObjectToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformObjectToCamelCase(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, any> = {};
    for (const key in obj as Record<string, any>) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = toCamelCase(key);
        newObj[camelCaseKey] = transformObjectToCamelCase((obj as Record<string, any>)[key]);
      }
    }
    return newObj as T;
  }
  return obj;
};

/**
 * Converts each string in an array from snake_case to camelCase.
 *
 * @param arr - An array of snake_case strings.
 * @returns A new array with each string in camelCase.
 */
export const transformArrayToCamelCase = (arr: string[]): string[] => {
  return arr.map(toCamelCase);
};

/**
 * Converts a camelCase string to snake_case.
 *
 * @param str - The camelCase string to be converted.
 * @returns The snake_case version of the input string.
 */
export const toSnakeCase = (str: string): string => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
};

/**
 * Recursively converts all object keys from camelCase to snake_case.
 * Works with nested objects and arrays.
 *
 * @param obj - The object or array to be transformed.
 * @returns A new object or array with all keys in snake_case.
 */
export const transformObjectToSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item) => transformObjectToSnakeCase(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, any> = {};
    for (const key in obj as Record<string, any>) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const snakeCaseKey = toSnakeCase(key);
        newObj[snakeCaseKey] = transformObjectToSnakeCase((obj as Record<string, any>)[key]);
      }
    }
    return newObj as T;
  }
  return obj;
};

/**
 * Converts each string in an array from camelCase to snake_case.
 *
 * @param arr - An array of camelCase strings.
 * @returns A new array with each string in snake_case.
 */
export const transformArrayToSnakeCase = (arr: string[]): string[] => {
  return arr.map(toSnakeCase);
};
