import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import classes from './AdvertNotification.module.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const AdvertNotification = ({ advert, ...props }) => {
    const navigate = useNavigate()
    function toRequests(){
        toast.dismiss()
        navigate('/myrequests')
    }
    return (
        <div className={classes.notificationBlock}>
            <div className={classes.imgSection}>
                <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
            </div>
            <div className={classes.infoSection}>
                Ми підібрали для Вас оголошення. Погляньте.
            </div>
            <MyButton onClick={toRequests}>Переглянути заявки</MyButton>
        </div>
    )
}
