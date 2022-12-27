import { React, useState, useContext, useEffect } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import './Login.css'
import { Context } from '../../index'
import { observer } from 'mobx-react-lite'
import { useFetching } from '../../Hooks/useFetching'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { MyModal } from '../../UI/MyModal/MyModal'
import { Link } from 'react-router-dom'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../../ValidationSchemas/LoginSchema'
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {

    const [creds, setCreds] = useState();
    const [needFetch, setNeedFetch] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { store } = useContext(Context);
    const [fetching, isLoading, error] = useFetching(async () => {
        await store.login(creds)
    })
    const login = async (data) => {
        if (data) {
            setCreds(data)
            setNeedFetch(!needFetch)
        }
    }

    useEffect(() => {
        async function func() {
            try {
                await fetching()
            } catch (e) {
                setModalVisible(true)
            }
        }
        if (creds) {
            func()
        }
    }, [needFetch])

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(LoginSchema) });

    return (
        <div className='loginPage'>
            <MyModal title = 'Error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            <div className='formName'>Авторизація</div>
            <div className='loginContent'>
                <div className='inputsPart'>
                    {isLoading
                        ? <MyLoader />
                        :
                        <form className='form' onSubmit={handleSubmit(login)}>
                            <InputWithLabel
                                label='Логін'
                                {...register("username")}
                                isNotValid={errors?.username}
                            />
                            <InputWithLabel
                                type='password'
                                label='Пароль'
                                {...register("password")}
                                isNotValid={errors?.password}
                            />
                            <MyButton type="submit">Увійти</MyButton>
                        </form>
                    }
                </div>
                <div className='loginImages'>
                    <img src={require('../../Assets/goldenRetriever.png')} alt='dogPhoto' />
                </div>
            </div>
            <div className='registrationRedirect'>
                <h3>Ще не маєте акаунту?<Link to="/registration"> Зареєструйтесь</Link></h3>
            </div>
        </div>
    )
}
export default observer(Login);
