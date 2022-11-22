import React from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import './AdvertItem.css'
import dateConverter from '../../Common/DateConverter'

const AdvertItem = (props) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: props?.advert?.id
    });

    return (
        <li onClick={() => navigate(path)} key={props?.advert?.id} className='advertItem'>
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
        </li>
    );
}

export default AdvertItem;
