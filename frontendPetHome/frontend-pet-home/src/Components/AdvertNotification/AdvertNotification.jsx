import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import classes from './AdvertNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { url } from '../../HTTP/index'

export const AdvertNotification = ({ advert, status, ...props }) => {
    const advertPhotoPath = url + advert?.photoFilePath
    const navigate = useNavigate()
    function toRequests() {
        toast.dismiss()
        navigate('/myrequests')
    }

    function renderSwitch(status) {
        switch (status) {
            case 'generated':
                return <p>Ми підібрали для Вас оголошення, погляньте.</p>
            case 'confirm':
                return <p>Власник підтвердив Вашу заявку.</p>
            case 'reject':
                return <p>Власник відхилив Вашу заявку.</p>
            default:
                return <p>Очікуємо</p>
        }
    }

    return (
        <div className={classes.notificationBlock}>
            <div className={classes.imgSection}>
                <img src={advertPhotoPath} alt='advertPhoto' />
            </div>
            <div className={classes.infoSection}>
                {status && renderSwitch(status)}
            </div>
            <MyButton onClick={toRequests}>Переглянути заявки</MyButton>
        </div>
    )
}
