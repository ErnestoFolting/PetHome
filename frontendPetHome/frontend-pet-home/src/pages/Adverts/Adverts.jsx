import { useEffect, useState } from 'react';
import './Adverts.css'
import { AdvertList } from '../../Components/AdvertList'
import { AdvertForm } from '../../Components/AdvertForm';
import { MyModal } from '../../UI/MyModal/MyModal';
import { MyButton } from '../../UI/buttons/MyButton';
import AdvertService from '../../API/AdvertService';
import { MyLoader } from '../../UI/Loader/MyLoader';
import { useFetching } from '../../Hooks/useFetching';

export default function Adverts() {
  const [adverts, setAdverts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchAdverts, loader, error] = useFetching(async () => {
    const adverts = await AdvertService.getAllAdverts()
    setAdverts(adverts)
  })
  useEffect(() => {
    console.log("check")
    fetchAdverts()
  }, [])

  const createAdvert = (newAdvert) => {
    setAdverts([newAdvert, ...adverts])
    setModalVisible(false)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '5px' }} onClick={() => setModalVisible(true)}>Додати оголошення</MyButton>
      <MyModal visible={modalVisible} setVisible={setModalVisible} >
        <AdvertForm create={createAdvert} />
      </MyModal>

      {error &&
        <h1>Error ${error}</h1>
      }
      {loader
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
        : <AdvertList adverts={adverts} />
      }
    </div>
  );
}
