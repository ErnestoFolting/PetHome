import React from 'react'
import { AdvertHeader } from '../AdvertHeader/AdvertHeader'
import { UserInRequest } from '../UserInRequest/UserInRequest'
import './MyAdvert.css'

export const MyAdvert = ({ advert, ...props }) => {
  return (
    <div className='myAdvert'>
      <div className='myAdvertHeader'>
        <AdvertHeader advert={advert} />
      </div>
      <div className='myAdvertRequests'>
        <h3>Відгукнулися</h3>
        {
          advert?.requests?.length === 0
            ? <p style={{textAlign:'center'}}>Поки ще ніхто не відгукнувся.</p>
            : <ul>
              {advert?.requests?.map((el) =>
                <UserInRequest userData={el.user} />
              )}
            </ul>
        }
      </div>
    </div>
  )
}

