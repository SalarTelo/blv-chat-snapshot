export function setToLS(key: string, value: any) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLS(key: string) {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
  return null;
}
