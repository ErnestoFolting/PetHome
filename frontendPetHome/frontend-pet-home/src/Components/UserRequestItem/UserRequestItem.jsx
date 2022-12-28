import { React, useState } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'
import './UserRequestItem.css'
import { useNavigate, generatePath } from 'react-router-dom'
import { useFetching } from '../../Hooks/useFetching'
import RequestService from '../../API/RequestService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'

export const UserRequestItem = ({ advert, status, requestId, update, setUpdate, ...props }) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: advert?.id
    });

    const [modalVisible, setModalVisible] = useState(false);

    const [acceptGeneratedRequest, loader, error] = useFetching(async () => {
        await RequestService.acceptGeneratedRequest(requestId)
    })
    const [fetchDeleteRequest, loader2, error2] = useFetching(async () => {
        await RequestService.deleteRequest(requestId)
    })
    async function acceptRequest() {
        try {
            await acceptGeneratedRequest()
            setUpdate(update + requestId)
        } catch (e) {
            setModalVisible(true)
        }
    }
    async function deleteRequest() {
        try {
            await fetchDeleteRequest()
            setUpdate(update + requestId)
        } catch (e) {
            setModalVisible(true)
        }
    }
    function renderSwitch(status) {
        switch (status) {
            case 'rejected':
                return <div className='rejectedRequestStatus'>
                    <p>На жаль, замовник відмовив Вам</p>
                    <MyButton onClick={deleteRequest}>Видалити заявку</MyButton>
                </div>
            case 'generated':
                return <div className='requestConfirmationStatus'>
                    <p>Пропозиція згенерована системою</p>
                    <div className='requestConfirmationButtons'>
                        <MyButton style={{ backgroundColor: 'rgb(0,190,0)' }} onClick={acceptRequest}>Підтвердити</MyButton>
                        <MyButton style={{ backgroundColor: 'rgb(228, 74, 74)' }} onClick={deleteRequest}>Відхилити</MyButton>
                    </div>
                </div>
            case 'applied':
                return <div className='appliedRequestStatus'>
                    <p>Очікуємо на рішення замовника</p>
                    <MyButton onClick={deleteRequest}>Відмінити заявку</MyButton>
                </div>
            case 'confirmed':
                if (advert?.status === 'finished') return <div className='finishedAdvertStatus'>
                    <p>Ви виконали це замовлення</p>
                    <MyButton onClick={deleteRequest}>Видалити</MyButton>
                </div>
                return <p className='confirmedRequestStatus'>Ви виконуєте це замовлення</p>
            default:
                return <p>Очікуємо</p>
        }
    }
    if (loader || loader2) return <MyLoader />
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
