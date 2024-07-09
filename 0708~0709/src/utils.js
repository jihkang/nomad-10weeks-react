import { atom } from 'recoil';

export const setLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const item = window.localStorage.getItem(key);

  if (!item) {
    return {
      key: 'country-state-atom',
      default: [],
    };
  }
  return JSON.parse(item);
};

export const equals = (object) => (target) => {
  return object === target;
};

export const negative = (callback) => (obj) => {
  return !callback(obj);
};

export const contryState = atom(getLocalStorage('contries'));
