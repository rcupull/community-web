import classnames from 'classnames';
import { AnyRecord, EmptyObjectOf, Nullable } from 'types/general';

export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isNullOrUndefinedOrEmptyString = (value: unknown): value is null | undefined | '' => {
  return isNullOrUndefined(value) || value === '';
};

export const compact = <T = any>(value: Array<Nullable<T>>): Array<T> => {
  return value.filter((val) => val) as Array<T>;
};

export const isEmpty = <T = object>(
  value: T | null | undefined,
): value is EmptyObjectOf<T> | null | undefined => {
  if (!value) return true;

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return !keys.length;
  }

  return false;
};

export const getFlattenJson = <T extends AnyRecord = AnyRecord>(value: T): T => {
  return Object.entries(value).reduce(
    (acc, [k, v]) => (isNullOrUndefinedOrEmptyString(v) ? acc : { ...acc, [k]: v }),
    {} as T,
  );
};
export const getFlattenArray = <T extends Array<any> = Array<any>>(value: T): T => {
  return value.filter(Boolean) as T;
};

export const getRange = (count = 0): Array<number> => {
  return [...Array(count).keys()];
};

export const getLine = <T = undefined>(count = 0, fill?: T): Array<T> => {
  return getRange(count).map(() => fill as T);
};

export const cn = classnames;

export const replaceAll = (value: string, match: string, replace: string): string => {
  return value.split(match).join(replace);
};

export const deepJsonCopy = <T extends AnyRecord = AnyRecord>(json: T): T => {
  return JSON.parse(JSON.stringify(json));
};

export const addRow = <T = any>(
  data: Array<T>,
  rowData: T,
  position: 'start' | 'end' = 'end',
): Array<T> => {
  const newData = deepJsonCopy(data);

  return position === 'start' ? [rowData, ...newData] : [...newData, rowData];
};

export const removeRow = <T = any>(data: Array<T>, index: number): Array<T> => {
  const newData = deepJsonCopy(data);
  newData.splice(index, 1);
  return newData;
};

export const updateRow = <T = any>(data: Array<T>, rowData: T, index: number): Array<T> => {
  const newData = deepJsonCopy(data);
  newData[index] = rowData;
  return newData;
};

export const relocateRow = <T = any>(
  data: Array<T>,
  fromIndex: number,
  toIndex: number,
): Array<T> => {
  const newData = deepJsonCopy(data);

  const element = newData.splice(fromIndex, 1)[0];
  newData.splice(toIndex, 0, element);

  return newData;
};

export const range = (count = 0): Array<number> => [...Array(count).keys()];

export const line = <T = undefined>(count = 0, fill?: T): Array<T> => {
  return range(count).map(() => fill as T);
};

export const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = <T extends AnyRecord = AnyRecord>(target: T, source: Partial<T>): T => {
  const output = Object.assign({}, target);

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        //@ts-expect-error ignored
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

export const isEqualObj = (a: AnyRecord | undefined, b: AnyRecord | undefined): boolean => {
  if (!a || !b) return false;

  for (const prop in a) {
    //eslint-disable-next-line
    if (a.hasOwnProperty(prop)) {
      //eslint-disable-next-line
      if (b.hasOwnProperty(prop)) {
        if (typeof a[prop] === 'object') {
          if (!isEqualObj(a[prop], b[prop])) return false;
        } else {
          if (a[prop] !== b[prop]) return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

export const addStringToUniqueArray = (array: Array<string>, value: string): Array<string> => {
  return array.includes(value) ? array : addRow(array, value);
};

export const removeStringFromArray = (array: Array<string>, value: string): Array<string> => {
  const index = array.indexOf(value);
  return index < 0 ? array : removeRow(array, index);
};
