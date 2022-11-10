import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdvertService from '../../API/AdvertService'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import './CertainAdvert.css'

export const CertainAdvert = () => {
    const params = useParams()
    const [advert, setAdvert] = useState({})
    const [fetchCertainAdvert, loading, error] = useFetching(async () => {
        const advert = await AdvertService.getCertainAdvert(params.id)
        setAdvert(advert)
        console.log(advert);
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
                            <img src={require('../../Images/hairy.jpeg')} alt='photo' />
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
                        {advert.description}
                    </div>
                    <div className='ownerInfoBlock'>
                        OwnerId {advert.ownerId}
                    </div>
                </div>
            }
        </div>
    )
}
