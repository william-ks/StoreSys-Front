export const create = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const read = (key: string) => {
  return localStorage.getItem(key);
};

export const del = (key: string) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
