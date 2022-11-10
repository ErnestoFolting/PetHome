import React from 'react'
import AdvertItem from './AdvertItem'

export const AdvertList = ({ adverts }) => {
    if (!adverts.length) {
        return <div>
            <h1 style={{ textAlign: 'center' }}>
                Оголошень поки немає.
            </h1>
        </div>
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Adverts</h1>
            {adverts.map((advert) =>
                <AdvertItem advert={advert} key={advert.id} />
            )}
        </div>
    )
}
