import React from 'react'
import './UserInRequest.css'
import { useNavigate } from 'react-router-dom'
import { MyButton } from '../../UI/buttons/MyButton';

export const UserInRequest = ({ userData, ...props }) => {
    const navigate = useNavigate();
    function navigateTo() {
        navigate('/users/' + userData.id)
    }
    function accept() {

    }
    function reject() {

    }
    return (
        <li key={userData?.id} className='userInRequest'>
            <div className='userInRequestPhoto' onClick={navigateTo} >
                <img src={require('../../Assets/man.png')} alt='ownerPhoto' />
                {userData?.surname} {userData?.name}
            </div>
            <div className='userInRequestButtons'>
                <MyButton style={{ backgroundColor: 'rgb(0,150,0)' }} onClick={accept}> Прийняти </MyButton>
                <MyButton style={{ backgroundColor: 'rgb(200,0,0)' }} onClick={reject}> Відхилити </MyButton>
            </div>
        </li>
    )
}
