import React from 'react'
import AdvertItem from '../AdvertItem/AdvertItem'
import './AdvertList.css'

export const AdvertList = ({ adverts }) => {
    if (!adverts.length) {
        return <div>
            <h1 style={{ textAlign: 'center' }}>
                Оголошень поки немає.
            </h1>
        </div>
    }
    return (
        <ul>
            {adverts.map((advert) =>
                <AdvertItem advert={advert} key={advert.id} />
            )}
        </ul>
    )
}
