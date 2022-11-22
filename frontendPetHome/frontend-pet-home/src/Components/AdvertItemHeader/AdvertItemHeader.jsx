import React from 'react'
import './AdvertItemHeader.css'
import dateConverter from '../../Common/DateConverter'

export const AdvertItemHeader = ({advert, ...props}) => {
    return (
        <div className='advertItemHeader' {...props}>
            <div className='imgSection'>
                <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
            </div>
            <div className='advertName'><strong> {advert?.name}  </strong></div>
            <div className='infoSection'>
                <div className='advertInfo'>
                    <div className='advertTime'>{dateConverter(advert?.startTime)} - {dateConverter(advert?.endTime)}</div>
                    <div className='advertLocation'>📍{advert?.location}</div>
                </div>
                <div className='advertCost'>{advert?.cost} ГРН</div>
            </div>
        </div>
    )
}
