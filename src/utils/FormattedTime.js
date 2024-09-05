const date = new Date()
const hour = date.getHours()
const minutes = date.getMinutes()

const today = () => {
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return year + month + day
}

const tomorrow = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return year + month + day
}

const yesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  const year = date.getFullYear().toString()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return year + month + day
}

const formattedDate = (currentTime) => {
  return hour === 0 && currentTime.slice(0, 2) === '23' ? yesterday() : today()
}

const 초단기실황조회시간 = () => {
  const adjustedHour = minutes < 10 ? (hour === 0 ? 23 : hour - 1) : hour
  return adjustedHour.toString().padStart(2, '0').padEnd(4, '0')
}

const 초단기예보조회시간 = () => {
  const adjustedHour = minutes < 30 ? (hour === 0 ? 23 : hour - 1) : hour
  return adjustedHour.toString().padStart(2, '0').padEnd(4, '30')
}

const 단기예보조회시간 = () => {
  const baseTimes = [23, 20, 17, 14, 11, 8, 5, 2]
  const baseTime = baseTimes.find((baseTime) => hour > baseTime || (hour === baseTime && minutes >= 10)) || 23

  return baseTime.toString().padStart(2, '0').padEnd(4, '0')
}

export { today, tomorrow, formattedDate, 초단기실황조회시간, 초단기예보조회시간, 단기예보조회시간 }
