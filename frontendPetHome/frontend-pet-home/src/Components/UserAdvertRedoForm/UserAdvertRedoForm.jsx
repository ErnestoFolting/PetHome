import { React, useState, useEffect } from 'react'
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
import { CreateAdvertSchema } from '../../ValidationSchemas/CreateAdvertSchema'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import FileValidator from '../../ValidationSchemas/FileValidator'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const UserAdvertRedoForm = ({ previousData, setRedoModalVisible, setAdvertRedoVisible }) => {
    const [file, setFile] = useState(previousData?.photoFilePath);
    const [redoData, setRedoData] = useState();
    const [advertDates, setAdvertDates] = useState({ startTime: previousData?.startTime, endTime: previousData?.endTime });
    const [location, setLocation] = useState({ locationLat: String(previousData?.locationLat)?.replace('.', ','), locationLng: String(previousData?.locationLng)?.replace('.', ','), location: previousData?.location });
    const [needFetch, setNeedFetch] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [calendar, setCalendar] = useState(getAllDatesInRange([new DateObject(previousData.startTime), new DateObject(previousData.endTime)]));
    const [calendarVisible, setCalendarVisible] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [fetching, isLoading, error] = useFetching(async () => {
        const formData = new FormData();
        Object.keys(redoData).forEach(function (key, index) {
            formData.append(key, Object.values(redoData)[index])
        })
        Object.keys(advertDates).forEach(function (key, index) {
            formData.append(key, Object.values(advertDates)[index])
        })
        Object.keys(location).forEach(function (key, index) {
            formData.append(key, Object.values(location)[index])
        })
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
        setLocation({ locationLat: String(lat)?.replace('.', ','), locationLng: String(lng)?.replace('.', ','), location: description })
    }

    function setCalendarData(values) {
        setCalendar(values)
        if (values.length === 1) {
            setAdvertDates({ startTime: values[0]?.format().split('/').join('-'), endTime: values[0]?.format().split('/').join('-') })
        } else {
            setAdvertDates({ startTime: values[0]?.format().split('/').join('-'), endTime: values[1]?.format().split('/').join('-') })
        }
    }

    const redoAdvert = async (data) => {
        console.log('check')
        if (data && location && file && FileValidator(file) && advertDates) {
            setRedoData(data)
            setNeedFetch(!needFetch)
        } else {
            setShowValidation(true)
            if (file && !FileValidator(file)) setFile(undefined)
        }
    }

    useEffect(() => {
        async function func() {
            try {
                await fetching()
                setRedoModalVisible(false)
                setAdvertRedoVisible(false)
            } catch (e) {
                setModalVisible(true)
            }
        }
        if (redoData) {
            func()
        }
    }, [needFetch])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(CreateAdvertSchema),
        defaultValues: {
            name: previousData?.name,
            description: previousData?.description,
            cost: previousData?.cost
        }
    });

    if (isLoading) return <MyLoader />
    return (
        <MyForm className={style.form} onSubmit={handleSubmit(redoAdvert)}>
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
                {...register("name")}
                type="text"
                label='Назва'
                placeholder='Введіть назву'
                isNotValid={errors?.name}
            />
            <div>
                <label>Опис</label>
                <textarea
                    {...register("description")}
                    type="text"
                    placeholder='Введіть опис'
                    style={errors?.description && { boxShadow: "0 1px 8px 0 rgba(252, 9, 9, 0.2), 0 2px 10px 0 rgba(248, 3, 3, 0.19)" }}
                />
            </div>
            <InputWithLabel
                onChange={e => setFile(e.target.files[0])}
                type="file"
                label='Нове фото тварини'
                isNotValid={!file && showValidation}
                accept=".jpg,.jpeg,.png"
            />
            <InputWithLabel
                {...register("cost")}
                type="number"
                label='Вартість'
                isNotValid={errors?.cost}
            />
            <LocationAutoComplete
                isLoaded={isLoaded}
                locationSet={locationSet}
                previousValue={previousData?.location}
                isNotValid={!location && showValidation}
            />
            <div className='createAdvertButtons'>
                <p>Дати</p>
                <MyButton
                    style={{ marginBottom: '10px', backgroundColor: 'rgba(35, 145, 241, 1)' }}
                    isNotValid={!advertDates && showValidation}
                    onClick={(e) => { e.preventDefault(); setCalendarVisible(true) }}
                >Обрати дати</MyButton>
            </div>
            <MyButton type="submit" style={{ height: '35px' }}>Редагувати</MyButton>
        </MyForm>
    )
}
