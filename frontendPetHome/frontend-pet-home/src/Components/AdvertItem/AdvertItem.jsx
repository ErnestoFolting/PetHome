import React from 'react'
import { useNavigate, generatePath } from 'react-router-dom'
import './AdvertItem.css'
import { AdvertItemHeader } from '../AdvertItemHeader/AdvertItemHeader'

const AdvertItem = (props) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: props?.advert?.id
    });

    return (
        <li onClick={() => navigate(path)} key={props?.advert?.id} className='advertItem'>
            <AdvertItemHeader
                advert = {props?.advert}
            />
        </li>
    );
}

export default AdvertItem;
