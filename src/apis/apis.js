import axios from 'axios'
import { formattedDate, 초단기실황조회시간, 초단기예보조회시간, 단기예보조회시간 } from '@utils/FormattedTime'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://apis.data.go.kr/'

const 초단기실황조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
const 초단기예보조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
const 단기예보조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getVilageFcst'

const createUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, BASE_URL)
  const searchParams = new URLSearchParams({
    serviceKey: decodeURIComponent(API_KEY),
    dataType: 'json',
    pageNo: '1',
    numOfRows: '1000',
    ...params,
  })
  url.search = searchParams.toString()

  return url.toString()
}

const handleApiError = (error, message) => {
  console.error(`${message}:`, error)
  throw new Error(message)
}

const 초단기실황조회 = async (nx, ny) => {
  /*
    06시 발표(정시단위) format 0600
    - 매 시각 10분 이후 호출
  */
  try {
    const url = createUrl(초단기실황조회_ENDPOINT, {
      base_time: 초단기실황조회시간(),
      base_date: formattedDate(초단기실황조회시간()),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)

    return response
  } catch (err) {
    handleApiError(err, '초단기실황조회 API 호출 오류')
  }
}

const 초단기예보조회 = async (nx, ny) => {
  /*
    06시30분 발표(30분 단위)
    제공 시간 매 시 45분 이후
  */
  try {
    const url = createUrl(초단기예보조회_ENDPOINT, {
      base_time: 초단기예보조회시간(),
      base_date: formattedDate(초단기예보조회시간()),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)
    return response
  } catch (err) {
    handleApiError(err, '초단기예보조회 API 호출 오류')
  }
}

const 단기예보조회 = async (nx, ny) => {
  /*
    02 05 08 11 14 17 20 23
    0210 0510 0810 1110 1410 1710 2010 2310 매 시 10분 이후
  */
  try {
    const url = createUrl(단기예보조회_ENDPOINT, {
      base_time: 단기예보조회시간(),
      base_date: formattedDate(단기예보조회시간()),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)
    return response
  } catch (err) {
    handleApiError(err, '단기예보조회 API 호출 오류')
  }
}

export { 초단기실황조회, 초단기예보조회, 단기예보조회 }
