import { React, useState, useEffect } from 'react'
import { MyCalendar } from '../MyCalendar/MyCalendar'
import './User.css'
import { url } from '../../HTTP/index'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyModal } from '../../UI/MyModal/MyModal'
import { UserProfileRedoForm } from '../UserProfileRedoForm/UserProfileRedoForm'

export const User = ({ profile, calendarVisible, selfProfile, deleteSelfProfile, profileRedoVisible }) => {
    const [acceptModalVisible, setAcceptModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [redoModalVisible, setRedoModalVisible] = useState(false);
    const imgPath = url + profile?.photoFilePath
    const [timeExceptions, setTimeExceptions] = useState([]);

    function getSex(sex) {
        if (sex === 'male') return 'чоловіча'
        else return 'жіноча'
    }

    function deleteProfile(e) {
        e.preventDefault()
        if (profile?.ifHaveRequests) {
            setErrorModalVisible(true)
        } else {
            setAcceptModalVisible(true)
        }
    }
    function redoProfile(e) {
        e.preventDefault()
        setRedoModalVisible(true)
        profileRedoVisible(true)
    }
    useEffect(() => {
        const times = profile?.timeExceptions?.map(el => new Date(el.date))
        setTimeExceptions(times)
    }, []);

    return (
        <div className='profileContent'>
            <MyModal title='Помилка' visible={errorModalVisible} setVisible={setErrorModalVisible} style={{ backgroundColor: 'rgb(228, 74, 74)', color: 'white' }}>Спочатку відмініть заявки.</MyModal>
            <MyModal title='Редагування профіля' visible={redoModalVisible} setVisible={setRedoModalVisible} style={{ backgroundColor: 'lightsalmon' }}>
                <UserProfileRedoForm previousData={profile} setRedoModalVisible={setRedoModalVisible} profileRedoVisible={profileRedoVisible} />
            </MyModal>
            <MyModal title='Видалення' visible={acceptModalVisible} setVisible={setAcceptModalVisible} style={{ backgroundColor: 'black', color: 'white' }}>
                Ви впевнені, що хочете видалити профіль? <br />
                <div className='deleteConfirmButtons'>
                    <MyButton onClick={(e) => { e.preventDefault(); setAcceptModalVisible(false) }} style={{ backgroundColor: 'rgb(228, 74, 74)' }}>Ні</MyButton>
                    <MyButton onClick={(e) => { e.preventDefault(); deleteSelfProfile() }} style={{ backgroundColor: 'rgb(0, 150, 0)' }}>Так</MyButton>
                </div>

            </MyModal>
            {selfProfile &&
                <div className='profileControlButtons'>
                    <MyButton onClick={redoProfile}>Редагувати дані</MyButton>
                    <MyButton onClick={deleteProfile}>Видалити акаунт</MyButton>
                </div>
            }
            <div className='headerBlock'>
                <div className='userImgBlock'>
                    <img src={imgPath} alt='userPhoto' />
                </div>
                <div className='userNameBlock'>
                    <div className='userName'>
                        {profile.surname} {profile.name}
                    </div>
                    <div className='userSex'>
                        Стать: {getSex(profile.sex)}
                    </div>
                    <div className='userLocation'>
                        📍{profile?.location}
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
