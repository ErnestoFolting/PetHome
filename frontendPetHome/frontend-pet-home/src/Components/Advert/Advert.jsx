import { React } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { observer } from 'mobx-react-lite'
import convertDate from '../../Common/DateConverter'
import './Advert.css'

const Advert = ({ advert, pathToProfile, navigate }) => {
    return (
        <div className='certainAdvertContent'>
            <div className='imgBlock'>
                <div className='imageInfo'>
                    <img src={require('../../Assets/hairy.jpeg')} alt='photo' />
                    📍{advert.location}
                </div>
                <div className='headerInfo'>
                    <h2>{advert.name}</h2>
                    <div className='dates'>{convertDate(advert.startTime)} - {convertDate(advert.endTime)}</div>
                    Cтатус: {advert.status}
                    <div className='advertPrice'> {advert.cost} ГРН </div>
                </div>
            </div>
            <div className='advertInfoBlock'>
                <h3>Опис</h3>
                <p>{advert.description}</p>
            </div>
            <div className='ownerInfoBlock'>
                <h3>Власник</h3>
                <div className='ownerInfoContent'>
                    <div className='ownerPhoto'>
                        <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                        {advert?.owner?.surname} {advert?.owner?.name}
                    </div>
                    <div className='ownerInfo'>
                        <MyButton onClick={() => navigate(pathToProfile)}>Переглянути профіль</MyButton>
                        <MyButton style={{ backgroundColor: 'lightgreen' }} onClick={() => console.log('request')}>Подати заявку</MyButton>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default observer(Advert);
