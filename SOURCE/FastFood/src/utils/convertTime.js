import moment from 'moment'
export const getTimeNow = () => {
  return moment(new Date()).format('DD-MM-YYYY HH:mm:ss')
}
export const unixToTime = time => {
  return moment(new Date(time * 1000)).format('DD-MM-YYYY HH:mm:ss')
}
export const unixToDateMonthYear = time => {
  return moment(new Date(time * 1000)).format('YYYY-MM-DD')
}
export const unixToMonth = time => {
  return moment(new Date(time * 1000)).format('MM')
}
export const unixToYear = time => {
  return moment(new Date(time * 1000)).format('YYYY')
}
export function longTimeToDay(time) {
  return moment(new Date(time * 1000)).format('YYYY-MM-DD')
}
export function unitTime(data) {
  return moment(data, 'YYYY-MM-DD').unix()
}
export function unitTimeNow() {
  return Math.floor(Date.now() / 1000)
}
function formatTwoDigits(n) {
  return n < 10 ? '0' + n : n
}

export function formatTime(seconds) {
  const ss = Math.floor(seconds) % 60
  const mm = Math.floor(seconds / 60) % 60
  const hh = Math.floor(seconds / 3600)

  if (hh > 0) {
    return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss)
  } else {
    return mm + ':' + formatTwoDigits(ss)
  }
}
