import { React, useEffect } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { observer } from 'mobx-react-lite'
import convertDate from '../../Common/DateConverter'
import './Advert.css'
import { MyCalendar } from '../MyCalendar/MyCalendar'
import { DateObject, getAllDatesInRange } from "react-multi-date-picker"

const Advert = ({ advert, pathToProfile, navigate }) => {

    return (
        <div className='certainAdvertContent'>
            <h3>{advert.name}</h3>
            <div className='imgBlock'>
                <div className='imageInfo'>
                    <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
                    📍{advert.location}
                </div>
                <div className='headerInfo'>

                    <div className='headerInfoContent'>

                        <div className='advertDates'>
                            <p>{convertDate(advert.startTime).split('.').join('/')} - {convertDate(advert.endTime)}</p>
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
            <div className='advertInfoBlock'>
                <h3>Опис</h3>
                <p>{advert.description}</p>
            </div>
            <div className='ownerInfoBlock'>
                <h3>Власник</h3>
                <div className='ownerInfoContent'>
                    <div className='ownerPhoto'>
                        <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                        {advert?.owner?.surname} {advert?.owner?.name}
                    </div>
                    <div className='ownerInfo'>
                        <MyButton style={{ backgroundColor: 'lightgreen' }} onClick={() => console.log('request')}>Подати заявку</MyButton>
                        <MyButton onClick={() => navigate(pathToProfile)}>Переглянути профіль</MyButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default observer(Advert);
