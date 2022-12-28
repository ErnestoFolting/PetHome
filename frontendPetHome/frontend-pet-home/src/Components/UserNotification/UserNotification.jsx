import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import classes from './UserNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { url } from '../../HTTP/index'

export const UserNotification = ({ request, ...props }) => {
    const advertPhotoPath = url + request?.user?.photoFilePath
    const navigate = useNavigate()
    function toRequests() {
        toast.dismiss()
        navigate('/myadverts/' + request?.advertId)
    }
    return (
        <div className={classes.notificationBlock}>
            <div className={classes.imgSection}>
                <img src={advertPhotoPath} alt='advertPhoto' />
            </div>
            <div className={classes.infoSection}>
                Користувач {request?.user?.surname} {request?.user?.name} відгукнувся на Ваше оголошення.
            </div>
            <MyButton onClick={toRequests}>Переглянути заявки.</MyButton>
        </div>
    )
}
