import { React, useEffect } from 'react'
import { MyInput } from '../../UI/inputs/MyInput'
import s from './LocationAutoComplete.module.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export const LocationAutoComplete = ({ isLoaded, locationSet, previousValue, isNotValid }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
        init,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
        requestOptions: {
            componentRestrictions: { country: "ua" }
        },
    });
    const ref = useOnclickOutside(() => {
        clearSuggestions();
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                setValue(description, false);
                clearSuggestions();
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    locationSet(lat, lng, description);
                });
            };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li className={s.listItem} key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    useEffect(() => {
        if (isLoaded) {
            init()
            if (previousValue) {
                setValue(previousValue, false)
            }
        }
    }, [isLoaded, init, previousValue]);
    return (
        <div className={s.locationInputCoontainer} ref={ref}>
            <label>📍Місцеположення(оберіть)*</label>
            <MyInput
                type='text'
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Звідки Ви?"
                isNotValid={isNotValid}
            />
            {status === "OK" && <ul className={s.suggestions}>{renderSuggestions()}</ul>}
        </div>
    )
}
