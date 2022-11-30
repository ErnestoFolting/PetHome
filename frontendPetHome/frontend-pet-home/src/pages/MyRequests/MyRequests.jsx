import { React, useState, useEffect, useContext } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import './MyRequests.css'
import UserDataService from '../../API/UserDataService'
import { UserRequestItem } from '../../Components/UserRequestItem/UserRequestItem'
import { Context } from '../../index.js'

export const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [update, setUpdate] = useState('');
    const [fetchUserRequests, loading, error] = useFetching(async () => {
        const requestsResponse = await UserDataService.getUserRequests()
        setMyRequests(requestsResponse)
    });
    const { store } = useContext(Context);
    useEffect(() => {
        async function fetchData() {
            try {
                await fetchUserRequests()
            } catch (e) {
                setModalVisible(true)
            }
        }
        fetchData();
    }, [update]);
    useEffect(() => {
        console.log('CHEEEEEECK')
        if (store?.myHubConnection) {
            store?.myHubConnection?.on("Send", (postedAdvert) => {
                console.log("currentConnection")
                setUpdate(postedAdvert.id)
            })
        }
    }, [store?.myHubConnection]);
    return (
        <div className='userAdvertsPage'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            {loading
                ? <MyLoader />
                : <div className='userAdvertsContent'>
                    <h1 style={{ textAlign: 'center', marginTop: '30px' }}> Ваші заявки</h1>
                    {
                        myRequests?.length === 0
                            ? <h1 style={{ textAlign: 'center' }}>Заявок поки немає.</h1>
                            : <ul>
                                {myRequests.map((el) =>
                                    <UserRequestItem
                                        advert={el.advert}
                                        key={el.id}
                                        status={el.status}
                                        requestId={el.id}
                                        update={setUpdate}
                                    />)}
                            </ul>
                    }

                </div>
            }
        </div>
    )
}
