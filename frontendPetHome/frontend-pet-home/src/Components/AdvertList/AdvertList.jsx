import React from 'react'
import AdvertItem from '../AdvertItem/AdvertItem'
import { UserAdvertItem } from '../UserAdvertItem/UserAdvertItem'
import './AdvertList.css'
import { Pagination } from '../Pagination/Pagination'

export const AdvertList = ({ userAdverts, adverts, pagesArray, params, setParams }) => {
    if (!adverts.length) {
        return <div>
            <h1 style={{ textAlign: 'center' }}>
                Оголошень поки немає.
            </h1>
        </div>
    }

    return (
        <div style={{ marginBottom: '50px' }}>
            <ul>
                {adverts.map((advert) =>
                    userAdverts ? <UserAdvertItem advert={advert} key={advert.id} /> : <AdvertItem advert={advert} key={advert.id} />
                )}
            </ul>
            {pagesArray &&
                <Pagination
                    pagesArray={pagesArray}
                    params={params}
                    setParams={setParams}
                />
            }
        </div>

    )
}
