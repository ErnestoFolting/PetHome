import { React, useState } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyForm } from '../../UI/Form/MyForm'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import style from './UserAdvertRedoForm.module.css'
import { useJsApiLoader } from '@react-google-maps/api'
import { LocationAutoComplete } from '../LocationAutoComplete/LocationAutoComplete'
import { useFetching } from '../../Hooks/useFetching'
import UserDataService from '../../API/UserDataService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { Calendar, DateObject, getAllDatesInRange } from 'react-multi-date-picker'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const UserAdvertRedoForm = ({ previousData, setRedoModalVisible, setAdvertRedoVisible }) => {
    const [file, setFile] = useState(previousData?.photoFilePath);
    const [calendar, setCalendar] = useState(getAllDatesInRange([new DateObject(previousData.startTime), new DateObject(previousData.endTime)]));
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [redoData, setRedoData] = useState({ startTime: previousData?.startTime, endTime: previousData?.endTime, cost: previousData?.cost, description: previousData?.description, location: previousData?.location, locationLat: previousData?.locationLat, locationLng: previousData?.locationLng, name: previousData?.name });
    const [modalVisible, setModalVisible] = useState(false);
    const [fetching, isLoading, error] = useFetching(async () => {
        const formData = new FormData();
        formData.append('name', redoData?.name)
        formData.append('cost', redoData?.cost)
        formData.append('description', redoData?.description)
        formData.append('location', redoData?.location)
        formData.append('locationLat', String(redoData?.locationLat)?.replace('.', ','))
        formData.append('locationLng', String(redoData?.locationLng)?.replace('.', ','))
        formData.append('startTime', redoData?.startTime)
        formData.append('endTime', redoData?.endTime)
        formData.append('advertPhoto', file)
        await UserDataService.redoUserAdvert(formData, previousData?.id)
    })
    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: MAPS_KEY,
            libraries
        }
    )

    function locationSet(lat, lng, description) {
        setRedoData({ ...redoData, locationLat: lat, locationLng: lng, location: description })
    }

    function setCalendarData(values) {
        setCalendar(values)
        if (values.length === 1) {
            setRedoData({ ...redoData, startTime: values[0]?.format().split('/').join('-'), endTime: values[0]?.format().split('/').join('-') })
        } else {
            setRedoData({ ...redoData, startTime: values[0]?.format().split('/').join('-'), endTime: values[1]?.format().split('/').join('-') })
        }
    }

    async function redoAdvert(e) {
        e.preventDefault()
        try {
            await fetching()
            setRedoModalVisible(false)
            setAdvertRedoVisible(false)
        } catch (e) {
            setModalVisible()
        }
    }
    if (isLoading) return <MyLoader />
    return (
        <MyForm className={style.form}>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            <div className={style.calendar}>
                <MyModal title='Оберіть дати' visible={calendarVisible} setVisible={setCalendarVisible} style={{ backgroundColor: 'rgba(49,47,47,255)' }}>
                    <Calendar
                        rangeHover
                        value={calendar}
                        onChange={setCalendarData}
                        range
                        minDate={new Date()}
                        maxDate={new Date().setMonth(new Date().getMonth() + 2)}
                        monthsShown={1}
                        className="bg-dark"
                    />
                </MyModal>
            </div>
            <InputWithLabel
                value={redoData.name}
                onChange={e => setRedoData({ ...redoData, name: e.target.value })}
                type="text"
                label='Назва'
                placeholder='Введіть назву'
            />
            <div>
                <label>Опис</label>
                <textarea
                    value={redoData.description}
                    onChange={e => setRedoData({ ...redoData, description: e.target.value })}
                    type="text"
                    placeholder='Введіть опис'
                />
            </div>
            <InputWithLabel
                onChange={e => setFile(e.target.files[0])}
                type="file"
                label='Нове фото тварини'
            />
            <InputWithLabel
                value={redoData.cost}
                onChange={e => setRedoData({ ...redoData, cost: e.target.value })}
                type="number"
                label='Вартість'
            />
            <LocationAutoComplete
                isLoaded={isLoaded}
                locationSet={locationSet}
                previousValue={previousData?.location}
            />
            <div className='createAdvertButtons'>
                <p>Дати</p>
                <MyButton style={{ marginBottom: '10px', backgroundColor: 'rgba(35, 145, 241, 1)' }} onClick={(e) => { e.preventDefault(); setCalendarVisible(true) }}>Обрати дати</MyButton>
            </div>
            <MyButton onClick={redoAdvert}>Редагувати</MyButton>
        </MyForm>
    )
}
