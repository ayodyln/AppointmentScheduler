// Used in modals and cards to render readable date/time strings
export const dateHandler = (data) => {
  const date = new Date(data.date)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateStr = `${date.getFullYear()}-${month < 10 ? `0${month}` : month}-${
    day < 10 ? `0${day}` : day
  }`
  const timeStr = `${
    date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
  }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`

  return { dateStr, timeStr }
}
