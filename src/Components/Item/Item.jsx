import { useEffect, useState } from 'react'
import { 단기예보조회 } from '../../apis/apis'
import './Item.scss'
import { today } from '@utils/FormattedTime'

const Item = () => {
  const [rainCheck, setRainCheck] = useState(null)
  const nx = 61 // 서울 강남구 X 좌표
  const ny = 126 // 서울 강남구 Y 좌표

  const getWeather = async () => {
    try {
      const response = await 단기예보조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item
        console.log(items)
        const isRaining = items.some(
          ({ fcstDate, category, fcstValue }) => fcstDate === today && category === 'PTY' && fcstValue !== '0',
        )

        setRainCheck(isRaining)
      } else {
        console.error('API 응답 실패 또는 데이터 누락')
      }
    } catch (error) {
      console.error('에러 발생', error)
    }
  }
  useEffect(() => {
    getWeather()
  }, [])

  return (
    <div className='rain-container'>
      <div className='rain-container-front'>ACC</div>
      <div className='rain-container-back'>{rainCheck ? '우산을 챙기세요' : '우산은 안 챙겨도 돼요'}</div>
    </div>
  )
}

export default Item
