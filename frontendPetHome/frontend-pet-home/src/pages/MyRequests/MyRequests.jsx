import { React, useState, useEffect } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import './MyRequests.css'
import UserDataService from '../../API/UserDataService'
import AdvertItem from '../../Components/AdvertItem/AdvertItem'
import { UserRequestItem } from '../../Components/UserRequestItem/UserRequestItem'

export const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchUserRequests, loading, error] = useFetching(async () => {
        const requestsResponse = await UserDataService.getUserRequests()
        setMyRequests(requestsResponse)
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUserRequests()
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
                    <h1 style={{ textAlign: 'center', marginTop: '30px' }}> Ваші заявки</h1>
                    <ul>
                        {myRequests.map((el) =>
                            <UserRequestItem
                                advert={el.advert} key={el.id} status = {el.status}
                            />)}
                    </ul>
                </div>
            }
        </div>
    )
}
