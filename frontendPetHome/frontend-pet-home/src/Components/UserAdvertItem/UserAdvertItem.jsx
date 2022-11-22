import { React } from 'react'
import './UserAdvertItem.css'
import { useNavigate, generatePath } from 'react-router-dom'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'

export const UserAdvertItem = (props) => {
  const navigate = useNavigate()
  const path = generatePath("/myadverts/:id", {
    id: props?.advert?.id
  });

  return (
    <li key={props?.advert?.id} className='userAdvertItem'>
      <AdvertItemHeader
        advert={props?.advert}
      />
      <div className='requestsCount'>Відгукнулось: {props?.advert?.requests?.length}</div>
      <div className='userAdvertButtons'>
        <MyButton onClick={() => navigate(path)} style={{ backgroundColor: 'rgba(0, 180, 0, 1)' }}>Деталі</MyButton>
      </div>
    </li>
  );
}
