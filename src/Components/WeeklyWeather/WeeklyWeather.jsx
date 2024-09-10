import { useState, useEffect } from 'react'
import { 단기예보조회 } from '../../apis/apis'

const WeeklyWeather = () => {
  const [weatherData, setWeatherData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const nx = 61 // 강남구 좌표 (x)
  const ny = 126 // 강남구 좌표 (y)

  // 날짜를 MM/DD 형식으로 변환하는 함수
  const formatDate = (dateStr) => {
    const month = dateStr.slice(4, 6)
    const day = dateStr.slice(6, 8)
    return `${month}/${day}`
  }

  // 데이터 필터링 함수
  const filterTemperatureData = (data) => {
    const filteredData = data.filter((item) => item.category === 'TMX' || item.category === 'TMN')

    const formattedData = filteredData.reduce((acc, cur) => {
      const date = cur.fcstDate // 예보 날짜
      const value = cur.fcstValue // 기온 값
      const category = cur.category // 기온 카테고리 (TMX 또는 TMN)

      if (!acc[date]) {
        acc[date] = { TMX: null, TMN: null }
      }

      if (category === 'TMX') {
        acc[date].TMX = value
      } else if (category === 'TMN') {
        acc[date].TMN = value
      }

      return acc
    }, {})

    return formattedData
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await 단기예보조회(nx, ny)
        const filteredData = filterTemperatureData(response.data.response.body.items.item)
        setWeatherData(filteredData)
      } catch (err) {
        console.error(err) // 콘솔에 오류를 출력합니다.
        setError('날씨 데이터를 가져오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  if (loading) {
    return <div>날씨 정보를 불러오는 중...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const renderWeather = () => {
    return Object.keys(weatherData).map((date) => {
      const formattedDate = formatDate(date) // 날짜 포맷팅
      return (
        <div key={date}>
          <h3>{formattedDate}</h3>
          <div style={{ display: 'flex', marginRight: '20px' }}>
            <p>{weatherData[date].TMX}℃</p>
            <p>{weatherData[date].TMN}℃</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      {renderWeather()} {/* 날씨 데이터 렌더링 */}
    </div>
  )
}

export default WeeklyWeather
