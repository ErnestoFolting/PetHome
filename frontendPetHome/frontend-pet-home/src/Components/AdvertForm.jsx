import React from 'react'
import { useState } from 'react';
import { MyInput } from '../UI/inputs/MyInput'
import { MyButton } from '../UI/buttons/MyButton';
export const AdvertForm = ({create}) => {
    const [advert, setAdvert] = useState({ name: '', description: '' });

    const addNewAdvert = (e) => {
        e.preventDefault()
        const newAdvert = {
            ...advert,
            id: Date.now()
        }
        create(newAdvert)
        setAdvert({ name: '', description: '' })
    }
    return (
        <div>
            <MyInput
                value={advert.name}
                onChange={e => setAdvert({ ...advert, name: e.target.value })}
                type="text"
                placeholder="Назва оголошення"
            />
            <MyInput
                value={advert.description}
                onChange={e => setAdvert({ ...advert, description: e.target.value })}
                type="text"
                placeholder="Текст оголошення"
            />
            <MyButton onClick={addNewAdvert}>Створити оголошення</MyButton>
        </div>
    )
}
