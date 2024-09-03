import { useEffect, useState } from 'react'

const Clock = () => {
  const [time, setTime] = useState(new Date().toLocaleString())

  useEffect(() => {
    const time = setInterval(() => {
      setTime(new Date().toLocaleString())
    }, 1000)

    return () => {
      clearInterval(time)
    }
  }, [])

  return (
    <div className='clock'>
      <p>{time}</p>
    </div>
  )
}

export default Clock
