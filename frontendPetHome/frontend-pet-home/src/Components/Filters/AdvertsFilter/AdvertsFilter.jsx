import { React, useState } from 'react'
import s from './AdvertsFilter.module.css'
import { MyButton } from '../../../UI/buttons/MyButton'
import { MyCheckbox } from '../../../UI/MyCheckbox/MyCheckbox';
import { MySelect } from '../../../UI/MySelect/MySelect';
import { InputWithLabel } from '../../../UI/inputs/InputWithLabel'
import { useForm } from 'react-hook-form';
import { AdvertsFilterSchema } from '../../../ValidationSchemas/AdvertsFilterSchema';
import { yupResolver } from "@hookform/resolvers/yup";


export const AdvertsFilter = ({ queryParams, setQueryParams }) => {

    const [filters, setFilters] = useState({ isDatesFit: queryParams?.isDatesFit, advertsLimit: queryParams?.advertsLimit });

    function confirmFilter(data) {
        setQueryParams({ ...queryParams, ...filters, ...data, currentPage: 1 })
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(AdvertsFilterSchema),
        defaultValues: {
            costFrom: queryParams?.costFrom,
            costTo: queryParams?.costTo,
        }
    });

    return (
        <form onSubmit={handleSubmit(confirmFilter)} className={s.filters}>
            <h1 className={s.filtersTitle}>Оберіть фільтри</h1>
            <MySelect
                labelText='Оголошень на сторінці'
                filters={filters}
                setFilters={setFilters}
                options={[
                    { value: 3, name: 'По 3 шт' },
                    { value: 6, name: 'По 6 шт' },
                    { value: 9, name: 'По 9 шт' }
                ]}
            />
            <p className={s.costLabel}>Виплата (грн)</p>
            <div className={s.costFilter}>
                <InputWithLabel
                    type="number"
                    placeholder='Від'
                    {...register("costFrom")}
                    isNotValid={errors?.costFrom}
                />
                <p className={s.fromTo}>-</p>
                <InputWithLabel
                    type="number"
                    placeholder='До'
                    {...register("costTo")}
                    isNotValid={errors?.costTo}
                />
            </div>
            <div className={s.datesCheckbox}>
                <MyCheckbox
                    labelText="Лише у мої вільні дати"
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>

            <MyButton style={{ backgroundColor: 'rgb(94, 92, 92)', height: '35px' }} type="submit">Застосувати</MyButton>
        </form>
    )
}
