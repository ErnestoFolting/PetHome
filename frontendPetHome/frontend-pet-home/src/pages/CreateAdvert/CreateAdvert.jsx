import { React, useState } from 'react'
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

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const CreateAdvert = () => {

  const [advertData, setAdvertData] = useState({ name: '', description: '', cost: '', startTime: '', endTime: '', locationLat: '', locationLng: '', location: '' });
  const [file, setFile] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendar, setCalendar] = useState([Date.now()]);
  const [fetching, isLoading, error] = useFetching(async () => {
    const formData = new FormData();
    formData.append('name', advertData?.name)
    formData.append('description', advertData?.description) 
    formData.append('cost', advertData?.cost)
    formData.append('startTime', advertData?.startTime)
    formData.append('endTime', advertData?.endTime)
    formData.append('locationLat', String(advertData?.locationLat)?.replace('.',','))
    formData.append('locationLng', String(advertData?.locationLng)?.replace('.',','))
    formData.append('location', advertData?.location)
    formData.append('file', file)
    console.log('formData',formData)
    await AdvertService.createAdvert(formData)
  })

  const { isLoaded } = useJsApiLoader(
    {
      id: 'google-map-script',
      googleMapsApiKey: MAPS_KEY,
      libraries
    }
  )

  const navigate = useNavigate()

  function setCalendarData(values) {
    setCalendar(values)
    if (values.length === 1) {
      setAdvertData({ ...advertData, startTime: values[0]?.format().split('/').join('-'), endTime: values[0]?.format().split('/').join('-') })
    } else {
      setAdvertData({ ...advertData, startTime: values[0]?.format().split('/').join('-'), endTime: values[1]?.format().split('/').join('-') })
    }
  }

  function locationSet(lat, lng, description) {
    setAdvertData({ ...advertData, locationLat: lat, locationLng: lng, location: description })
  }
  function handleChange(event) {
    setFile(event.target.files[0])
  }
  const addNewAdvert = async (e) => {
    e.preventDefault()
    try {
      await fetching()
      navigate('/adverts')
    } catch (e) {
      setModalVisible(true)
    } finally {
      setAdvertData({})
    }
  }
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
        : <MyForm title='Створення оголошення'>
          <InputWithLabel
            value={advertData.name}
            onChange={e => setAdvertData({ ...advertData, name: e.target.value })}
            type="text"
            label='Назва'
            placeholder='Введіть назву'
          />
          <div>
            <label>Опис</label>
            <textarea
              value={advertData.description}
              onChange={e => setAdvertData({ ...advertData, description: e.target.value })}
              type="text"
              placeholder='Введіть опис'
            />
          </div>
          <InputWithLabel
            onChange={handleChange}
            type="file"
            label='Прикріпіть фото'
          />
          <InputWithLabel
            value={advertData.cost}
            onChange={e => setAdvertData({ ...advertData, cost: e.target.value })}
            type="number"
            label='Вартість'
          />
          <LocationAutoComplete
            isLoaded={isLoaded}
            locationSet={locationSet}
          />
          <div className='createAdvertButtons'>
            <p>Дати</p>
            <MyButton style={{ marginBottom: '10px', backgroundColor: 'rgba(35, 145, 241, 1)' }} onClick={(e) => { e.preventDefault(); setCalendarVisible(true) }}>Обрати дати</MyButton>
            <MyButton style={{ marginTop: '20px' }} onClick={addNewAdvert}>Створити оголошення</MyButton>
          </div>
        </MyForm>
      }
    </div>
  )
}
