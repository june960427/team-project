import { useState, useEffect } from 'react'
import { 단기예보조회 } from '../../apis/apis.js'

/**
  상수의 경우 컴포넌트가 로딩될 때 다시 사용할 필요가 없어서 위로 뺐습니다.
  
  함수 내부에 이러한 변수나 함수를 선언하면, React는 이들을 컴포넌트의 렌더링 사이클의 일부로 간주합니다. 즉, 컴포넌트가 리렌더링될 때마다 이 변수들과 함수들이 새로 생성됩니다.
  useEffect 훅의 의존성 배열에 이러한 함수나 변수를 포함시키지 않으면, ESLint의 exhaustive-deps 규칙이 경고를 발생시킵니다.
*/
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
  // 이 부분 확인 필요합니다! state를 어디다 쓸건지 확인해주세요
  const [temperature, setTemperature] = useState(null)

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
            setTemperature(latestItem.온도)
            onTemperatureUpdate(latestItem.온도)
          } else {
            throw new Error('데이터가 없습니다.')
          }
        } else {
          throw new Error('API 응답 형식이 잘못되었습니다.')
        }
        // 이 부분 확인 필요합니다! 추후에 state를 더 만드실건지 삭제하실건지
      } catch (err) {
        setError('온도 조회 중 오류 발생: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [onTemperatureUpdate])
}

export default GetCurrentTemperature
