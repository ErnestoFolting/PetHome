import { React, useState } from 'react'
import convertDate from '../../Common/DateConverter'
import { MyCalendar } from '../MyCalendar/MyCalendar'
import { DateObject, getAllDatesInRange } from "react-multi-date-picker"
import './AdvertHeader.css'
import { url } from '../../HTTP/index'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyModalConfirmation } from '../../UI/MyModal/MyModalConfirmation'
import { MyModal } from '../../UI/MyModal/MyModal'
import { useFetching } from '../../Hooks/useFetching'
import AdvertService from '../../API/AdvertService'
import { useNavigate } from 'react-router-dom'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { UserAdvertRedoForm } from '../UserAdvertRedoForm/UserAdvertRedoForm'


export const AdvertHeader = ({ advert, isCreatedByUser, setAdvertRedoVisible, ...props }) => {
    const imgPath = url + advert?.photoFilePath
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [redoModalVisible, setRedoModalVisible] = useState(false);
    const [deleteAdvertFetch, loading, error] = useFetching(async () => {
        await AdvertService.deleteAdvert(advert?.id)
    });

    function deleteAdvertConfirm(e) {
        e.preventDefault()
        if (advert?.ifHaveAppliedRequests) {
            setErrorModalVisible(true)
        } else {
            setConfirmationModalVisible(true)
        }
    }
    const navigate = useNavigate();
    async function deleteAdvert() {
        try {
            await deleteAdvertFetch()
            navigate('/myadverts')
        } catch (e) {
            setErrorModalVisible(true)
        }
    }
    function redoAdvert(e) {
        e.preventDefault()
        setRedoModalVisible(true)
        setAdvertRedoVisible(true)
    }
    if (loading) return <MyLoader />
    return (
        <div className='advertHeaderContent' {...props}>
            <MyModal title='Помилка' visible={errorModalVisible} setVisible={setErrorModalVisible} style={{ backgroundColor: 'rgb(228, 74, 74)', color: 'white' }}>{error ? error : "На це оголошення вже відгукнулись. Спочатку відхиліть заявки."}</MyModal>
            <MyModal title='Редагування оголошення' visible={redoModalVisible} setVisible={setRedoModalVisible} style={{ backgroundColor: 'lightsalmon', width: "30%", minWidth: '400px', fontSize: '20px' }}>
                <UserAdvertRedoForm
                    previousData={advert}
                    setRedoModalVisible={setRedoModalVisible}
                    setAdvertRedoVisible={setAdvertRedoVisible}
                />
            </MyModal>
            <MyModalConfirmation
                confirmationModalVisible={confirmationModalVisible}
                setConfirmationModalVisible={setConfirmationModalVisible}
                confirmedAction={deleteAdvert}
                deleteItem="оголошення"
            />
            <div className='advertHeaderName'>
                <h3>{advert.name}</h3>
                {isCreatedByUser &&
                    <div className='advertControlButtons'>
                        <MyButton onClick={redoAdvert}>Редагувати</MyButton>
                        <MyButton onClick={deleteAdvertConfirm}>Видалити</MyButton>
                    </div>
                }
            </div>
            <div className='imgBlock'>
                <div className='imageInfo'>
                    <img src={imgPath} alt='petPhoto' />
                    📍{advert?.location}
                </div>
                <div className='headerInfo'>
                    <div className='headerInfoContent'>
                        <div className='advertDates'>
                            <p style={{ fontSize: '18px' }}>{convertDate(advert.startTime).split('.').join('/')} - {convertDate(advert.endTime)}</p>
                            <MyCalendar
                                className="bg-dark"
                                monthsShown={1}
                                isMultiple={true}
                                dates={getAllDatesInRange([new DateObject(advert.startTime), new DateObject(advert.endTime)])}
                            />
                        </div>
                        <div className='advertPrice'>
                            <p> {advert.cost} ГРН </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
