const API_KEY = import.meta.env.VITE_APIK_KEY
const END_POINT = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?'

console.log(API_KEY)

const request = async () => {
  const response = await fetch()
  const data = await response.json()

  return data
}
