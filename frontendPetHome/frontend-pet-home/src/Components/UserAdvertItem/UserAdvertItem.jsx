import { React } from 'react'
import './UserAdvertItem.css'
import dateConverter from '../../Common/DateConverter'
import { useNavigate, generatePath } from 'react-router-dom'
import { MyButton } from '../../UI/buttons/MyButton'

export const UserAdvertItem = (props) => {
  const navigate = useNavigate()
  const path = generatePath("/myadverts/:id", {
    id: props?.advert?.id
  });

  return (
    <li key={props?.advert?.id} className='userAdvertItem'>
      <div className='imgSection'>
        <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
      </div>
      <div className='advertName'><strong> {props?.advert?.name}  </strong></div>
      <div className='infoSection'>
        <div className='advertInfo'>
          <div className='advertTime'>{dateConverter(props?.advert?.startTime)} - {dateConverter(props?.advert?.endTime)}</div>
          <div className='advertLocation'>📍{props?.advert?.location}</div>
        </div>
        <div className='advertCost'>{props?.advert?.cost} ГРН</div>
      </div>
      <div className='requestsCount'>Відгукнулось: {props?.advert?.requests?.length}</div>
      <div className='userAdvertButtons'>
        <MyButton onClick={() => navigate(path)} style={{ backgroundColor: 'rgba(0, 180, 0, 1)' }}>Деталі</MyButton>
      </div>
    </li>
  );
}
