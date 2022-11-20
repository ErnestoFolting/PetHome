import React from 'react'
import AdvertItem from '../AdvertItem/AdvertItem'
import { UserAdvertItem } from '../UserAdvertItem/UserAdvertItem'
import './AdvertList.css'

export const AdvertList = ({ userAdverts, adverts }) => {
    if (!adverts.length) {
        return <div>
            <h1 style={{ textAlign: 'center' }}>
                Оголошень поки немає.
            </h1>
        </div>
    }
    if (userAdverts) {
        return (<ul>
            {adverts.map((advert) =>
                <UserAdvertItem advert={advert} key={advert.id} />
            )}
        </ul>)
    }
    return (
        <ul>
            {adverts.map((advert) =>
                <AdvertItem advert={advert} key={advert.id} />
            )}
        </ul>
    )
}
