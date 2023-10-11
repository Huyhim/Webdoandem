import moment from 'moment';
export const unixToDateMonthYear = time => {
  return moment(new Date(time * 1000)).format('YYYY-MM-DD');
};
export function longTimeToDay(time) {
  return moment(new Date(time * 1000)).format('YYYY-MM-DD');
}
export function unitTime(data) {
  return moment(data, 'YYYY-MM-DD').unix();
}
