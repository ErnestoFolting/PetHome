import { React, useState, useEffect } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import './MyAdverts.css'
import AdvertService from '../../API/AdvertService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { AdvertList } from '../../Components/AdvertList/AdvertList'

export const MyAdverts = () => {
    const [myAdverts, setMyAdverts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchUserAdverts, loading, error] = useFetching(async () => {
        const advertsResponse = await AdvertService.getUserAdverts()
        setMyAdverts(advertsResponse)
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUserAdverts()
            } catch (e) {
                setModalVisible(true)
            }
        }
        fetchData();
    }, []);
    return (
        <div className='userAdvertsPage'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            {loading
                ? <MyLoader />
                : <div className='userAdvertsContent'>
                    <h1 style={{ textAlign: 'center', marginTop:'30px' }}> Ваші оголошення</h1>
                    <AdvertList
                        userAdverts={true}
                        adverts={myAdverts}
                    />
                </div>
            }
        </div>
    )
}

