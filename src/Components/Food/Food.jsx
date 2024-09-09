import { useState, useEffect } from 'react'
import ListArea from './ListArea'
import GetCurrentTemperature from './GetCurrentTemperature'
import './Food.css'

function Food() {
  const [search, setSearch] = useState('')
  const [temperature, setTemperature] = useState(null)
  const [recommendation, setRecommendation] = useState(null)

  const food = {
    cold: ['찌개', '떡볶이', '국밥', '라면', '백반', '전골', '해장국'],
    hot: ['냉면', '메밀', '초계국수', '물회', '삼계탕'],
    normal: ['치킨', '삼겹살', '찌개', '비빔밥', '회', '갈비', '카레', '덮밥', '짜장면', '찜닭'],
  }

  // 기온에 따라 cold, hot, normal로 분할
  const getRandomRecommendation = (temp) => {
    let recommendations
    if (temp <= 20) {
      recommendations = food.cold
    } else if (temp >= 21 && temp <= 27) {
      recommendations = food.normal
    } else if (temp >= 28) {
      recommendations = food.hot
    } else {
      return ''
    }
    return recommendations[Math.floor(Math.random() * recommendations.length)]
  }

  //기온 업데이트
  const handleTemperatureUpdate = (temp) => {
    setTemperature(temp)
    if (recommendation === null) {
      setRecommendation(getRandomRecommendation(temp))
    }
  }

  // 다른 음식 추천이 가능하도록 함
  const handleRefresh = () => {
    if (temperature !== null) {
      setRecommendation(getRandomRecommendation(temperature))
    }
  }

  // 검색 내용으로 쓰임
  useEffect(() => {
    if (recommendation) {
      setSearch('강남' + recommendation)
    }
  }, [recommendation])

  return (
    <div className='main_container'>
      <div>
        {recommendation && (
          <div className='recommendation'>
            <div>
              <p>오늘은 {recommendation} 어떠세요?</p>
            </div>
            <p onClick={handleRefresh}>다른 음식 볼래요!</p>
          </div>
        )}
      </div>
      <ListArea search={search} />
      <GetCurrentTemperature onTemperatureUpdate={handleTemperatureUpdate} />
    </div>
  )
}

export default Food
