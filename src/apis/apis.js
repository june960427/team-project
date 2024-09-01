import axios from 'axios'
import { formattedDate, formattedHour } from '@utils/FormattedTime'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://apis.data.go.kr/'
const 초단기실황조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
const 초단기예보조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
const 단기예보조회_ENDPOINT = '1360000/VilageFcstInfoService_2.0/getVilageFcst'

const createUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, BASE_URL)
  const searchParams = new URLSearchParams({
    serviceKey: decodeURIComponent(API_KEY),
    returnType: 'json',
    pageNo: '1',
    numOfRows: '1000',
    base_date: formattedDate(),
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
  // 06시 발표(정시단위)
  try {
    const url = createUrl(초단기실황조회_ENDPOINT, {
      base_time: formattedHour(),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    handleApiError(err, '초단기실황조회 API 호출 오류')
  }
}

const 초단기예보조회 = async (nx, ny) => {
  // 06시30분 발표(30분 단위)
  try {
    const url = createUrl(초단기예보조회_ENDPOINT, {
      base_time: formattedHour(),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    handleApiError(err, '초단기예보조회 API 호출 오류')
  }
}

const 단기예보조회 = async (nx, ny) => {
  // 05시 발표
  try {
    const url = createUrl(단기예보조회_ENDPOINT, {
      base_time: formattedHour(),
      nx: nx.toString(),
      ny: ny.toString(),
    })
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    handleApiError(err, '단기예보조회 API 호출 오류')
  }
}

export { 초단기실황조회, 초단기예보조회, 단기예보조회 }
