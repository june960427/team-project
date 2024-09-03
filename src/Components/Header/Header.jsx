import Clock from '../Clock/Clock'
import './header.css'

const Header = () => {
  return (
    <header>
      <div>
        <h1>현재 위치</h1>
        <h2>서울 특별시 강남구</h2>
      </div>
      <Clock />
    </header>
  )
}

export default Header
