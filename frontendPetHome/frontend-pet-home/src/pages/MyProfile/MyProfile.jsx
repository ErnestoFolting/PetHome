
import { React, useState, useEffect } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import UserService from '../../API/UserService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { User } from '../../Components/User/User'
import { MyButton } from '../../UI/buttons/MyButton'
import './MyProfile.css'
import TimeExceptionService from '../../API/TimeEceptionService'
import convertDate from '../../Common/DateConverter'
import { TimeExceptionCalendar } from '../../Components/TimeExceptionCalendar/TimeExceptionCalendar'
import { DateObject } from "react-multi-date-picker";

export const MyProfile = () => {
  const [profile, setProfile] = useState({});

  const [addCalendarVisible, setAddCalendarVisible] = useState(false);
  const [removeCalendarVisible, setRemoveCalendarVisible] = useState(false);
  const [calendar, setCalendarData] = useState([]);
  const [beforeRemoveCalendar, setBeforeRemoveCalendar] = useState([]);
  const [deletedDates, setDeletedDates] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [fetchCertainUser, loading, error] = useFetching(async () => {
    const userResponse = await UserService.getUserProfile()
    setProfile(userResponse)
    setCalendarData(userResponse?.timeExceptions?.map(el => new DateObject(convertDate(el.date).split('.').reverse().join('-'))))
  });
  const [postTimeExceptions, loading2, error2] = useFetching(async () => {
    await TimeExceptionService.addUserTimeExceptions(getDates())
  });
  const [deleteTimeExceptions, loading3, error3] = useFetching(async () => {
    console.log('deleted',deletedDates)
    await TimeExceptionService.deleteUserTimeExceptions(deletedDates)
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchCertainUser()
      } catch (e) {
        setModalVisible(true)
      }
    }
    fetchData();
  }, [addCalendarVisible, removeCalendarVisible]);

  function getDates() {
    return (calendar.map(el => el.format().split('/').join('-')))
  }

  async function addTimeExceptions(e) {
    e.preventDefault();
    try {
      await postTimeExceptions()
    } catch (e) {
      setModalVisible(true)
    }
    setAddCalendarVisible(false)
  }
  async function getDeletedDates(e) {
    e.preventDefault();
    const before = beforeRemoveCalendar.map(el => el.format())
    const after = calendar.map(el => el.format())
    setDeletedDates(((before.filter(el => !after.includes(el)))).map(el => el.split('/').join('-')))
  }

  useEffect(() => {
    async function removeTimeExceptions() {
      try {
        await deleteTimeExceptions()
      } catch (e) {
        setModalVisible(true)
      }
      setRemoveCalendarVisible(false)
    }
    if(deletedDates.length !== 0)
    removeTimeExceptions()
  }, [deletedDates]);

  if (loading || loading2 || loading3) return <MyLoader />

  return (
    <div className='myProfilePage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{[error, error2, error3]}</MyModal>
      <MyModal title='Оберіть дати' visible={addCalendarVisible} setVisible={setAddCalendarVisible} style={{ backgroundColor: 'rgba(49,47,47,255)' }}>
        <TimeExceptionCalendar
          calendarValue={calendar}
          valueChange={setCalendarData}
          buttonClick={addTimeExceptions}
        />
      </MyModal>
      <MyModal title='Видаліть дати' visible={removeCalendarVisible} setVisible={setRemoveCalendarVisible} style={{ backgroundColor: 'rgb(228, 74, 74)' }}>
        <TimeExceptionCalendar
          calendarValue={calendar}
          valueChange={setCalendarData}
          deleteStyle={true}
          mapDays={({ date, selectedDate }) => {
            let props = {}
            if ((!selectedDate.find(el => el.format() === date.format()))) props.disabled = true
            return props
          }}
          buttonClick={getDeletedDates}
        />
      </MyModal>
      <div className='myProfileContent'>
        <User
          profile={profile}
          calendarVisible={!(addCalendarVisible || removeCalendarVisible)}
        />
        <div className='addDatesButton'>
          <MyButton onClick={(e) => { e.preventDefault(); setAddCalendarVisible(true) }} style={{ backgroundColor: 'rgb(0,150,0)' }}>Додати недоступні дати</MyButton>
          <MyButton onClick={(e) => { e.preventDefault(); setBeforeRemoveCalendar(calendar); setRemoveCalendarVisible(true) }} style={{ backgroundColor: 'rgb(228, 74, 74)' }}>Видалити недоступні дати</MyButton>
        </div>
      </div>
    </div>
  )
}
