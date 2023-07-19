export function setStorage(key: string, value: any) {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}
export function getStorage(key: string) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data as any);
  } catch (err) {
    return data;
  }
}
export function removeStorage(key: string) {
  localStorage.removeItem(key);
}
