import { React, useState, useEffect } from 'react'
import { MyCalendar } from '../MyCalendar/MyCalendar'
import './User.css'

export const User = ({ profile, calendarVisible }) => {
    const [timeExceptions, setTimeExceptions] = useState([]);
    function getSex(sex) {
        if (sex === 'male') return 'чоловіча'
        else return 'жіноча'
    }
    useEffect(() => {
        const times = profile?.timeExceptions?.map(el => new Date(el.date))
        setTimeExceptions(times)
    }, []);

    return (
        <div className='profileContent'>
            <div className='headerBlock'>
                <div className='userImgBlock'>
                    <img src={require('../../Assets/man.png')} alt='photo' />
                </div>
                <div className='userNameBlock'>
                    <div className='userName'>
                        {profile.surname} {profile.name}
                    </div>
                    <div className='userSex'>
                        Стать: {getSex(profile.sex)}
                    </div>
                </div>
            </div>
            <h3>Контакти</h3>
            <div className='contactsBlock'>
                <div className='userEmail'>
                    Email: {profile.email}
                </div>
                <div className='userPhone'>
                    Номер телефону: {profile.phoneNumber}
                </div>
            </div>
            <h3>Недоступні дати</h3>
            {calendarVisible
                ? <div className='calendarBlock'>
                    <MyCalendar
                        monthsShown={3}
                        dates={timeExceptions}
                    />
                </div>
                : <p>Ви обираєте дати.</p>}
        </div>
    )
}
