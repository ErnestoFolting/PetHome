import { React, useState, useContext } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyInput } from '../../UI/inputs/MyInput'
import './Login.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { store } = useContext(Context);
    const [fetching, isLoading, error] = useFetching(async () => {
        await store.login(username, password)
    })
    const login = async (e) => {
        e.preventDefault()
        await fetching()
        setModalVisible(true)
        setPassword('')
        setUsername('')
    }
    return (
        <div className='loginPage'>
            <MyModal visible={modalVisible} setVisible={setModalVisible} style={{backgroundColor:'black',color:'lightsalmon'}}>{error}</MyModal>
            <div className='loginContent'>
                <div className='inputsPart'>
                    <form className='form'>
                        <MyInput
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            placeholder='Введіть логін'
                            type='email'
                            required
                        >
                        </MyInput>
                        <MyInput
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            placeholder='Введіть пароль'
                            type='password'>
                        </MyInput>
                        {
                            isLoading
                                ? <MyLoader />
                                : <MyButton onClick={login}>Увійти</MyButton>
                        }
                    </form>
                </div>
                <div className='loginImages'>
                    <img src={require('../../Images/goldenRetriever.png')} alt='photo' />
                </div>
            </div>
        </div>
    )
}
export default observer(Login);
