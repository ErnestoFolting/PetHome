import { React, useState, useContext } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyInput } from '../../UI/inputs/MyInput'
import './Login.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    return (
        <div className='loginPage'>
            <div className='loginContent'>
                <div className='inputsPart'>
                    <MyInput
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        placeholder='Введіть логін'
                        type='email'>
                    </MyInput>
                    <MyInput
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='Введіть пароль'
                        type='password'>
                    </MyInput>
                    <MyButton onClick={() => store.login(username, password)}>Увійти</MyButton>
                </div>
                <div className='loginImages'>
                    <img src={require('../../Images/goldenRetriever.png')} alt='photo' />
                </div>
            </div>
        </div>
    )
}
export default observer(Login);
