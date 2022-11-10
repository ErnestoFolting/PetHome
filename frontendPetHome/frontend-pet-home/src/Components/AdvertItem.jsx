import React from 'react'
import { MyButton } from '../UI/buttons/MyButton';
import { useNavigate, generatePath } from 'react-router-dom'
const AdvertItem = (props) => {
    const navigate = useNavigate()
    const path = generatePath("/adverts/:id", {
        id: props.advert.id
    });
    return (<div className="advertItem">
        <div className="advert__content">
            <strong>{props.advert.id} {props.advert.name}  </strong>
            <div>
                {props.advert.description}
            </div>
        </div>
        <div className="advert__buttons">
            <MyButton onClick={() => navigate(path)}>Деталі</MyButton>
        </div>
    </div>);
}

export default AdvertItem;
