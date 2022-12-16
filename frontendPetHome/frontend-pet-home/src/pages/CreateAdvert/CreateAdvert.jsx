import { React, useState, useEffect } from 'react'
import { MyForm } from '../../UI/Form/MyForm'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import { MyButton } from '../../UI/buttons/MyButton'
import './CreateAdvert.css'
import { useFetching } from '../../Hooks/useFetching'
import AdvertService from '../../API/AdvertService'
import { useNavigate } from 'react-router-dom'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"
import { LocationAutoComplete } from '../../Components/LocationAutoComplete/LocationAutoComplete'
import { useJsApiLoader } from '@react-google-maps/api'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAdvertSchema } from '../../ValidationSchemas/CreateAdvertSchema'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const CreateAdvert = () => {

  const [advertData, setAdvertData] = useState();
  const [showValidation, setShowValidation] = useState(false);
  const [file, setFile] = useState();
  const [advertDates, setAdvertDates] = useState();
  const [location, setLocation] = useState();
  const [needFetch, setNeedFetch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendar, setCalendar] = useState([Date.now()]);

  const [fetching, isLoading, error] = useFetching(async () => {
    const formData = new FormData();
    Object.keys(advertData).forEach(function (key, index) {
      formData.append(key, Object.values(advertData)[index])
    })
    Object.keys(advertDates).forEach(function (key, index) {
      formData.append(key, Object.values(advertDates)[index])
    })
    Object.keys(location).forEach(function (key, index) {
      formData.append(key, Object.values(location)[index])
    })
    formData.append('petPhoto', file)
    await AdvertService.createAdvert(formData)
  })

  const { isLoaded } = useJsApiLoader(
    {
      id: 'google-map-script',
      googleMapsApiKey: MAPS_KEY,
      libraries
    }
  )

  function setCalendarData(values) {
    setCalendar(values)
    if (values.length === 1) {
      setAdvertDates({ startTime: values[0]?.format().split('/').join('-'), endTime: values[0]?.format().split('/').join('-') })
    } else {
      setAdvertDates({ startTime: values[0]?.format().split('/').join('-'), endTime: values[1]?.format().split('/').join('-') })
    }
  }

  const addNewAdvert = async (data) => {
    if (data && location && file && advertDates) {
      setAdvertData(data)
      setNeedFetch(!needFetch)
    } else {
      setShowValidation(true)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    async function func() {
      try {
        await fetching()
        navigate('/adverts')
      } catch (e) {
        setModalVisible(true)
      }
    }
    if (advertData) {
      func()
    }
  }, [needFetch])

  function locationSet(lat, lng, description) {
    setLocation({ locationLat: String(lat)?.replace('.', ','), locationLng: String(lng)?.replace('.', ','), location: description })
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(CreateAdvertSchema) });

  return (
    <div className='createAdvertPage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
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
      {isLoading
        ? <MyLoader />
        : <MyForm title='Створення оголошення' onSubmit={handleSubmit(addNewAdvert)}>
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
            label='Фото тварини'
            isNotValid={!file && showValidation}
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
            isNotValid={!file && showValidation}
          />
          <div className='createAdvertButtons'>
            <p>Дати</p>
            <MyButton
              style={{ marginBottom: '10px', backgroundColor: 'rgba(35, 145, 241, 1)' }}
              isNotValid={!advertDates && showValidation}
              onClick={(e) => { e.preventDefault(); setCalendarVisible(true) }}
            >Обрати дати</MyButton>
            <MyButton style={{ marginTop: '20px' }} type="submit">Створити оголошення</MyButton>
          </div>
        </MyForm>
      }
    </div>
  )
}
