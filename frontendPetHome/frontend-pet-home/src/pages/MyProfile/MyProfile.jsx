
import { React, useState, useEffect } from 'react'
import { useFetching } from '../../Hooks/useFetching'
import UserService from '../../API/UserService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { User } from '../../Components/User/User'
import { MyButton } from '../../UI/buttons/MyButton'
import './MyProfile.css'
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/red.css"
import TimeExceptionService from '../../API/TimeEceptionService'
import { useNavigate } from 'react-router-dom'

export const MyProfile = () => {
  const [profile, setProfile] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendar, setCalendarData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchCertainUser, loading, error] = useFetching(async () => {
    const userResponse = await UserService.getUserProfile()
    setProfile(userResponse)
  });
  const [postTimeExceptions, loading2, error2] = useFetching(async () => {
    const advertResponse = await TimeExceptionService.addUserTimeExceptions(getDates())
    setProfile(advertResponse)
  });

  function getDates() {
    return (calendar.map(el => el.format().split('/').join('-'))) 
  }

  const navigate = useNavigate();
  async function addTimeExceptions(e) {
    e.preventDefault();
    try {
      await postTimeExceptions()
    } catch (e) {
      setModalVisible(true)
    }
    setCalendarVisible(false)
    navigate('/myprofile')
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchCertainUser()
      } catch (e) {
        setModalVisible(true)
      }
    }
    fetchData();
  }, [calendarVisible]);
  return (
    <div className='myProfilePage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{[error, error2]}</MyModal>
      <MyModal title='Оберіть дати' visible={calendarVisible} setVisible={setCalendarVisible} style={{ backgroundColor: 'rgba(49,47,47,255)' }}>
        <Calendar
          rangeHover
          value={calendar}
          onChange={setCalendarData}
          multiple
          minDate={new Date()}
          maxDate={new Date().setMonth(new Date().getMonth() + 2)}
          monthsShown={1}
          className="bg-dark"
        >
          <MyButton style={{ backgroundColor: 'rgba(35, 145, 241, 1)' }} onClick={addTimeExceptions}>Додати</MyButton>
        </Calendar>
      </MyModal>
      {loading || loading2
        ? <MyLoader />
        : <div className='myProfileContent'>
          <User
            profile={profile}
            calendarVisible={!calendarVisible}
          />
          <div className='addDatesButton'>
            <MyButton onClick={(e) => { e.preventDefault(); setCalendarVisible(true) }}>Додати недоступні дати</MyButton>
          </div>
        </div>
      }
    </div>
  )
}
