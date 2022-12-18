import { React } from 'react'
import s from './MyAdvertsFilter.module.css'
import { MyButton } from '../../../UI/buttons/MyButton'

export const MyAdvertsFilter = () => {

    return (
        <div className={s.filters}>
            <h1>Ваші фільтри</h1>
            <MyButton>Застосувати</MyButton>
        </div>
    )
}
