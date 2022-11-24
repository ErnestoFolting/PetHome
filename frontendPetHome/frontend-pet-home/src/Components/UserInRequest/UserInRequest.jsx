import { React, useState } from 'react'
import './UserInRequest.css'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../../UI/buttons/MyButton';
import { useFetching } from '../../Hooks/useFetching';
import { MyModal } from '../../UI/MyModal/MyModal';
import RequestService from '../../API/RequestService';
import { MyLoader } from '../../UI/Loader/MyLoader';

export const UserInRequest = ({ userData, requestId, performer, update, ...props }) => {
    const navigate = useNavigate();
    function navigateTo() {
        navigate('/users/' + userData.id)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const [sendConfirmRequest, loader, error] = useFetching(async () => {
        await RequestService.confirmRequest(requestId)
    })
    const [sendRejectRequest, loader2, error2] = useFetching(async () => {
        await RequestService.rejectRequest(requestId)
    })
    async function accept() {
        try {
            await sendConfirmRequest()
            update()
        } catch (e) {
            setModalVisible(true)
        }

    }
    async function reject() {
        try {
            await sendRejectRequest()
            update(requestId)
        } catch (e) {
            setModalVisible(true)
        }
    }
    return (
        <div className='userInRequest'>
            {loader || loader2
                ? <MyLoader />
                : <li key={userData?.id} className='userInRequestContent'>
                    <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{[error,error2]}</MyModal>
                    <div className='userInRequestPhoto' onClick={navigateTo} >
                        <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                        <p style={{ fontWeight: '600' }}>{userData?.surname} {userData?.name}</p>
                    </div>

                    {performer
                        ? <p className='chosenPerformer'>Ви обрали цього виконавця.</p>
                        : <div className='userInRequestButtons'>
                            <MyButton style={{ backgroundColor: 'rgb(0,150,0)' }} onClick={accept}> Прийняти </MyButton>
                            <MyButton style={{ backgroundColor: 'rgb(200,0,0)' }} onClick={reject}> Відхилити </MyButton>
                        </div>
                    }
                </li>
            }

        </div>
    )
}
