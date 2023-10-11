export function setData(key, data) {
  localStorage.setItem(key, data);
}
export function getData(key) {
  return localStorage.getItem(key);
}
