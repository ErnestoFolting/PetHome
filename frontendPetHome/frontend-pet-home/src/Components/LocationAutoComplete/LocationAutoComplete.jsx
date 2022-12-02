import {React,useEffect} from 'react'
import { MyInput } from '../../UI/inputs/MyInput'
import s from './LocationAutoComplete.module.css'
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

export const LocationAutoComplete = ({isLoaded, locationSet}) => {
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
    });
    const ref = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
            () => {
                // When user selects a place, we can replace the keyword without request data from API
                // by setting the second parameter to "false"
                setValue(description, false);
                clearSuggestions();
                console.log('description',description)

                // Get latitude and longitude via utility functions
                getGeocode({ address: description }).then((results) => {
                    const { lat, lng } = getLatLng(results[0]);
                    console.log("📍 Coordinates: ", { lat, lng });
                    locationSet(lat,lng);
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
        }
    }, [isLoaded, init]);
    return (
        <div className={s.locationInputCoontainer} ref={ref}>
        <label>📍Місцеположення(оберіть)</label>
            <MyInput
                type='text'
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Звідки Ви?"
            />
            {status === "OK" && <ul className={s.suggestions}>{renderSuggestions()}</ul>}
        </div>
    )
}
