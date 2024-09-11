import searchFood from '../../apis/naverApi'
import './Food.css'

const ListArea = ({ search }) => {
  const { loading, data, error } = searchFood(search)

  if (loading) {
    return <p>로딩중...</p>
  }

  if (error) {
    return <p>에러가 발생했습니다</p>
  }

  if (!data || data.length === 0) {
    return <p>데이터를 불러오지 못했습니다.</p>
  }

  return (
    <div className='container'>
      {data.map((item) => (
        <div key={item.link}>
          <h3>{item.title.split('<b>').join('').split('</b>').join('')}</h3>
          <p>{item.address}</p>
          <a
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
          >
            음식점 보러 가기
          </a>
        </div>
      ))}
    </div>
  )
}

export default ListArea
