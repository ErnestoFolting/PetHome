import { React, useState } from 'react'
import { MyButton } from '../../UI/buttons/MyButton'
import { AdvertHeader } from '../AdvertHeader/AdvertHeader'
import { UserInRequest } from '../UserInRequest/UserInRequest'
import './MyAdvert.css'
import { MyModal } from '../../UI/MyModal/MyModal'
import { useFetching } from '../../Hooks/useFetching'
import AdvertService from '../../API/AdvertService'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { useNavigate } from 'react-router-dom'

export const MyAdvert = ({ advert, update, setAdvertRedoVisible, ...props }) => {

  const [status, setStatus] = useState(advert?.status);
  const requestsToShow = advert?.requests?.filter(el => el.status === 'applied')
  const [modalVisible, setModalVisible] = useState(false);
  const [finishAdvert, loader, error] = useFetching(async () => {
    await AdvertService.markAsFinished(advert?.id)
  })
  const [deleteAdvert, loader2, error2] = useFetching(async () => {
    await AdvertService.deleteAdvert(advert?.id)
  })

  async function markAsFinished() {
    try {
      await finishAdvert()
      setStatus('finished')
    } catch (e) {
      setModalVisible(true)
    }
  }
  const navigate = useNavigate();
  async function deleteFinishedAdvert() {
    try {
      await deleteAdvert()
      navigate('/myadverts')
    } catch (e) {
      setModalVisible(true)
    }
  }
  function renderSwitch(status) {
    switch (status) {
      case 'search':
        return requestsToShow?.length === 0
          ? <p style={{ textAlign: 'center' }}>Поки ще ніхто не відгукнувся.</p>
          : <div>
            <h3>Будь ласка, оберіть виконавця.</h3>
            <ul>
              {requestsToShow?.map((el) =>
                <UserInRequest
                  update={update}
                  performer={false}
                  requestId={el?.id}
                  userData={el?.user}
                  key={el?.id}
                />
              )}
            </ul>
          </div>
      case 'process':
        return <div className='inProcessStatus'>
          <h3>Виконавець</h3>
          <div className='inProcessStatusUser'>
            <ul> <UserInRequest
              performer={true}
              userData={advert?.performer}
            /></ul>
            <MyButton onClick={markAsFinished}>Позначити оголошення як завершене</MyButton>
          </div>

        </div>
      case 'finished':
        return <div className='finishedStatus'>
          <h3>Виконання завершено.</h3>
          <MyButton onClick={deleteFinishedAdvert}>Видалити оголошення</MyButton>
        </div>
      default:
        return <p>Очікуємо</p>
    }
  }
  if (loader || loader2) return <MyLoader />
  return (
    <div className='myAdvert'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{[error, error2]}</MyModal>
      <div className='myAdvertHeader'>
        <AdvertHeader
          advert={advert}
          isCreatedByUser={true}
          setAdvertRedoVisible={setAdvertRedoVisible}
        />
      </div>
      <div className='advertInfoBlock'>
        <h3>Опис</h3>
        <p>{advert.description}</p>
      </div>
      <div className='myAdvertRequests'>
        {renderSwitch(status)}
      </div>
    </div>
  )
}

