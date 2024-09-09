import { useEffect, useState } from 'react'
import { 단기예보조회, 초단기실황조회 } from '../../apis/apis'
import './MinMaxTemp.scss'

const MinMaxTemp = () => {
  const [nowTemp, setNowTemp] = useState()
  const [minMaxTemp, setMinMaxTemp] = useState({ min: null, max: null })

  const nx = 61 // 서울 강남구 X 좌표
  const ny = 126 // 서울 강남구 Y 좌표

  const getNowTemp = async () => {
    try {
      const response = await 초단기실황조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item //항목들 추출
        const tempData = items.find((item) => item.category === 'T1H') //기온 자료구분코드 : 'T1H'

        if (tempData) {
          setNowTemp(Math.round(tempData.obsrValue)) //기온값 설정
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

  const getHighLowTemp = async () => {
    try {
      const response = await 단기예보조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item //항목들 추출

        const minTempData = items.find((item) => item.category === 'TMN') //최저기온 자료구분코드 : 'TMN'
        const maxTempData = items.find((item) => item.category === 'TMX') //최고기온 자료구분코드 : 'TMX'

        if (minTempData && maxTempData) {
          setMinMaxTemp({ min: Math.round(minTempData.fcstValue), max: Math.round(maxTempData.fcstValue) }) //최고, 최저기온값 설정
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

  useEffect(() => {
    getNowTemp()
    getHighLowTemp()
  }, [])

  return (
    <div className='temp-container'>
      <div className='minmax-container'>
        <div className='maxTemp'>{minMaxTemp.max}</div>
        <div className='minTemp'>{minMaxTemp.min}</div>
      </div>
      <div className='nowTemp'>{nowTemp}°</div>
    </div>
  )
}

export default MinMaxTemp
