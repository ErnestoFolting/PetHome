import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'
import './UserRequestItem.css'
import { useNavigate, generatePath } from 'react-router-dom'

export const UserRequestItem = ({ advert, status, ...props }) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: advert?.id
    });

    function renderSwitch(status) {
        switch (status) {
            case 'rejected':
                return <p className='rejectedRequestStatus'>На жаль, замовник відмовив Вам</p>
            case 'generated':
                return <div className='requestConfirmationButtons'>
                    <MyButton style={{ backgroundColor: 'rgb(0,190,0)' }}>Підтвердити</MyButton>
                    <MyButton style={{ backgroundColor: 'rgb(200,30,0)' }}>Відхилити</MyButton>
                </div>
            case 'applied':
                return <p className='appliedRequestStatus'>Очікуємо на рішення замовника</p>
            case 'confirmed':
                if(advert?.status === 'finished') return <p className='finishedAdvertStatus'>Ви виконали це замовлення</p>
                return <p className='confirmedRequestStatus'>Ви виконуєте це замовлення</p>
            default:
                return <p>Очікуємо</p>
        }
    }
    return (
        <li className='userRequestItem' key={advert?.id} >
            <AdvertItemHeader
                advert={advert}
                onClick={() => navigate(path)}
            />
            {
                renderSwitch(status)
            }
        </li>
    )
}
