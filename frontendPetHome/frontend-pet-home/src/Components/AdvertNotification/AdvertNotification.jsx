import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import classes from './AdvertNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { url } from '../../HTTP/index'

export const AdvertNotification = ({ advert, ...props }) => {
    const advertPhotoPath = url + advert?.photoFilePath
    const navigate = useNavigate()
    function toRequests(){
        toast.dismiss()
        navigate('/myrequests')
    }
    return (
        <div className={classes.notificationBlock}>
            <div className={classes.imgSection}>
                <img src={advertPhotoPath} alt='advertPhoto' />
            </div>
            <div className={classes.infoSection}>
                Ми підібрали для Вас оголошення. Погляньте.
            </div>
            <MyButton onClick={toRequests}>Переглянути заявки</MyButton>
        </div>
    )
}
