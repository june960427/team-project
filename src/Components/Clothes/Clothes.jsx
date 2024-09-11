import { useEffect, useState } from 'react'
import { 단기예보조회 } from '../../apis/apis'
import './Clothes.scss'

const Clothes = () => {
  const [minMaxTemp, setMinMaxTemp] = useState({ min: null, max: null })
  const [clothes, setClothes] = useState({ outer: [], top: [] })

  const nx = 61 // 서울 강남구 X 좌표
  const ny = 126 // 서울 강남구 Y 좌표

  const outer = new Map([
    [{ min: -Infinity, max: 4 }, '패딩'],
    [{ min: 5, max: 10 }, '코트'],
    [{ min: 11, max: 15 }, '자켓'],
    [{ min: 16, max: 19 }, '가디건'],
    [{ min: 20, max: Infinity }, ''],
  ])

  const top = new Map([
    [{ min: -Infinity, max: 19 }, ['맨투맨', '후드', '니트']],
    [{ min: 20, max: 22 }, ['셔츠', '블라우스']],
    [{ min: 23, max: Infinity }, ['반팔']],
  ])

  const getHighLowTemp = async () => {
    try {
      const response = await 단기예보조회(nx, ny)

      if (response && response.data && response.data.response) {
        const items = response.data.response.body.items.item //항목들 추출

        const minTempData = items.find((item) => item.category === 'TMN') //최저기온 자료구분코드 : 'TMN'
        const maxTempData = items.find((item) => item.category === 'TMX') //최고기온 자료구분코드 : 'TMX'

        if (minTempData && maxTempData) {
          setMinMaxTemp({
            min: Math.round(minTempData.fcstValue),
            max: Math.round(maxTempData.fcstValue),
          }) //최고, 최저기온값 설정
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

  const getClothesRecommendation = (minMaxTemp) => {
    const outerSet = new Set()
    const topSet = new Set()
    if (minMaxTemp.min === null || minMaxTemp.max === null) {
      return
    }
    outer.forEach((clothes, range) => {
      //Map의 forEach 메서드는 첫 번째 매개변수로 값(value)와 두 번째 매개변수로 키(key)를 전달
      const { min, max } = range
      if (min <= minMaxTemp.max && minMaxTemp.min <= max) {
        outerSet.add(clothes)
      }
    })

    top.forEach((clothes, range) => {
      const { min, max } = range
      if (min <= minMaxTemp.max && minMaxTemp.min <= max) {
        clothes.forEach((cloth) => topSet.add(cloth))
      }
    })

    setClothes({
      outer: [Array.from(outerSet).join(', ')],
      top: [Array.from(topSet).join(', ')],
    })
  }

  useEffect(() => {
    getHighLowTemp()
  }, [])

  useEffect(() => {
    getClothesRecommendation(minMaxTemp)
  }, [minMaxTemp])

  return (
    <div className='cloth-container'>
      <div className='cloth-container-front'>CLOTHES</div>
      <div className='cloth-container-back'>
        아우터 : {clothes.outer} <br />
        상의 : {clothes.top}
      </div>
    </div>
  )
}

export default Clothes
