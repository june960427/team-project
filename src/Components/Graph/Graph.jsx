import { useEffect, useState } from 'react'
import { 단기예보조회 } from '../../Apis/Apis'
import { today, tomorrow } from '@utils/FormattedTime'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

const NX = 61
const NY = 126
const FORECAST_HOURS = 24

const filterByCategory = (category) => (data) => data.category === category
const filterByRecent24hrs = (data, idx) =>
  idx < FORECAST_HOURS && (data.fcstDate === today() || data.fcstDate === tomorrow())
const formatForecastTime = (time) => time.slice(0, 2)
const foramtValueName = ({ fcstTime, fcstValue, ...rest }) => ({
  시간: formatForecastTime(fcstTime),
  온도: fcstValue,
  ...rest,
})

export const Graph = () => {
  const [tmpData, setTmpData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await 단기예보조회(NX, NY)

        const datas = response.data.response.body.items.item
          .filter(filterByCategory('TMP'))
          .filter(filterByRecent24hrs)
          .map(foramtValueName)

        setTmpData(datas)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <LineChart
        width={500}
        height={200}
        data={tmpData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='시간' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='basis'
          dataKey='온도'
          stroke='#8884d8'
        />
      </LineChart>
    </>
  )
}
