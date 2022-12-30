import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import classes from './UserNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { url } from '../../HTTP/index'

export const UserNotification = ({ request, status, ...props }) => {
    console.log(request?.status)
    const advertPhotoPath = url + request?.user?.photoFilePath
    const navigate = useNavigate()
    function toRequests() {
        toast.dismiss()
        navigate('/myadverts/' + request?.advertId)
    }

    function renderSwitch(status) {
        switch (status) {
            case 'delete':
                return request?.status === 'generated' ? <p>відмовився від згенерованої заявки</p> : <p>відмінив заявку</p>
            case 'apply':
                return <p>подав заявку</p>
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
                Користувач {request?.user?.surname} {request?.user?.name} {status && renderSwitch(status)}
            </div>
            <MyButton onClick={toRequests}>Переглянути заявки.</MyButton>
        </div>
    )
}
