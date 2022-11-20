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

export const CreateAdvert = () => {

  const [advertData, setAdvertData] = useState({ name: '', description: '', cost: '', location: '', startTime: '', endTime: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendar, setCalendar] = useState([Date.now()]);
  const [fetching, isLoading, error] = useFetching(async () => {
    await AdvertService.createAdvert(advertData)
  })

  const navigate = useNavigate()

  function setCalendarData(values) {
    setCalendar(values)
    console.log()
    if (values.length === 1) {
      setAdvertData({ ...advertData, startTime: values[0]?.format().split('/').join('-'), endTime: values[0]?.format().split('/').join('-') })

    } else {
      setAdvertData({ ...advertData, startTime: values[0]?.format().split('/').join('-'), endTime: values[1]?.format().split('/').join('-') })
    }
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
            value={advertData.photo}
            onChange={e => setAdvertData({ ...advertData, photo: e.target.value })}
            type="file"
            label='Прикріпіть фото'
          />
          <InputWithLabel
            value={advertData.cost}
            onChange={e => setAdvertData({ ...advertData, cost: e.target.value })}
            type="number"
            label='Вартість'
          />
          <InputWithLabel
            value={advertData.location}
            onChange={e => setAdvertData({ ...advertData, location: e.target.value })}
            type="text"
            label='Локація'
            placeholder='Введіть локацію'
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
