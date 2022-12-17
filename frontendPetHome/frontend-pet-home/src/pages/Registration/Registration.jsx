import { React, useState, useContext, useEffect } from 'react'
import '../Registration/Registration.css'
import { RadioButton } from '../../UI/RadioButton/RadioButton'
import { MyButton } from '../../UI/buttons/MyButton'
import { useNavigate, Link } from 'react-router-dom'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import { MyForm } from '../../UI/Form/MyForm'
import { Context } from '../../index'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'
import { LocationAutoComplete } from '../../Components/LocationAutoComplete/LocationAutoComplete'
import { useJsApiLoader } from '@react-google-maps/api'
import { useForm } from 'react-hook-form';
import { RegistrationSchema } from '../../ValidationSchemas/RegistrationSchema'
import { yupResolver } from "@hookform/resolvers/yup";
import FileValidator from '../../ValidationSchemas/FileValidator'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const Registration = () => {
  const [showValidation, setShowValidation] = useState(false);
  const [location, setLocation] = useState();
  const [file, setFile] = useState();
  const [registrationData, setRegistrationData] = useState();
  const [needFetch, setNeedFetch] = useState(false);
  const { store } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);

  const [fetching, isLoading, error] = useFetching(async () => {
    const formData = new FormData()
    Object.keys(registrationData).forEach(function (key, index) {
      formData.append(key, Object.values(registrationData)[index])
    })
    Object.keys(location).forEach(function (key, index) {
      formData.append(key, Object.values(location)[index])
    })
    formData.append('userPhoto', file)
    await store.registration(formData)
  })

  const { isLoaded } = useJsApiLoader(
    {
      id: 'google-map-script',
      googleMapsApiKey: MAPS_KEY,
      libraries
    }
  )

  const navigate = useNavigate()

  const registration = async (data) => {
    if (data && location && file && FileValidator(file)) {
      setRegistrationData(data)
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
        navigate('/login')
      } catch (e) {
        setModalVisible(true)
      }
    }
    if (registrationData) {
      func()
    }
  }, [needFetch])

  function locationSet(lat, lng, description) {
    setLocation({ locationLat: String(lat)?.replace('.', ','), locationLng: String(lng)?.replace('.', ','), location: description })
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(RegistrationSchema) });

  return (
    <div className='registrationPage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
      {isLoading
        ? <MyLoader />
        :
        <MyForm title='Реєстрація' onSubmit={handleSubmit(registration)}>
          <div className='names'>
            <InputWithLabel
              type='text'
              label='Прізвище*'
              {...register("surname")}
              isNotValid={errors?.surname}
            />
            <InputWithLabel
              type='text'
              label="Ім'я*"
              {...register("name")}
              isNotValid={errors?.name}
            />
          </div>
          <div className='sex'>
            <RadioButton
              checked
              type='radio'
              label='Чоловік'
              value='male'
              {...register("sex")}
              isNotValid={errors?.sex}
            />
            <RadioButton
              type='radio'
              label='Жінка'
              value='female'
              {...register("sex")}
              isNotValid={errors?.sex}
            />
          </div>
          <InputWithLabel
            type='file'
            label="Ваше фото*"
            onChange={e => setFile(e.target.files[0])}
            isNotValid={!file && showValidation}
          />
          <InputWithLabel
            type='email'
            label="Email*"
            {...register("email")}
            isNotValid={errors?.email}
          />
          <InputWithLabel
            type='tel'
            label="Номер телефону(+380)*"
            {...register("phone")}
            isNotValid={errors?.phone}
          />
          <InputWithLabel
            type='text'
            label="Логін*"
            {...register("username")}
            isNotValid={errors?.username}
          />
          <InputWithLabel
            type='password'
            label="Пароль*"
            {...register("password")}
            isNotValid={errors?.password}
          />
          {errors?.password && <p style={{ textAlign: 'center', color: 'red' }}>{errors?.password?.message}</p>}
          <InputWithLabel
            type='password'
            label="Підтвердження*"
            placeholder='Введіть пароль'
            {...register("confirmPassword")}
            isNotValid={errors?.confirmPassword}
          />
          <LocationAutoComplete
            isLoaded={isLoaded}
            locationSet={locationSet}
            isNotValid={!location && showValidation}
          />
          <MyButton type="submit" style={{ height: '35px', marginTop: '20px' }}>Зареєструватись</MyButton>
        </MyForm>
      }
      <div className='loginRedirect'>
        <h3>Вже маєте акаунт?<Link to="/login"> Авторизуйтесь</Link></h3>
      </div>
    </div>
  )
}
