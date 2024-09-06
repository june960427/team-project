import { useEffect, useState } from 'react'
import { 단기예보조회 } from '../../apis/apis'
import './WeatherBadge.scss'

const WeatherBadge = () => {
  const [skyStatus, setSkyStatus] = useState()
  const [rainStatus, setRainStatus] = useState()
  const [weatherIcon, setWeatherIcon] = useState('')

  const nx = 61 // 서울 강남구 X 좌표
  const ny = 126 // 서울 강남구 Y 좌표

  const getWeather = async () => {
    try {
      const response = await 단기예보조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item

        const skyData = items.find((item) => item.category === 'SKY') //하늘상태 자료구분코드 : 'SKY'
        const rainData = items.find((item) => item.category === 'PTY') //강수형태 자료구분코드 : 'PTY'

        if (skyData && rainData) {
          setSkyStatus(skyData.fcstValue)
          setRainStatus(rainData.fcstValue)
        } else {
          console.error('데이터를 찾을 수 없음')
        }
      } else {
        console.error('API 응답 실패')
      }
    } catch (error) {
      console.error('에러 발생', error)
    }
  }

  const setWeatherBadge = (skyStatus, rainStatus) => {
    //하늘 상태 :맑음(1), 구름많음(3), 흐림(4)
    switch (skyStatus) {
      case 1:
        setWeatherIcon('☀️')
        break
      case 3:
        setWeatherIcon('🌤️')
        break
      case 4:
        setWeatherIcon('☁️')
        break
      default:
        setWeatherIcon('☀️')
        break
    }

    //강수 형태: 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
    switch (rainStatus) {
      case 0:
        break
      case 1:
      case 2:
        setWeatherIcon('🌧️')
        break
      case 3:
        setWeatherIcon('☃️')
        break
      case 4:
        setWeatherIcon('☔️')
        break
    }
  }

  useEffect(() => {
    getWeather()
  }, [])

  useEffect(() => {
    setWeatherBadge(skyStatus, rainStatus)
  }, [skyStatus, rainStatus])

  return (
    <div className='weather-container'>
      <div className='weather-icon'>{weatherIcon}</div>
    </div>
  )
}

export default WeatherBadge
