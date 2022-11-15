import { React, useState } from 'react'
import { MyInput } from '../../UI/inputs/MyInput'
import '../Registration/Registration.css'
import { RadioButton } from '../../UI/RadioButton/RadioButton'
import { MyButton } from '../../UI/buttons/MyButton'
import { useNavigate } from 'react-router-dom'
export const Registration = () => {

  const [gender, setGender] = useState('male');
  const setMale = () => {
    setGender('male')
  }
  const setFemale = () => {
    setGender('female')
  }
  const navigate = useNavigate()
  
  const register = (e) => {
    e.preventDefault()
    
  }
  return (
    <div className='registrationPage'>
      <div className='formName'>
        Реєстрація
      </div>
      <form className='registrationForm'>
        <div className='names'>
          <div className='surname'>
            <label>Прізвище</label>
            <MyInput
              type='text'
              placeholder='Введіть прізвище'
            />
          </div>
          <div className='name'>
            <label>Ім'я</label>
            <MyInput
              type='text'
              placeholder="Введіть ім'я"
            />
          </div>
        </div>

        <div className='sex'>
          <RadioButton
            label='Чоловік'
            value={gender === 'male'}
            onChange={setMale}
          />
          <RadioButton
            label='Жінка'
            value={gender === 'female'}
            onChange={setFemale}
          />
        </div>
        <div className='email'>
          <label>Поштова скринька</label>
          <MyInput
            type='email'
            placeholder="Введіть email"
          />
        </div>
        <div className='phoneNumber'>
          <label>Номер телефону</label>
          <MyInput
            type='tel'
            placeholder="Введіть телефон"
          />
        </div>
        <div className='username'>
          <label>Нікнейм</label>
          <MyInput
            type='text'
            placeholder="Введіть нікнейм"
          />
        </div>
        <div className='password'>
          <label>Пароль</label>
          <MyInput
            type='password'
            placeholder="Введіть Пароль"
          />
        </div>
        <div className='confirmPassword'>
          <label>Підтвердіть пароль</label>
          <MyInput
            type='password'
            placeholder="Введіть пароль"
          />
        </div>
        <MyButton onClick={register} style={{ height: '35px', marginTop: '20px' }}>Зареєструватись</MyButton>
      </form>
    </div>
  )
}
