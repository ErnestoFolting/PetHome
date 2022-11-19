import { React, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AdvertService from '../../API/AdvertService'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import './CertainAdvert.css'
import { useNavigate, generatePath } from 'react-router-dom'
import { MyModal } from '../../UI/MyModal/MyModal'
import Advert from '../../Components/Advert/Advert'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index.js'


const CertainAdvert = () => {
    const params = useParams()
    const [advert, setAdvert] = useState({ ownerId: '', owner: { surname: '', name: '' } })
    const [modalVisible, setModalVisible] = useState(false);
    const { store } = useContext(Context);
    const [fetchCertainAdvert, loading, error] = useFetching(async () => {
        const advertResponse = await AdvertService.getCertainAdvert(params.id)
        setAdvert(advertResponse)
    });


    const navigate = useNavigate()
    const pathToProfile = generatePath("/users/:id", {
        id: advert?.ownerId
    });

    useEffect(() => {
        async function fetchData() {
            try {
                fetchCertainAdvert()
            } catch (e) {
                setModalVisible(true)
            } 
        }
        fetchData();

    }, []);

    return (
        <div className='Advert'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            {loading
                ? <MyLoader/>
                : <Advert
                    advert={advert}
                    pathToProfile={pathToProfile}
                    navigate={navigate}
                />
            }
        </div>
    )
}

export default observer(CertainAdvert)
