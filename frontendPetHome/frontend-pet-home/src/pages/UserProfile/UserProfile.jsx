import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './UserProfile.css'
import { useFetching } from '../../Hooks/useFetching'
import UserService from '../../API/UserService'
import { MyModal } from '../../UI/MyModal/MyModal'
import { MyLoader } from '../../UI/Loader/MyLoader'
import { User } from '../../Components/User/User'

export const UserProfile = () => {
  const params = useParams()
  const [profile, setProfile] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchCertainUser, loading, error] = useFetching(async () => {
    const advertResponse = await UserService.getCertainUser(params.id)
    setProfile(advertResponse)
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
  }, []);
  return (
    <div className='userProfilePage'>
      <MyModal title='error' visible={modalVisible} setVisible={setModalVisible} style={{ backgroundColor: 'black', color: 'lightsalmon' }}>{error}</MyModal>
      {loading
        ? <MyLoader />
        : <User
          profile={profile}
          calendarVisible={true}
        />
      }
    </div>
  )
}
