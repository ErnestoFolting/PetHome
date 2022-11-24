import { React, useState } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'
import './UserRequestItem.css'
import { useNavigate, generatePath } from 'react-router-dom'
import { useFetching } from '../../Hooks/useFetching'
import RequestService from '../../API/RequestService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'

export const UserRequestItem = ({ advert, status, requestId, update, ...props }) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: advert?.id
    });

    const [modalVisible, setModalVisible] = useState(false);

    const [acceptGeneratedRequest, loader, error] = useFetching(async () => {
        await RequestService.acceptGeneratedRequest(requestId)
    })
    const [rejectGeneratedRequest, loader2, error2] = useFetching(async () => {
        await RequestService.rejectGeneratedRequest(requestId)
    })

    async function acceptRequest() {
        try {
            await acceptGeneratedRequest()
            update(requestId)
        } catch (e) {
            setModalVisible(true)
        }
    }
    async function rejectRequest() {
        try {
            await rejectGeneratedRequest()
            update(requestId)
        } catch (e) {
            setModalVisible(true)
        }
    }
    function renderSwitch(status) {
        switch (status) {
            case 'rejected':
                return <p className='rejectedRequestStatus'>На жаль, замовник відмовив Вам</p>
            case 'generated':
                return <div className='requestConfirmationButtons'>
                    <MyButton style={{ backgroundColor: 'rgb(0,190,0)' }} onClick={acceptRequest}>Підтвердити</MyButton>
                    <MyButton style={{ backgroundColor: 'rgb(200,30,0)' }} onClick={rejectRequest}>Відхилити</MyButton>
                </div>
            case 'applied':
                return <p className='appliedRequestStatus'>Очікуємо на рішення замовника</p>
            case 'confirmed':
                if (advert?.status === 'finished') return <p className='finishedAdvertStatus'>Ви виконали це замовлення</p>
                return <p className='confirmedRequestStatus'>Ви виконуєте це замовлення</p>
            default:
                return <p>Очікуємо</p>
        }
    }
    if(loader||loader2) return <MyLoader/>
    return (
        <li className='userRequestItem' key={advert?.id} >
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{[error, error2]}</MyModal>
            <AdvertItemHeader
                advert={advert}
                onClick={() => navigate(path)}
            />
            <div className='switchPart'>
                {
                    renderSwitch(status)
                }
            </div>
        </li>
    )
}
