import { React } from 'react'
import './UserAdvertItem.css'
import { useNavigate, generatePath } from 'react-router-dom'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'

export const UserAdvertItem = ({ advert, ...props }) => {
  const navigate = useNavigate()
  const path = generatePath("/myadverts/:id", {
    id: advert?.id
  });
  function renderSwitch(status) {
    switch (status) {
      case 'search':
        return <div className='requestsCount'>Відгукнулось: {advert?.requests?.filter((el) => el.status === 'applied')?.length}</div>
      case 'process':
        return <div className='confirmedStatus'>Виконавця знайдено</div>
      case 'finished':
        return <div className='finishedStatusItem'>Виконання завершено</div>
      default:
        return <p>Очікуємо</p>
    }
  }
  return (
    <li key={advert?.id} className='userAdvertItem'>
      <AdvertItemHeader
        advert={advert}
      />
      {renderSwitch(advert?.status)
      }
      <div className='userAdvertButtons'>
        <MyButton onClick={() => navigate(path)} style={{ backgroundColor: 'rgba(0, 180, 0, 1)' }}>Деталі</MyButton>
      </div>
    </li>
  );
}
