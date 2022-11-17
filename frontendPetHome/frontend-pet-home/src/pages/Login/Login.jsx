import { React, useState, useContext } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import './Login.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'
import { Link } from 'react-router-dom'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'

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
        try{
            await fetching()
        }catch(e){
            setModalVisible(true)
        }finally{
            setPassword('')
            setUsername('')
        }        
    }
    return (
        <div className='loginPage'>
            <MyModal visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            <div className='loginContent'>
                <div className='inputsPart'>
               { isLoading
                ? <MyLoader/>
                :
                    <form className='form'>
                        <InputWithLabel
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            type='email'
                            label='Логін'
                        >
                        </InputWithLabel>
                        <InputWithLabel
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            type='password'
                            label='Пароль'
                        >

                        </InputWithLabel>
                        <MyButton onClick={login}>Увійти</MyButton>
                    </form>}
                </div>
                <div className='loginImages'>
                    <img src={require('../../Assets/goldenRetriever.png')} alt='photo' />
                </div>
            </div>
            <div className='registrationRedirect'>
                <h3>Ще не маєте акаунту?<Link to="/registration"> Зареєструйтесь</Link></h3>
            </div>
        </div>
    )
}
export default observer(Login);
