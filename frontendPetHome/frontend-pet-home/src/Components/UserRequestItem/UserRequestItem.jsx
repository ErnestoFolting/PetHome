import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'
import './UserRequestItem.css'
import { useNavigate, generatePath } from 'react-router-dom'

export const UserRequestItem = ({ advert, status, ...props }) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id:advert?.id
    });
    return (
        <li className='userRequestItem' key={advert?.id} >
            <AdvertItemHeader
                advert={advert}
                onClick={() => navigate(path)} 
            />
            {status === 2
                ? <div className='requestConfirmationButtons'>
                    <MyButton style={{backgroundColor:'rgb(0,190,0)'}}>Підтвердити</MyButton>
                    <MyButton style={{backgroundColor:'rgb(200,30,0)'}}>Відхилити</MyButton>
                </div>
                :<p>Очікуємо на рішення замовника</p>
            }
        </li>
    )
}
