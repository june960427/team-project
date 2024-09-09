import { useEffect, useState, useCallback } from 'react'
import { 단기예보조회 } from './apis/apis'
import Header from '@components/Header/Header'
import './App.css' // 스타일을 추가한 CSS

// 이미지 임포트
import sunny from './assets/맑음.jpg'
import cloudy from './assets/구름.jpg'
import cloudy2 from './assets/흐림.jpg'
import snowy from './assets/눈.jpg'
import rainSnow from './assets/눈_비.jpg'
import rain from './assets/비.jpg'
import shower from './assets/소나기.jpg'

const App = () => {
  const [skyStatus, setSkyStatus] = useState(null)
  const [rainStatus, setRainStatus] = useState(null)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [loading, setLoading] = useState(false)

  const nx = 61 // 서울 강남구 X 좌표
  const ny = 126 // 서울 강남구 Y 좌표

  const getWeather = useCallback(async () => {
    setLoading(true)
    try {
      console.log('성공')
      const response = await 단기예보조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item

        const skyData = items.find((item) => item.category === 'SKY')
        const rainData = items.find((item) => item.category === 'PTY')

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
    } finally {
      setLoading(false)
    }
  }, [nx, ny])

  useEffect(() => {
    getWeather()
  }, [getWeather])

  useEffect(() => {
    if (skyStatus !== null && rainStatus !== null) {
      console.log('skyStatus:', skyStatus)
      console.log('rainStatus:', rainStatus)

      let image = ''
      switch (Number(skyStatus)) {
        case 1:
          image = sunny // 맑음
          break
        case 3:
          image = cloudy // 구름 많음
          break
        case 4:
          image = cloudy2 // 흐림
          break
        default:
          break
      }
      switch (Number(rainStatus)) {
        case 0:
          break
        case 1:
          image = rain // 비
          break
        case 2:
          image = rainSnow // 비/눈
          break
        case 3:
          image = snowy // 눈
          break
        case 4:
          image = shower // 소나기
          break
        default:
          break
      }
      // setBackgroundColor(color)
      setBackgroundImage(image)
    }
  }, [skyStatus, rainStatus])

  return (
    <div
      style={{
        backgroundSize: 'cover',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        position: 'relative', // 스피너 위치 조정
      }}
    >
      {loading && <div className='spinner'></div>}
      <Header />
    </div>
  )
}

export default App
