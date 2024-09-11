import { useEffect } from 'react'
import { 단기예보조회 } from '../../apis/apis.js'

const NX = 61
const NY = 126
const filterByCategory = (category) => (data) => data.category === category
const formatForecastTime = (time) => time.slice(0, 2)
const foramtValueName = ({ fcstTime, fcstValue, ...rest }) => ({
  시간: formatForecastTime(fcstTime),
  온도: fcstValue,
  ...rest,
})

const GetCurrentTemperature = ({ onTemperatureUpdate }) => {
  const getLatestItem = (items) => {
    if (items.length === 0) return null
    const sortedItems = items.sort((a, b) => new Date(`${a.날짜} ${a.시간}`) - new Date(`${b.날짜} ${b.시간}`))
    return sortedItems[sortedItems.length - 1]
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await 단기예보조회(NX, NY)
        console.log('API 응답:', response)

        if (response.data.response.body.items) {
          const items = response.data.response.body.items.item.filter(filterByCategory('TMP')).map(foramtValueName)
          const latestItem = getLatestItem(items)
          if (latestItem) {
            onTemperatureUpdate(latestItem.온도)
          } else {
            throw new Error('데이터가 없습니다.')
          }
        } else {
          throw new Error('API 응답 형식이 잘못되었습니다.')
        }
      } catch (err) {
        console.error('온도 조회 중 오류 발생: ' + err.message)
      }
    }

    fetchData()
  }, [onTemperatureUpdate])
}

export default GetCurrentTemperature
