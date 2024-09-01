import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://apis.data.go.kr/'
const WEATHER_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
const AIR_POLLUTION_ENDPOINT = 'B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'

const formatDate = (date = new Date()) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '')
}

const createUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, BASE_URL)
  const searchParams = new URLSearchParams({
    serviceKey: decodeURIComponent(API_KEY),
    returnType: 'json',
    ...params,
  })
  url.search = searchParams.toString()
  return url.toString()
}

const handleApiError = (error, message) => {
  console.error(`${message}:`, error)
  throw new Error(message)
}

const weatherRequest = async (time = '2400', nx = 127, ny = 67) => {
  try {
    const url = createUrl(WEATHER_ENDPOINT, {
      pageNo: '1',
      numOfRows: '1000',
      dataType: 'json',
      base_date: formatDate(),
      base_time: time,
      nx: nx.toString(),
      ny: ny.toString(),
    })

    const response = await axios.get(url)
    return response.data
  } catch (error) {
    handleApiError(error, '날씨 정보를 가져오는 중 오류가 발생했습니다')
  }
}

const airPollutionRequest = async (region = '서울') => {
  try {
    const url = createUrl(AIR_POLLUTION_ENDPOINT, {
      numOfRows: '100',
      pageNo: '1',
      sidoName: region,
      ver: '1.0',
    })
    const response = await axios.get(url)
    return response.data.response.body.items
  } catch (error) {
    handleApiError(error, '미세먼지 정보를 가져오는 중 오류가 발생했습니다')
  }
}

export default { weatherRequest, airPollutionRequest }
