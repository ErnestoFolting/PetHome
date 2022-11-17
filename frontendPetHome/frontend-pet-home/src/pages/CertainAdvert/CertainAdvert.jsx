import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdvertService from '../../API/AdvertService'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyButton } from '../../UI/buttons/MyButton'
import './CertainAdvert.css'

export const CertainAdvert = () => {
    const params = useParams()
    const [advert, setAdvert] = useState({ name: '', owner: { surname: 'Surname', name: 'Name' } })
    const [fetchCertainAdvert, loading, error] = useFetching(async () => {
        const advert = await AdvertService.getCertainAdvert(params.id)
        setAdvert(advert)
        console.log(advert.owner);
    });

    useEffect(() => {
        fetchCertainAdvert()
    }, []);

    return (
        <div className='Advert'>
            {loading
                ? <MyLoader />
                : <div className='certainAdvertContent'>
                    <div className='imgBlock'>
                        <div className='imageInfo'>
                            <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
                            📍{advert.location}
                        </div>
                        <div className='headerInfo'>
                            <h2>{advert.name}</h2>
                            <div style={{ color: 'grey' }}>{advert.startTime} - {advert.endTime}</div>
                            статус: {advert.status}
                            <h3 style={{ color: 'green' }}>{advert.cost} ГРН</h3>
                        </div>
                    </div>
                    <hr size="8" width="100%" color="lightsalmon" />
                    <div className='advertInfoBlock'>
                        <h3>Опис</h3>
                        <p>{advert.description}</p>
                    </div>
                    <hr size="2" width="100%" color="lightsalmon" />
                    <div className='ownerInfoBlock' style={{ fontSize: '2vh' }}>
                        <div className='ownerPhoto'>
                            <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                            {advert.owner.surname} {advert.owner.name}
                        </div>
                        <div className='ownerInfo'>
                            <MyButton style={{ marginTop: '15px', width: '40%', height:'25%' }} onClick={() => console.log('redirect')}>Переглянути профіль</MyButton>
                            <MyButton style={{ marginTop: '15px', width: '40%', height: '25%', backgroundColor: 'lightgreen' }} onClick={() => console.log('request')}>Подати заявку</MyButton>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
