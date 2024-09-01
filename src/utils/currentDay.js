const formattedDate = () => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(3, '0')

  return year + month + day
}

const formattedHour = () => {
  const date = new Date()
  const hour = date.getHours()
  const foramtHour = hour.toString().padStart(2, '0')

  return hour
}

export default { formattedDate, formattedHour }
