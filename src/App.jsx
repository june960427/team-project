import { useEffect, useState } from 'react'
import { 단기예보조회 } from './apis/apis'
import Header from '@components/Header/Header'
import sunnyImage from './assets/맑음.jpg'

const App = () => {
  const [skyStatus, setSkyStatus] = useState()
  const [rainStatus, setRainStatus] = useState()
  const [background, setBackground] = useState('')

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

  const setWeather = (skyStatus, rainStatus) => {
    //하늘 상태 :맑음(1), 구름많음(3), 흐림(4)
    switch (skyStatus) {
      case 1:
        setBackground(`url(${sunnyImage})`)
        break
      case 3:
        setBackground(`url(${sunnyImage})`)
        break
      case 4:
        setBackground(`url(${sunnyImage})`)
        break
      default:
        setBackground(`url(${sunnyImage})`)
        break
    }

    //강수 형태: 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
    switch (rainStatus) {
      case 0:
        break
      case 1:
        setBackground(`url(${sunnyImage})`)
        break
      case 2:
        setBackground(`url(${sunnyImage})`)
        break
      case 3:
        setBackground(`url(${sunnyImage})`)
        break
      case 4:
        setBackground(`url(${sunnyImage})`)
        break
    }
  }

  useEffect(() => {
    getWeather()
  }, [])

  useEffect(() => {
    setWeather(skyStatus, rainStatus)
  }, [skyStatus, rainStatus])

  return (
    <div style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}>
      <Header />
    </div>
  )
}
export default App
