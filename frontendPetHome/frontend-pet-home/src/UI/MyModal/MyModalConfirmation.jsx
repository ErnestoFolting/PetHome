import React from 'react'
import { MyModal } from './MyModal';
import { MyButton } from '../buttons/MyButton';

export const MyModalConfirmation = ({ confirmationModalVisible, setConfirmationModalVisible, confirmedAction, deleteItem }) => {
    return (
        <MyModal title='Видалення' visible={confirmationModalVisible} setVisible={setConfirmationModalVisible} style={{ backgroundColor: 'black', color: 'white' }}>
            Ви впевнені, що хочете видалити {deleteItem}? <br />
            <div className='deleteConfirmButtons'>
                <MyButton onClick={(e) => { e.preventDefault(); setConfirmationModalVisible(false) }} style={{ backgroundColor: 'rgb(228, 74, 74)' }}>Ні</MyButton>
                <MyButton onClick={(e) => { e.preventDefault(); confirmedAction() }} style={{ backgroundColor: 'rgb(0, 150, 0)' }}>Так</MyButton>
            </div>
        </MyModal>
    )
}
