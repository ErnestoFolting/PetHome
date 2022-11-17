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

export const CreateAdvert = () => {

  const [advertData, setAdvertData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [fetching, isLoading, error] = useFetching(async () => {
    await AdvertService.createAdvert(advertData)
  })

  const navigate = useNavigate()

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
          <div className='dates'>
            <InputWithLabel
              value={advertData.startTime}
              onChange={e => setAdvertData({ ...advertData, startTime: e.target.value })}
              type="date"
              label='Дата початку'
            />
            <InputWithLabel
              value={advertData.endTime}
              onChange={e => setAdvertData({ ...advertData, endTime: e.target.value })}
              type="date"
              label='Дата закінчення'
            />
          </div>
          <MyButton style={{ height: '35px' }} onClick={addNewAdvert}>Створити оголошення</MyButton>
        </MyForm>
      }
    </div>
  )
}
