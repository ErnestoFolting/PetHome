import React from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyInput } from '../../UI/inputs/MyInput'
import './Login.css'

export const Login = () => {
    return (
        <div className='loginPage'>
        
            <div className='loginContent'>
                <div className='inputsPart'>
                    <MyInput placeholder='Введіть логін' type='email'></MyInput>
                    <MyInput placeholder='Введіть пароль' type='password'></MyInput>
                    <MyButton>Увійти</MyButton>
                </div>
                <div className='loginImages'>
                <img src={require('../../Images/goldenRetriever.png')} alt='photo' />
                </div>
            </div>
        </div>
    )
}
