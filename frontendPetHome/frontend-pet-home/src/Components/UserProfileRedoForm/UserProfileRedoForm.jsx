import { React, useState, useEffect } from 'react'
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
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileRedoSchema } from '../../ValidationSchemas/UserProfileRedoSchema'
import FileValidator from '../../ValidationSchemas/FileValidator'

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY
const libraries = ['places']

export const UserProfileRedoForm = ({ previousData, setRedoModalVisible, profileRedoVisible }) => {
    const [file, setFile] = useState(previousData?.photoFilePath);
    const [redoData, setRedoData] = useState();
    const [location, setLocation] = useState({ locationLat: String(previousData?.locationLat)?.replace('.', ','), locationLng: String(previousData?.locationLng)?.replace('.', ','), location: previousData?.location });
    const [needFetch, setNeedFetch] = useState(false);
    const [showValidation, setShowValidation] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [fetching, isLoading, error] = useFetching(async () => {
        const formData = new FormData();
        Object.keys(redoData).forEach(function (key, index) {
            formData.append(key, Object.values(redoData)[index])
        })
        Object.keys(location).forEach(function (key, index) {
            formData.append(key, Object.values(location)[index])
        })
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
        setLocation({ locationLat: String(lat)?.replace('.', ','), locationLng: String(lng)?.replace('.', ','), location: description })
    }

    const redoProfile = async (data) => {
        if (data && location && file && FileValidator(file)) {
            setRedoData(data)
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
                setRedoModalVisible(false)
                profileRedoVisible(false)
            } catch (e) {
                setModalVisible(true)
            }
        }
        if (redoData) {
            func()
        }
    }, [needFetch])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(UserProfileRedoSchema),
        defaultValues: {
            surname: previousData?.surname,
            name: previousData?.name,
            email: previousData?.email,
            PhoneNumber: previousData?.phoneNumber
        }
    });

    if (isLoading) return <MyLoader />
    return (
        <MyForm className={style.form} id='userRedoForm' onSubmit={handleSubmit(redoProfile)} >
            <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
            <div className='names'>
                <InputWithLabel
                    type='text'
                    label='Прізвище'
                    {...register("surname")}
                    isNotValid={errors?.surname}
                />
                <InputWithLabel
                    type='text'
                    label="Ім'я"
                    {...register("name")}
                    isNotValid={errors?.name}
                />
            </div>
            <InputWithLabel
                type='file'
                label="Нове фото(якщо потрібно)"
                onChange={e => setFile(e.target.files[0])}
                isNotValid={!file && showValidation}
            />
            <InputWithLabel
                type='email'
                label="Email"
                {...register("email")}
                isNotValid={errors?.email}
            />
            <InputWithLabel
                type='tel'
                label="Номер телефону"
                {...register("PhoneNumber")}
                isNotValid={errors?.phone}
            />
            <LocationAutoComplete
                isLoaded={isLoaded}
                locationSet={locationSet}
                previousValue={previousData?.location}
                isNotValid={!location && showValidation}
            />
            <MyButton type="submit">Редагувати</MyButton>
        </MyForm>
    )
}
