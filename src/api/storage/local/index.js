export const getByKey = function (key) {
  return window.localStorage.getItem(key);
};

export const setByKey = function (key, value) {
  return window.localStorage.setItem(key, value);
};

export const removeByKey = function (key) {
  return window.localStorage.removeItem(key);
};
