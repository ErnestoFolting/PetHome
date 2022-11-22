import { React, useState, useEffect } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { observer } from 'mobx-react-lite'
import './Advert.css'
import { AdvertHeader } from '../AdvertHeader/AdvertHeader'
import { useFetching } from '../../Hooks/useFetching'
import RequestService from '../../API/RequestService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import UserDataService from '../../API/UserDataService'

const Advert = ({ advert, pathToProfile, navigate }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [userRequests, setUserRequests] = useState([]);
    const [sendRequestOnAdvert, loading, error] = useFetching(async () => {
        await RequestService.sendRequest(advert?.id)
    });
    const [checkIfRequestSent, loading2, error2] = useFetching(async () => {
        setUserRequests(await UserDataService.getUserRequests())
    });
    function sendRequest() {
        async function sendRequest() {
            try {
                await sendRequestOnAdvert()
            } catch (e) {
                setModalVisible(true)
            }
        }
        sendRequest();
    }
    useEffect(() => {
        async function fetchRequests() {
            try {
                await checkIfRequestSent()
            } catch (e) {
                setModalVisible(true)
            }
        }
        fetchRequests();
    }, [loading]);
    if (loading || loading2) return <MyLoader />
    return (
        <div className='certainAdvertContent'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error} {error2}</MyModal>
            <div className='advertImageBlock'>
                <AdvertHeader
                    advert={advert}
                />
            </div>
            <div className='advertInfoBlock'>
                <h3>Опис</h3>
                <p>{advert.description}</p>
            </div>
            <div className='ownerInfoBlock'>
                <h3>Власник</h3>
                <div className='ownerInfoContent'>
                    <div className='ownerPhoto'>
                        <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                        {advert?.owner?.surname} {advert?.owner?.name}
                    </div>
                    <div className='ownerInfo'>
                        {
                            userRequests?.some((el) => el?.advertId === advert?.id)
                                ? <p>Ви вже подали заявку</p>
                                :
                                <MyButton style={{ backgroundColor: 'lightgreen' }} onClick={sendRequest}>Подати заявку</MyButton>
                        }

                        <MyButton onClick={() => navigate(pathToProfile)}>Переглянути профіль</MyButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default observer(Advert);
