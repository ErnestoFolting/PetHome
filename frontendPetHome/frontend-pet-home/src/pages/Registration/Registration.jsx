import { React, useState, useContext } from 'react'
import '../Registration/Registration.css'
import { RadioButton } from '../../UI/RadioButton/RadioButton'
import { MyButton } from '../../UI/buttons/MyButton'
import { useNavigate } from 'react-router-dom'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import { Link } from 'react-router-dom'
import { MyForm } from '../../UI/Form/MyForm'
import { Context } from '../../index'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'
import { LocationAutoComplete } from '../../Components/LocationAutoComplete/LocationAutoComplete'
import { useJsApiLoader } from '@react-google-maps/api'
const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']
export const Registration = () => {
  const [registrationData, setRegistrationData] = useState({ surname: '', name: '', sex: 0, file: '', email: '', phone: '', username: '', password: '', confirmPassword: '', locationLat:'', locationLng:'' });
  const { store } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetching, isLoading, error] = useFetching(async () => {
    await store.registration(registrationData)
  })

  const { isLoaded } = useJsApiLoader(
    {
      id: 'google-map-script',
      googleMapsApiKey: MAPS_KEY,
      libraries
    }
  )

  const navigate = useNavigate()

  const register = async (e) => {
    e.preventDefault()
    try {
      await fetching()
      navigate('/login')
    } catch (e) {
      setModalVisible(true)
    } finally {
      setRegistrationData({ surname: '', name: '', sex: 0, file: '', email: '', phone: '', username: '', password: '', confirmPassword: '', locationLat:'', locationLng:''})
    }
  }

  function locationSet(lat,lng){
    setRegistrationData({ ...registrationData, locationLat: lat, locationLng:lng})
  }
  return (
    <div className='registrationPage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
      {isLoading
        ? <MyLoader />
        :
        <MyForm title='Реєстрація'>
          <div className='names'>
            <InputWithLabel
              type='text'
              label='Прізвище'
              value={registrationData.surname}
              onChange={e => setRegistrationData({ ...registrationData, surname: e.target.value })}
            />
            <InputWithLabel
              type='text'
              label="Ім'я"
              value={registrationData.name}
              onChange={e => setRegistrationData({ ...registrationData, name: e.target.value })}
            />

          </div>
          <div className='sex'>
            <RadioButton
              label='Чоловік'
              value={registrationData.sex === 0}
              onChange={e => setRegistrationData({ ...registrationData, sex: 0 })}
            />
            <RadioButton
              label='Жінка'
              value={registrationData.sex === 1}
              onChange={e => setRegistrationData({ ...registrationData, sex: 1 })}
            />
          </div>
          <InputWithLabel
            type='file'
            label="Фото"
            value={registrationData.file}
            onChange={e => setRegistrationData({ ...registrationData, file: e.target.value })}
          />
          <InputWithLabel
            type='email'
            label="Email"
            value={registrationData.email}
            onChange={e => setRegistrationData({ ...registrationData, email: e.target.value })}
          />
          <InputWithLabel
            type='tel'
            label="Номер телефону"
            value={registrationData.phone}
            onChange={e => setRegistrationData({ ...registrationData, phone: e.target.value })}
          />
          <InputWithLabel
            type='text'
            label="Логін"
            value={registrationData.username}
            onChange={e => setRegistrationData({ ...registrationData, username: e.target.value })}
          />
          <InputWithLabel
            type='password'
            label="Пароль"
            value={registrationData.password}
            onChange={e => setRegistrationData({ ...registrationData, password: e.target.value })}
          />
          <InputWithLabel
            type='password'
            label="Підтвердження"
            placeholder='Введіть пароль'
            value={registrationData.confirmPassword}
            onChange={e => setRegistrationData({ ...registrationData, confirmPassword: e.target.value })}
          />
          <LocationAutoComplete
            isLoaded={isLoaded}
            locationSet={locationSet}
          />
          <p style={{ textAlign: 'center', color: 'rgba(255, 160, 122, 1)', width: '75%' }}>*В профілі користувача Ви зможете налаштувати дати коли Вам зручно сидіти з тваринами.</p>
          <MyButton onClick={register} style={{ height: '35px', marginTop: '20px' }}>Зареєструватись</MyButton>
        </MyForm>}

      <div className='loginRedirect'>
        <h3>Вже маєте акаунт?<Link to="/login"> Авторизуйтесь</Link></h3>
      </div>
    </div>
  )
}
