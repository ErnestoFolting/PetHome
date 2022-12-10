import { React, useState } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { MyForm } from '../../UI/Form/MyForm'
import { InputWithLabel } from '../../UI/inputs/InputWithLabel'
import style from './UserProfileRedoForm.module.css'
import { useJsApiLoader } from '@react-google-maps/api'
import { LocationAutoComplete } from '../LocationAutoComplete/LocationAutoComplete'
import { useFetching } from '../../Hooks/useFetching'
import UserDataService from '../../API/UserDataService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const UserProfileRedoForm = ({ previousData, setRedoModalVisible, profileRedoVisible }) => {
    const [file, setFile] = useState(previousData?.photoFilePath);
    const [redoData, setRedoData] = useState({ surname: previousData?.surname, name: previousData?.name, email: previousData?.email, phone: previousData?.phoneNumber, locationLat: previousData?.locationLat, locationLng: previousData?.locationLng, location: previousData?.location });
    const [modalVisible, setModalVisible] = useState(false);
    const [fetching, isLoading, error] = useFetching(async () => {
        const formData = new FormData();
        formData.append('surname', redoData?.surname)
        formData.append('name', redoData?.name)
        formData.append('email', redoData?.email)
        formData.append('PhoneNumber', redoData?.phone)
        formData.append('locationLat', String(redoData?.locationLat)?.replace('.', ','))
        formData.append('locationLng', String(redoData?.locationLng)?.replace('.', ','))
        formData.append('location', redoData?.location)
        formData.append('userPhoto', file)
        await UserDataService.redoUserProfile(formData)
    })
    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: MAPS_KEY,
            libraries
        }
    )

    function locationSet(lat, lng, description) {
        setRedoData({ ...redoData, locationLat: lat, locationLng: lng, location: description })
    }

    async function redoProfile(e) {
        e.preventDefault()
        try {
            await fetching()
            setRedoModalVisible(false)
            profileRedoVisible(false)
        } catch (e) {
            setModalVisible()
        } finally {
        }
    }
    if (isLoading) return <MyLoader />
    return (
        <MyForm className={style.form} id='userRedoForm'>
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            <div className='names'>
                <InputWithLabel
                    type='text'
                    label='Прізвище'
                    value={redoData.surname}
                    onChange={e => setRedoData({ ...redoData, surname: e.target.value })}
                />
                <InputWithLabel
                    type='text'
                    label="Ім'я"
                    value={redoData.name}
                    onChange={e => setRedoData({ ...redoData, name: e.target.value })}
                />
            </div>
            <InputWithLabel
                type='file'
                label="Нове фото(якщо потрібно)"
                onChange={e => setFile(e.target.files[0])}
            />
            <InputWithLabel
                type='email'
                label="Email"
                value={redoData.email}
                onChange={e => setRedoData({ ...redoData, email: e.target.value })}
            />
            <InputWithLabel
                type='tel'
                label="Номер телефону"
                value={redoData.phone}
                onChange={e => setRedoData({ ...redoData, phone: e.target.value })}
            />
            <LocationAutoComplete
                isLoaded={isLoaded}
                locationSet={locationSet}
                previousValue={previousData?.location}
            />
            <MyButton onClick={redoProfile}>Редагувати</MyButton>
        </MyForm>
    )
}
