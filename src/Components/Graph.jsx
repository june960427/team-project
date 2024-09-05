import { useEffect, useState } from 'react'
import { 단기예보조회 } from '../Apis/Apis'
import { today } from '@utils/FormattedTime'

export const Graph = () => {
  const [tmpData, setTmpData] = useState([])

  useEffect(() => {
    단기예보조회(61, 126)
      .then((data) => data.data.response.body.items.item)
      .then((datas) => datas.filter((data) => data.fcstDate === today()))
      .then((todayData) => todayData.filter((data) => data.category == 'TMP'))
      .then((todayTmp) => setTmpData(todayTmp))
  }, [])

  //   console.log(tmpData)
  /*
    fcstTime : "1500"
    fcstValue : "29"
  */

  return (
    <>
      {tmpData.map(({ fcstTime, fcstValue }) => (
        <code key={fcstTime}>{`시간: ${fcstTime}, 온도: ${fcstValue}°C`}</code>
      ))}
    </>
  )
}
