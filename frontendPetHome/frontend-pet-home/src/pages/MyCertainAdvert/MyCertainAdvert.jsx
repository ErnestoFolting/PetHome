import {React,useState,useEffect} from 'react'
import './MyCertainAdvert.css'
import { useParams } from 'react-router-dom'
import AdvertService from '../../API/AdvertService'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyAdvert } from '../../Components/MyAdvert/MyAdvert'

export const MyCertainAdvert = () => {
    const params = useParams()
    const [advert, setAdvert] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [fetchUserCertainAdvert, loading, error] = useFetching(async () => {
        const advertResponse = await AdvertService.getUserCertainAdvert(params.id)
        setAdvert(advertResponse)
    });

    useEffect(() => {
        async function fetchData() {
            try {
                fetchUserCertainAdvert()
            } catch (e) {
                setModalVisible(true)
            } 
        }
        fetchData();

    }, []);

    return (
        <div className='myCertainAdvert'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            {loading
                ? <MyLoader/>
                : <MyAdvert
                    advert={advert}
                />
            }
        </div>
    )
}
