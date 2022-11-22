import { React } from 'react'
import convertDate from '../../Common/DateConverter'
import { MyCalendar } from '../MyCalendar/MyCalendar'
import { DateObject, getAllDatesInRange } from "react-multi-date-picker"
import './AdvertHeader.css'

export const AdvertHeader = ({ advert, ...props }) => {
    console.log(advert)
    return (
        <div className='advertHeaderContent'>
            <h3>{advert.name}</h3>
            <div className='imgBlock'>
                <div className='imageInfo'>
                    <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
                    📍{advert.location}
                </div>
                <div className='headerInfo'>
                    <div className='headerInfoContent'>
                        <div className='advertDates'>
                            <p style={{fontSize:'18px'}}>{convertDate(advert.startTime).split('.').join('/')} - {convertDate(advert.endTime)}</p>
                            <MyCalendar
                                className="bg-dark"
                                monthsShown={1}
                                isMultiple={true}
                                dates={getAllDatesInRange([new DateObject(advert.startTime), new DateObject(advert.endTime)])}
                            />
                        </div>
                        <div className='advertPrice'>
                            <p> {advert.cost} ГРН </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
